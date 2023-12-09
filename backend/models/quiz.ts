import mongoose from "mongoose";
const Schema = mongoose.Schema;

const quizSchema = new Schema(
  {
    title: { type: String, required: true, minLength: 1 },
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  },
  { timestamps: true }
);

export default mongoose.model("Quiz", quizSchema);
