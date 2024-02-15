import express from "express";
import { body } from "express-validator";

import {
  createQuiz,
  deleteQuiz,
  getQuiz,
  publishQuiz,
  updateQuiz,
} from "../controllers/quiz";
import { isAuthenticated } from "../middlewares/isAuth";

const router = express.Router();

// create quiz
router.post(
  "/",
  isAuthenticated,
  [
    body("name")
      .trim()
      .not()
      .isEmpty()
      .isLength({ min: 10 })
      .withMessage("Please enter a valid name,minimum 10 character long"),
    body("questions_list").custom((questions_list) => {
      if (questions_list.length === 0) {
        return Promise.reject("Quiz can't be empty");
      }
      return true;
    }),
    body("answers").custom((answers) => {
      if (Object.keys(answers).length === 0) {
        return Promise.reject("Answer should be provided of quiz");
      }
      return true;
    }),
  ],
  createQuiz
);

//get quiz
router.get("/:quizId?", isAuthenticated, getQuiz);

//update quiz
router.put(
  "/",
  isAuthenticated,
  [
    body("name")
      .trim()
      .not()
      .isEmpty()
      .isLength({ min: 10 })
      .withMessage("Please enter a valid name,minimum 10 character long"),
    body("questions_list").custom((questions_list) => {
      if (questions_list.length === 0) {
        return Promise.reject("Quiz can't be empty");
      }
      return true;
    }),
    body("answers").custom((answers) => {
      if (Object.keys(answers).length === 0) {
        return Promise.reject("Answer should be provided of quiz");
      }
      return true;
    }),
  ],
  updateQuiz
);

//delette quiz
router.delete("/:quizId", isAuthenticated, deleteQuiz);

// publish quiz
router.patch("/publish", isAuthenticated, publishQuiz);
export default router;
