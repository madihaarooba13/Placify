// // // // import mongoose from "mongoose";

// // // // const MessageSchema = new mongoose.Schema({
// // // //   sender: { type: String, required: true },
// // // //   receiver: { type: String, required: true },
// // // //   message: { type: String, required: true },
// // // //   sentAt: { type: Date, default: Date.now },
// // // // });

// // // // const ChatSchema = new mongoose.Schema({
// // // //   userEmail: { type: String, required: true, unique: true }, // student email
// // // //   mentorEmail: { type: String, required: true },
// // // //   messages: [MessageSchema],
// // // //   lastUpdated: { type: Date, default: Date.now },
// // // // });

// // // // export default mongoose.models.Chat || mongoose.model("Chat", ChatSchema);
// // // import mongoose from "mongoose";

// // // const MessageSchema = new mongoose.Schema({
// // //   sender: { type: String, required: true },
// // //   receiver: { type: String, required: true },
// // //   message: { type: String, required: true },
// // //   sentAt: { type: Date, default: Date.now },
// // // });

// // // const ChatSchema = new mongoose.Schema({
// // //   userEmail: { type: String, required: true }, // student
// // //   mentorEmail: { type: String, required: true }, // teacher
// // //   messages: [MessageSchema],
// // //   lastUpdated: { type: Date, default: Date.now },
// // // });

// // // export default mongoose.models.Chat || mongoose.model("Chat", ChatSchema);
// // import mongoose from "mongoose";

// // const MessageSchema = new mongoose.Schema({
// //   sender: { type: String, required: true },
// //   receiver: { type: String, required: true },
// //   message: { type: String, required: true },
// //   sentAt: { type: Date, default: Date.now },
// // });

// // const ChatSchema = new mongoose.Schema({
// //   userEmail: { type: String, required: true },
// //   mentorEmail: { type: String, required: true },
// //   messages: [MessageSchema],
// //   lastUpdated: { type: Date, default: Date.now },
// // });

// // export default mongoose.models.Chat || mongoose.model("Chat", ChatSchema);
// import mongoose from "mongoose";

// const MessageSchema = new mongoose.Schema({
//   sender: { type: String, required: true },
//   receiver: { type: String, required: true },
//   message: { type: String, required: true },
//   sentAt: { type: Date, default: Date.now },
// });

// const ChatSchema = new mongoose.Schema({
//   userEmail: { type: String, required: true }, // ✅ removed `unique: true`
//   mentorEmail: { type: String, required: true },
//   messages: [MessageSchema],
//   lastUpdated: { type: Date, default: Date.now },
// });

// export default mongoose.models.Chat || mongoose.model("Chat", ChatSchema);
import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  message: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
});

const ChatSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  mentorEmail: { type: String, required: true },
  messages: [MessageSchema],
  lastUpdated: { type: Date, default: Date.now },
});

export default mongoose.models.Chat || mongoose.model("Chat", ChatSchema);
