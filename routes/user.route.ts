import express from "express";
import {
  activateUser,
  getUserInfo,
  logOutUser,
  loginUser,
  registrationUser,
  socialAuth,
  updateAccessToken,
} from "../controllers/user.controller";
import { isAuthendicated } from "../middleware/auth";
const UserRouter = express.Router();

UserRouter.post("/registration", registrationUser);

UserRouter.post("/activate-user", activateUser);

UserRouter.post("/login", loginUser);

UserRouter.get("/logout", isAuthendicated, logOutUser);

UserRouter.get("/refresh", updateAccessToken);

UserRouter.get("/me", isAuthendicated, getUserInfo);

UserRouter.post("/social-auth", socialAuth);

export default UserRouter;
