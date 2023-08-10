import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: "Username is required",
      unique: true,
      min: 3,
    },
    password: {
      type: String,
      min: 6,
      required: "Password is required",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
