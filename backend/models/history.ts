import mongoose from "mongoose";
const Schema = mongoose.Schema;

const historySchema = new Schema({
  quiz_id: { type: Schema.Types.ObjectId, ref: "Quiz" },
  // correctQuestions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  // incorrectQuestions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  score: {
    type: Number,
    required: true,
    min: [0, "Must be a positive score"],
    default: 0,
  },
});

export default mongoose.model("History", historySchema);
