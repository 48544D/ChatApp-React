import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      required: "Text is required",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
