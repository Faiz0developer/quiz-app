import { Request, Response, NextFunction } from "express";
import CustomError from "../helper/error";
import Report from "../models/report";

interface ReturnResponse {
  status: "error" | "success";
  message: string;
  data: {} | [];
}

const getReport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let report;

    if (!!req.params.reportId) {
      const reportId = req.params.reportId;
      report = await Report.findById(reportId);

      if (report?.userId.toString() !== req.userId) {
        const err = new CustomError("You are not allowed");
        err.statusCode = 405;
        throw err;
      }
    } else {
      report = await Report.find({ userId: req.userId });
      // if(report.length===0){
      //   const err = new CustomError("No result to show!");
      //   err.statusCode = 404;
      //   throw err;
      // }
    }

    if (!report) {
      const err = new CustomError("Report not found");
      err.statusCode = 405;
      throw err;
    }

    let resp: ReturnResponse = {
      status: "success",
      message: "Report!",
      data: report,
    };
    res.send(resp);
  } catch (error) {
    next(error);
  }
};

export { getReport };
