import express from "express"
import { authorizeRoles, isAuthendicated } from "../middleware/auth"
import { getNotification, updateNotification } from "../controllers/notification.controller"


const notificationRouter = express.Router()


notificationRouter.get("/get-all-notifications",isAuthendicated,authorizeRoles("admin"),getNotification)

notificationRouter.put("/update-notification/:id",isAuthendicated,authorizeRoles("admin"),updateNotification)


export default notificationRouter