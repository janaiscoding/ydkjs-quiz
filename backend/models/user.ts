import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true, minLength: 1 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    history: [
      {
        quiz: { type: Schema.Types.ObjectId, ref: "Quiz" },
        isComplete: { type: Boolean, default: false },
        correctQuestions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
        incorrectQuestions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
        bestScore: {
          type: Number,
          required: true,
          min: [0, "Must be a positive score"],
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
