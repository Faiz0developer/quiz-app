import { Response, Request, NextFunction } from "express";

import User from "../models/user";
import CustomError from "../helper/error";

interface ReturnResponse {
  status: "error" | "success";
  message: string;
  data: {} | [];
}

// get-->> get user data
const getUser = async (req: Request, res: Response, next: NextFunction) => {
  // console.log("query", req.query);
  // console.log("params", req.params);
  // console.log("params", req.params.userId);
  let resp: ReturnResponse;
  try {
    const userId = req.params.userId;
    // if (req.userId != req.params.userId) {
    //   const err = new CustomError("You are not authorized");
    //   err.statusCode = 401;
    //   err.data = { hi: "It'sError " };
    //   throw err;
    // }
    const user = await User.findById(userId, { name: 1, email: 1 });
    if (!user) {
      const err = new CustomError("No user exist");
      err.statusCode = 401;
      throw err;
    } else {
      resp = { status: "success", message: "User found", data: user };
      res.status(200).send(resp);
    }
  } catch (err) {
    next(err);
  }
};

//put-->> update user data
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  let resp: ReturnResponse;
  try {
    // if (req.userId != req.body._id) {
    //   const err = new CustomError("You are not authorized");
    //   err.statusCode = 401;
    //   throw err;
    // }
    const userId = req.body._id;
    const user = await User.findById(userId);
    if (!user) {
      const err = new CustomError("No user exist");
      err.statusCode = 401;
      throw err;
    }
    user.name = req.body.name;
    await user.save();
    resp = { status: "success", message: "User Updated", data: {} };
    res.send(resp);
  } catch (err) {
    next(err);
  }
};

export { getUser, updateUser };
