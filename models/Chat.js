import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  from: { type: String, required: true }, // sender email
  to: { type: String, required: true },   // receiver email
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.Chat || mongoose.model("Chat", chatSchema);
