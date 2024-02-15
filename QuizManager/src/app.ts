import express from "express";
import { Response, Request, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";

import userRouter from "./routers/user";
import authRouter from "./routers/auth";
import quizRouter from "./routers/quiz";
import examRouter from "./routers/exam";
import reportRouter from "./routers/report";

import CustomError from "./helper/error";

const app = express();

interface ReturnResponse {
  status: "error" | "success";
  message: string;
  data: {} | [];
}

const connectionString = process.env.CONNECTION_STRING || "";

app.use(express.json());

app.use(cors({ origin: "https://quiz-app-backend-seven.vercel.app/", credentials: true }));

declare global {
  namespace Express {
    interface Request {
      userId: String;
    }
  }
}

app.get("/", (req, res) => {
  res.send("Working");
});

app.use("/user", userRouter);

app.use("/auth", authRouter);

app.use("/quiz", quizRouter);

app.use("/exam", examRouter);

app.use("/report", reportRouter);

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  let message: string;
  let statusCode: number;
  let data;

  if (!!err.statusCode && err.statusCode < 500) {
    message = err.message;
    statusCode = err.statusCode;
  } else {
    message = "Something went wrong please try after sometime!";
    statusCode = 500;
  }
  let resp: ReturnResponse = { status: "error", message, data: {} };
  if (!!err.data) {
    resp.data = err.data;
  }
  console.log(err.statusCode, err.message);
  res.status(statusCode).send(resp);
});

const connect = mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions);

connect.then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server Connected");
  });
});
