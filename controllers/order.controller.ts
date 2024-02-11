import ErrorHandler from "../utils/ErrorHandler";
import sendMail from "../utils/sendMail";
import ejs from "ejs";
import path from "path";
import CourseModel from "../models/course.model";
import userModel from "../models/user.model";
import OrderModel, { IOrder } from "../models/order.model";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { NextFunction, Request, Response } from "express";
import { newOrder } from "../services/order.services";
import NotificationModel from "../models/notification.model";

//create order

interface IOrderInfo {
  courseId: string;
  payment_info: string;
}

export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req?.body as IOrderInfo;

      const user = await userModel.findById(req?.user?._id);

      const courseExistInUser = user?.courses?.some(
        (course: any) => course._id.toString() === courseId
      );

      if (courseExistInUser) {
        return next(
          new ErrorHandler("User already purchased this course", 400)
        );
      }

      const course = await CourseModel.findById(courseId);

      if (!course) {
        return next(new ErrorHandler("Course not found", 400));
      }

      const data: any = {
        courseId: course._id,
        userId: user._id,
      };

      const mailData = {
        order: {
          _id: course._id.toString().slice(0, 6),
          user: user?.name,
          name: course?.name,
          price: course?.price,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };

      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/order-confirmation.ejs"),
        mailData
      );

      try {
        if (user) {
          await sendMail({
            email: user?.email,
            subject: "Order Confirmation",
            template: "order-confirmation.ejs",
            data: mailData,
          });
        }
      } catch (error) {
        return next(new ErrorHandler(error?.message, 500));
      }

      user?.courses?.push(course._id);

      await user.save();

      const notification = await NotificationModel.create({
        user: user?._id,
        title: "New Order",
        message: `You have a new order from ${course?.name}`,
      });

      if (course?.purchased) {
        course.purchased += 1;
      }

      course?.save();

      newOrder(data, res, next);
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
