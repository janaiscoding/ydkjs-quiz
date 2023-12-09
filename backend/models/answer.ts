import mongoose from "mongoose";
const Schema = mongoose.Schema;

const answerSchema = new Schema(
  {
    answer: { type: String, required: true, minLength: 1 },
    parent_question: { type: Schema.Types.ObjectId, ref: "Question" },
    isCorrect: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Answer", answerSchema);
