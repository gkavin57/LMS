import express from "express";
import {
  addAnswer,
  addQuestions,
  addReplyToReview,
  addReview,
  editCourse,
  getAllCourses,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";
import { authorizeRoles, isAuthendicated } from "../middleware/auth";
const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  isAuthendicated,
  authorizeRoles("admin"),
  uploadCourse
);

courseRouter.put(
  "/edit-course/:id",
  isAuthendicated,
  authorizeRoles("admin"),
  editCourse
);

courseRouter.get("/get-course/:id", getSingleCourse);

courseRouter.get("/get-courses", getAllCourses);

courseRouter.get("/get-course-content/:id", isAuthendicated, getCourseByUser);

courseRouter.put("/add-question", isAuthendicated, addQuestions);

courseRouter.put("/add-answer", isAuthendicated, addAnswer);

courseRouter.put("/add-review/:id", isAuthendicated, addReview);

courseRouter.put(
  "/add-reply",
  isAuthendicated,
  authorizeRoles("admin"),
  addReplyToReview
);

export default courseRouter;
