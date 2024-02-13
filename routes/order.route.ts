import express from "express";
import { authorizeRoles, isAuthendicated } from "../middleware/auth";
import { createOrder, getAllOrders } from "../controllers/order.controller";

const orderRouter = express.Router();

orderRouter.post("/create-order", isAuthendicated, createOrder);

orderRouter.get("/get-orders", isAuthendicated,authorizeRoles("admin"), getAllOrders);

export default orderRouter;
