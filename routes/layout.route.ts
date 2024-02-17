import express from "express";
import { authorizeRoles, isAuthendicated } from "../middleware/auth";
import { createLayout } from "../controllers/layout.controller";

const layoutRouter = express.Router();

layoutRouter.post(
  "/create-layout",
  isAuthendicated,
  authorizeRoles("admin"),
  createLayout
);

export default layoutRouter;
