import express, { Request, Response, NextFunction } from "express";
require("dotenv").config();
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import UserRouter from "./routes/user.route";
//body parser-for cloudinery
app.use(express.json({ limit: "50mb" }));

//cookie-parser
app.use(cookieParser());

//cors
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

//routes
app.use("/api/v1", UserRouter);

//testing api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

//unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`route ${req.originalUrl} not found`);
  next(err);
});

app.use(ErrorMiddleware);
