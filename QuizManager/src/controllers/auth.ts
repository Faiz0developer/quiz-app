import { Response, Request, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import User from "../models/user";
import CustomError from "../helper/error";

interface ReturnResponse {
  status: "error" | "success";
  message: string;
  data: {} | [];
}

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let resp: ReturnResponse;
  try {
    //validation
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      const err = new CustomError("Validation failed!");
      err.statusCode = 422;
      err.data = validationError.array();
      throw err;
    }
    const email = req.body.email;
    const name = req.body.name;
    let password = await bcrypt.hash(req.body.password, 12);
    const user = new User({ email, name, password });
    const result = await user.save();
    if (!result) {
      resp = { status: "error", message: "User Not Found", data: {} };
      res.send(resp);
    } else {
      resp = {
        status: "success",
        message: "Registration Done",
        data: { userId: result._id },
      };
      res.send(resp);
    }
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  let resp: ReturnResponse;
  const secretKey = process.env.SECRET_KEY || ""
  try {
    const email = req.body.email;
    const password = req.body.password;

    // find user through email
    const user = await User.findOne({ email });

    if (!user) {
      const err = new CustomError("No user exist");
      err.statusCode = 401;
      throw err;
    } else {
      // verify user using bcrypt
      const status = await bcrypt.compare(password, user.password);
      if (status) {
        
        const token = jwt.sign(
          { userId: user._id },
          secretKey,
          { expiresIn: "1h" }
        );
        resp = {
          status: "success",
          message: "Logged in successfully",
          data: { token,userid:user._id,name:user.name },
        };
        res.send(resp);
      } else {
        const err = new CustomError("credentials mismatch");
        err.statusCode = 401;
        throw err;
      }
    }
  } catch (err) {
    next(err);
  }
};

const isUserExist = async (email: String) => {
  const user = await User.findOne({ email });
  if (!user) {
    return false;
  }
  return true;
};

export { registerUser, loginUser, isUserExist };
