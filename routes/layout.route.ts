import express from "express";
import { authorizeRoles, isAuthendicated } from "../middleware/auth";
import {
  createLayout,
  editLayout,
  getLayoutByType,
} from "../controllers/layout.controller";

const layoutRouter = express.Router();

layoutRouter.post(
  "/create-layout",
  isAuthendicated,
  authorizeRoles("admin"),
  createLayout
);

layoutRouter.put(
  "/edit-layout",
  isAuthendicated,
  authorizeRoles("admin"),
  editLayout
);

layoutRouter.get("/get-layout", isAuthendicated, getLayoutByType);

export default layoutRouter;
