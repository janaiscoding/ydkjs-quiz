import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true, minLength: 3, maxLength: 25 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 8 },
    history: [{ type: Schema.Types.ObjectId, ref: "History" }],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
