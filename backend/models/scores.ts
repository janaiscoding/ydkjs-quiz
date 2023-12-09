import mongoose from "mongoose";
const Schema = mongoose.Schema;

const scoreSchema = new Schema(
  {
    quiz_id: { type: Schema.Types.ObjectId, ref: "Quiz" },
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    score: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model("Score", scoreSchema);
