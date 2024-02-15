import { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";

import Quiz from "../models/quiz";
import CustomError from "../helper/error";

interface ReturnResponse {
  status: "error" | "success";
  message: string;
  data: {} | [];
}

const createQuiz = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      const err = new CustomError("Validation failed");
      err.statusCode = 422;
      err.data = validationError.array();
      throw err;
    }
    const name = req.body.name;
    const questions_list = req.body.questions_list;
    const answers = req.body.answers;
    const created_by = req.userId;
    const quiz = new Quiz({ name, questions_list, answers, created_by });

    const result = await quiz.save();

    const resp: ReturnResponse = {
      status: "success",
      message: "Quiz created successfully",
      data: { quizId: result._id },
    };
    res.status(201).send(resp);
  } catch (error) {
    next(error);
  }
};

// get middleware
const getQuiz = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let quiz;
    const quizId = req.params.quizId;

    if (quizId) {
      quiz = await Quiz.findById(quizId);
      if (!quiz) {
        const err = new CustomError("Quiz not found");
        err.statusCode = 404;
        throw err;
      } else if (req.userId !== quiz?.created_by.toString()) {
        const err = new CustomError("You are not authorized");
        err.statusCode = 403;
        throw err;
      }
    } else {
      quiz = await Quiz.find({ created_by: req.userId });
      // if(quiz.length===0){
      //   const err = new CustomError("You have not created any quiz yet!");
      //   err.statusCode = 404;
      //   throw err;
      // }
    }

    const resp: ReturnResponse = {
      status: "success",
      message: "Quiz",
      data: quiz,
    };
    res.status(200).send(resp);
  } catch (error) {
    next(error);
  }
};

// update middleware
const updateQuiz = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      const err = new CustomError("Validation failed");
      err.statusCode = 422;
      err.data = validationError.array();
      throw err;
    }
    const quizId = req.body._id;
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      const err = new CustomError("Quiz not found");
      err.statusCode = 404;
      throw err;
    }
    if (req.userId !== quiz.created_by.toString()) {
      const err = new CustomError("You are not authorized");
      err.statusCode = 403;
      throw err;
    }

    if (quiz.is_published) {
      const err = new CustomError("You can't update, published quiz! ");
      err.statusCode = 405;
      throw err;
    }

    quiz.name = req.body.name;
    quiz.questions_list = req.body.questions_list;
    quiz.answers = req.body.answers;

    await quiz.save();

    const resp: ReturnResponse = {
      status: "success",
      message: "Quiz updated successfully",
      data: {},
    };

    res.status(200).send(resp);
  } catch (error) {
    next(error);
  }
};

// delete middleware
const deleteQuiz = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quizId = req.params.quizId;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      const err = new CustomError("Quiz not found");
      err.statusCode = 404;
      throw err;
    }

    if (req.userId !== quiz.created_by.toString()) {
      const err = new CustomError("You are not authorized");
      err.statusCode = 403;
      throw err;
    }

    if (quiz.is_published) {
      const err = new CustomError("You can't delete, published quiz! ");
      err.statusCode = 405;
      throw err;
    }
    await Quiz.deleteOne({ _id: quizId });

    const resp: ReturnResponse = {
      status: "success",
      message: "Quiz deleted successfully!",
      data: {},
    };

    res.status(200).send(resp);
  } catch (error) {
    next(error);
  }
};

//
const publishQuiz = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quizId = req.body.quizId;
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      const err = new CustomError("Quiz not found");
      err.statusCode = 404;
      throw err;
    }

    if (req.userId !== quiz.created_by.toString()) {
      const err = new CustomError("You are not authorized");
      err.statusCode = 403;
      throw err;
    }
    quiz.is_published = true;
    await quiz.save();

    const resp: ReturnResponse = {
      status: "success",
      message: "Quiz published",
      data: {},
    };

    res.status(200).send(resp);
  } catch (error) {
    next(error);
  }
};

export { createQuiz, getQuiz, updateQuiz, deleteQuiz, publishQuiz };
