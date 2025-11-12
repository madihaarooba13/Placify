// // import mongoose from "mongoose";

// // const TaskSchema = new mongoose.Schema({
// //   skill: String,
// //   title: String,
// //   description: String,
// //   type: { type: String, default: "assignment" },
// //   attachment: { type: String, default: "" }, // ✅ Cloudinary file URL
// //   dueDate: { type: String, default: "" }, // ✅ date field
// //   assignedAt: { type: Date, default: Date.now },
// //   completed: { type: Boolean, default: false },
// // });

// // const QuizSchema = new mongoose.Schema({
// //   skill: String,
// //   title: String,
// //   type: { type: String, default: "quiz" },
// //   quiz: [
// //     {
// //       question: String,
// //       options: [String],
// //       correctAnswer: String,
// //     },
// //   ],
// //   assignedAt: { type: Date, default: Date.now },
// //   completed: { type: Boolean, default: false },
// // });

// // const SkillProfileSchema = new mongoose.Schema({
// //   userId: { type: String, required: true, unique: true },
// //   softSkills: { type: Array, default: [] },
// //   techSkills: { type: Array, default: [] },
// //   tasks: [TaskSchema], // ✅ each has attachment + dueDate now
// //   quizzes: [QuizSchema],
// //   lastUpdated: { type: Date, default: Date.now },
// // });

// // export default mongoose.models.SkillProfile ||
// //   mongoose.model("SkillProfile", SkillProfileSchema);

// // import mongoose from "mongoose";

// // const TaskSchema = new mongoose.Schema({
// //   skill: String,
// //   title: String,
// //   description: String,
// //   type: { type: String, default: "assignment" },
// //   attachment: { type: String, default: "" },
// //   dueDate: { type: String, default: "" },
// //   assignedAt: { type: Date, default: Date.now },
// //   completed: { type: Boolean, default: false },
// // });

// // const QuizSchema = new mongoose.Schema({
// //   skill: String,
// //   title: String,
// //   type: { type: String, default: "quiz" },
// //   quiz: [
// //     {
// //       question: String,
// //       options: [String],
// //       correctAnswer: String,
// //     },
// //   ],
// //   assignedAt: { type: Date, default: Date.now },
// //   completed: { type: Boolean, default: false },
// // });

// // const SkillProfileSchema = new mongoose.Schema({
// //   userId: { type: String, required: true, unique: true },
// //   softSkills: { type: Array, default: [] },
// //   techSkills: { type: Array, default: [] },
// //   tasks: [TaskSchema],
// //   quizzes: [QuizSchema],
// //   lastUpdated: { type: Date, default: Date.now },
// // });

// // export default mongoose.models.SkillProfile ||
// //   mongoose.model("SkillProfile", SkillProfileSchema);

// import mongoose from "mongoose";

// const TaskSchema = new mongoose.Schema({
//   skill: String,
//   title: String,
//   description: String,
//   type: { type: String, default: "assignment" },
//   attachment: { type: String, default: "" }, // File uploaded by teacher
//   dueDate: { type: String, default: "" },
//   assignedAt: { type: Date, default: Date.now },
//   completed: { type: Boolean, default: false },

//   // 🆕 New fields for student uploads
//   submission: { type: String, default: "" }, // Cloudinary URL of submitted file
//   submittedAt: { type: Date },               // When the student uploaded it
//   uploadedBy: { type: String, default: "" }, // Student email
// });

// const QuizSchema = new mongoose.Schema({
//   skill: String,
//   title: String,
//   type: { type: String, default: "quiz" },
//   quiz: [
//     {
//       question: String,
//       options: [String],
//       correctAnswer: String,
//     },
//   ],
//   assignedAt: { type: Date, default: Date.now },
//   completed: { type: Boolean, default: false },
// });

// const SkillProfileSchema = new mongoose.Schema({
//   userId: { type: String, required: true, unique: true },
//   softSkills: { type: Array, default: [] },
//   techSkills: { type: Array, default: [] },
//   tasks: [TaskSchema],
//   quizzes: [QuizSchema],
//   lastUpdated: { type: Date, default: Date.now },
// });

// export default mongoose.models.SkillProfile ||
//   mongoose.model("SkillProfile", SkillProfileSchema);

import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  skill: String,
  title: String,
  description: String,
  type: { type: String, default: "assignment" },
  attachment: { type: String, default: "" },
  dueDate: { type: String, default: "" },
  assignedAt: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },

  // ✅ ADD THESE NEW FIELDS
  submission: { type: String, default: "" },
  submittedAt: { type: Date },
  uploadedBy: { type: String, default: "" },
});

const QuizSchema = new mongoose.Schema({
  skill: String,
  title: String,
  type: { type: String, default: "quiz" },
  quiz: [
    {
      question: String,
      options: [String],
      correctAnswer: String,
    },
  ],
  assignedAt: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
});

const SkillProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  softSkills: { type: Array, default: [] },
  techSkills: { type: Array, default: [] },
  tasks: [TaskSchema],
  quizzes: [QuizSchema],
  lastUpdated: { type: Date, default: Date.now },
});

export default mongoose.models.SkillProfile ||
  mongoose.model("SkillProfile", SkillProfileSchema);
