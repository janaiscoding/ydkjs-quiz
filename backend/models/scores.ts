import mongoose from "mongoose";
const Schema = mongoose.Schema;

const scoreSchema = new Schema(
  {
    quiz_id: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    score: {
      type: Number,
      required: true,
      min: [0, "Must be a positive score"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Score", scoreSchema);
