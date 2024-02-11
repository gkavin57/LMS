import express from "express";
import { isAuthendicated } from "../middleware/auth";
import { createOrder } from "../controllers/order.controller";

const orderRouter = express.Router();

orderRouter.post("/create-order", isAuthendicated, createOrder);

export default orderRouter;
