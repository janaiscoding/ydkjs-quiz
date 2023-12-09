import mongoose from "mongoose";
const Schema = mongoose.Schema;

const answerSchema = new Schema(
  {
    answer: { type: String, required: true, minLength: 1 },
    parentQuestion: { type: Schema.Types.ObjectId, ref: "Question" },
    isCorrent: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Question", answerSchema);
