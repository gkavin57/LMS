import express from "express";
import {
  activateUser,
  getAllUsers,
  getUserInfo,
  logOutUser,
  loginUser,
  registrationUser,
  socialAuth,
  updateAccessToken,
  updatePassword,
  updateProfilePicture,
  updateUserInfo,
} from "../controllers/user.controller";
import { authorizeRoles, isAuthendicated } from "../middleware/auth";
const UserRouter = express.Router();

UserRouter.post("/registration", registrationUser);

UserRouter.post("/activate-user", activateUser);

UserRouter.post("/login", loginUser);

UserRouter.get("/logout", isAuthendicated, logOutUser);

UserRouter.get("/refresh", updateAccessToken);

UserRouter.get("/me", isAuthendicated, getUserInfo);

UserRouter.post("/social-auth", socialAuth);

UserRouter.put("/update-user-info", isAuthendicated, updateUserInfo);

UserRouter.put("/update-user-password", isAuthendicated, updatePassword);

UserRouter.put("/update-user-avatar", isAuthendicated, updateProfilePicture);

UserRouter.get("/get-users", isAuthendicated, authorizeRoles("admin"),getAllUsers);

export default UserRouter;
