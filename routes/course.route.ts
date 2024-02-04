import express from "express";
import { editCourse, uploadCourse } from "../controllers/course.controller";
import { authorizeRoles, isAuthendicated } from "../middleware/auth";
const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  isAuthendicated,
  authorizeRoles("admin"),
  uploadCourse
);

courseRouter.post(
  "/edit-course/:id",
  isAuthendicated,
  authorizeRoles("admin"),
  editCourse
);

export default courseRouter;
