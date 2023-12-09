import mongoose from "mongoose";
const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    title: { type: String, required: true, minLength: 1 },
    answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
    parent_quiz: { type: Schema.Types.ObjectId, ref: "Quiz" },
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);
