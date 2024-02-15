import mongoose, { Schema } from "mongoose";

const schema = mongoose.Schema;

const quizSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    questions_list: [
      {
        question_number: {
          type: Number,
          required: true,
        },
        question: String,
        options: {},
      },
    ],
    answers: {},
    created_by: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    is_published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Quiz = mongoose.model("quiz", quizSchema);

export default Quiz;
