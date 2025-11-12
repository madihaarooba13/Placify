// // // // // // import mongoose from "mongoose";

// // // // // // const TaskSchema = new mongoose.Schema({
// // // // // //   skill: String,
// // // // // //   title: String,
// // // // // //   description: String,
// // // // // //   type: { type: String, default: "assignment" },
// // // // // //   attachment: { type: String, default: "" }, // ✅ Cloudinary file URL
// // // // // //   dueDate: { type: String, default: "" }, // ✅ date field
// // // // // //   assignedAt: { type: Date, default: Date.now },
// // // // // //   completed: { type: Boolean, default: false },
// // // // // // });

// // // // // // const QuizSchema = new mongoose.Schema({
// // // // // //   skill: String,
// // // // // //   title: String,
// // // // // //   type: { type: String, default: "quiz" },
// // // // // //   quiz: [
// // // // // //     {
// // // // // //       question: String,
// // // // // //       options: [String],
// // // // // //       correctAnswer: String,
// // // // // //     },
// // // // // //   ],
// // // // // //   assignedAt: { type: Date, default: Date.now },
// // // // // //   completed: { type: Boolean, default: false },
// // // // // // });

// // // // // // const SkillProfileSchema = new mongoose.Schema({
// // // // // //   userId: { type: String, required: true, unique: true },
// // // // // //   softSkills: { type: Array, default: [] },
// // // // // //   techSkills: { type: Array, default: [] },
// // // // // //   tasks: [TaskSchema], // ✅ each has attachment + dueDate now
// // // // // //   quizzes: [QuizSchema],
// // // // // //   lastUpdated: { type: Date, default: Date.now },
// // // // // // });

// // // // // // export default mongoose.models.SkillProfile ||
// // // // // //   mongoose.model("SkillProfile", SkillProfileSchema);

// // // // // // import mongoose from "mongoose";

// // // // // // const TaskSchema = new mongoose.Schema({
// // // // // //   skill: String,
// // // // // //   title: String,
// // // // // //   description: String,
// // // // // //   type: { type: String, default: "assignment" },
// // // // // //   attachment: { type: String, default: "" },
// // // // // //   dueDate: { type: String, default: "" },
// // // // // //   assignedAt: { type: Date, default: Date.now },
// // // // // //   completed: { type: Boolean, default: false },
// // // // // // });

// // // // // // const QuizSchema = new mongoose.Schema({
// // // // // //   skill: String,
// // // // // //   title: String,
// // // // // //   type: { type: String, default: "quiz" },
// // // // // //   quiz: [
// // // // // //     {
// // // // // //       question: String,
// // // // // //       options: [String],
// // // // // //       correctAnswer: String,
// // // // // //     },
// // // // // //   ],
// // // // // //   assignedAt: { type: Date, default: Date.now },
// // // // // //   completed: { type: Boolean, default: false },
// // // // // // });

// // // // // // const SkillProfileSchema = new mongoose.Schema({
// // // // // //   userId: { type: String, required: true, unique: true },
// // // // // //   softSkills: { type: Array, default: [] },
// // // // // //   techSkills: { type: Array, default: [] },
// // // // // //   tasks: [TaskSchema],
// // // // // //   quizzes: [QuizSchema],
// // // // // //   lastUpdated: { type: Date, default: Date.now },
// // // // // // });

// // // // // // export default mongoose.models.SkillProfile ||
// // // // // //   mongoose.model("SkillProfile", SkillProfileSchema);

// // // // // import mongoose from "mongoose";

// // // // // const TaskSchema = new mongoose.Schema({
// // // // //   skill: String,
// // // // //   title: String,
// // // // //   description: String,
// // // // //   type: { type: String, default: "assignment" },
// // // // //   attachment: { type: String, default: "" }, // File uploaded by teacher
// // // // //   dueDate: { type: String, default: "" },
// // // // //   assignedAt: { type: Date, default: Date.now },
// // // // //   completed: { type: Boolean, default: false },

// // // // //   // 🆕 New fields for student uploads
// // // // //   submission: { type: String, default: "" }, // Cloudinary URL of submitted file
// // // // //   submittedAt: { type: Date },               // When the student uploaded it
// // // // //   uploadedBy: { type: String, default: "" }, // Student email
// // // // // });

// // // // // const QuizSchema = new mongoose.Schema({
// // // // //   skill: String,
// // // // //   title: String,
// // // // //   type: { type: String, default: "quiz" },
// // // // //   quiz: [
// // // // //     {
// // // // //       question: String,
// // // // //       options: [String],
// // // // //       correctAnswer: String,
// // // // //     },
// // // // //   ],
// // // // //   assignedAt: { type: Date, default: Date.now },
// // // // //   completed: { type: Boolean, default: false },
// // // // // });

// // // // // const SkillProfileSchema = new mongoose.Schema({
// // // // //   userId: { type: String, required: true, unique: true },
// // // // //   softSkills: { type: Array, default: [] },
// // // // //   techSkills: { type: Array, default: [] },
// // // // //   tasks: [TaskSchema],
// // // // //   quizzes: [QuizSchema],
// // // // //   lastUpdated: { type: Date, default: Date.now },
// // // // // });

// // // // // export default mongoose.models.SkillProfile ||
// // // // //   mongoose.model("SkillProfile", SkillProfileSchema);

// // // // import mongoose from "mongoose";

// // // // const TaskSchema = new mongoose.Schema({
// // // //   skill: String,
// // // //   title: String,
// // // //   description: String,
// // // //   type: { type: String, default: "assignment" },
// // // //   attachment: { type: String, default: "" },
// // // //   dueDate: { type: String, default: "" },
// // // //   assignedAt: { type: Date, default: Date.now },
// // // //   completed: { type: Boolean, default: false },

// // // //   // ✅ ADD THESE NEW FIELDS
// // // //   submission: { type: String, default: "" },
// // // //   submittedAt: { type: Date },
// // // //   uploadedBy: { type: String, default: "" },
// // // // });

// // // // const QuizSchema = new mongoose.Schema({
// // // //   skill: String,
// // // //   title: String,
// // // //   type: { type: String, default: "quiz" },
// // // //   quiz: [
// // // //     {
// // // //       question: String,
// // // //       options: [String],
// // // //       correctAnswer: String,
// // // //     },
// // // //   ],
// // // //   assignedAt: { type: Date, default: Date.now },
// // // //   completed: { type: Boolean, default: false },
// // // // });

// // // // const SkillProfileSchema = new mongoose.Schema({
// // // //   userId: { type: String, required: true, unique: true },
// // // //   softSkills: { type: Array, default: [] },
// // // //   techSkills: { type: Array, default: [] },
// // // //   tasks: [TaskSchema],
// // // //   quizzes: [QuizSchema],
// // // //   lastUpdated: { type: Date, default: Date.now },
// // // // });

// // // // export default mongoose.models.SkillProfile ||
// // // //   mongoose.model("SkillProfile", SkillProfileSchema);
// // // import mongoose from "mongoose";

// // // //
// // // // 📘 Assignment Schema
// // // //
// // // const TaskSchema = new mongoose.Schema({
// // //   skill: String,
// // //   title: String,
// // //   description: String,
// // //   type: { type: String, default: "assignment" },
// // //   attachment: { type: String, default: "" }, // teacher file
// // //   dueDate: { type: String, default: "" },
// // //   assignedAt: { type: Date, default: Date.now },
// // //   completed: { type: Boolean, default: false },

// // //   // 🧾 student submission info
// // //   submission: { type: String, default: "" }, // cloudinary url
// // //   submittedAt: { type: Date },
// // //   uploadedBy: { type: String, default: "" },
// // // });

// // // //
// // // // 🧩 Quiz Schema
// // // //
// // // const QuizSchema = new mongoose.Schema({
// // //   skill: String,
// // //   title: String,
// // //   type: { type: String, default: "quiz" },
// // //   quiz: [
// // //     {
// // //       question: String,
// // //       options: [String],
// // //       correctAnswer: String,
// // //     },
// // //   ],
// // //   assignedAt: { type: Date, default: Date.now },
// // //   completed: { type: Boolean, default: false },

// // //   // ✅ student quiz submission info
// // //   attempts: [
// // //     {
// // //       userEmail: String,
// // //       answers: Object,
// // //       score: Number,
// // //       submittedAt: { type: Date, default: Date.now },
// // //     },
// // //   ],
// // // });

// // // //
// // // // 🧠 SkillProfile Schema (parent container)
// // // //
// // // const SkillProfileSchema = new mongoose.Schema({
// // //   userId: { type: String, required: true, unique: true },
// // //   softSkills: { type: Array, default: [] },
// // //   techSkills: { type: Array, default: [] },
// // //   tasks: [TaskSchema],
// // //   quizzes: [QuizSchema],
// // //   lastUpdated: { type: Date, default: Date.now },
// // // });

// // // export default mongoose.models.SkillProfile ||
// // //   mongoose.model("SkillProfile", SkillProfileSchema);
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
// //   submission: { type: String, default: "" },
// //   submittedAt: { type: Date },
// //   uploadedBy: { type: String, default: "" },
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
// //   attempts: [
// //     {
// //       userEmail: String,
// //       answers: Object,
// //       score: Number,
// //       submittedAt: { type: Date, default: Date.now },
// //     },
// //   ],
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

// //
// // 📘 Task (Assignment) Schema
// //
// const TaskSchema = new mongoose.Schema({
//   skill: String,
//   title: String,
//   description: String,
//   type: { type: String, default: "assignment" },
//   attachment: { type: String, default: "" },
//   dueDate: { type: String, default: "" },
//   assignedAt: { type: Date, default: Date.now },
//   completed: { type: Boolean, default: false },
//   submission: { type: String, default: "" },
//   submittedAt: { type: Date },
//   uploadedBy: { type: String, default: "" },
// });

// //
// // 🧩 Quiz Schema
// //
// const QuizSchema = new mongoose.Schema(
//   {
//     skill: String,
//     title: String,
//     type: { type: String, default: "quiz" },
//     quiz: [
//       {
//         question: String,
//         options: [String],
//         correctAnswer: String,
//       },
//     ],
//     assignedAt: { type: Date, default: Date.now },
//     completed: { type: Boolean, default: false },

//     // ✅ FIX: Always initialize attempts array
//     attempts: {
//       type: [
//         {
//           userEmail: String,
//           answers: Object,
//           score: Number,
//           submittedAt: { type: Date, default: Date.now },
//         },
//       ],
//       default: [], // 🟢 ensures every quiz has an empty array
//     },
//   },
//   { minimize: false } // 🟢 forces saving of empty arrays
// );

// //
// // 🧠 SkillProfile Schema (Main container)
// //
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

//
// 📘 Assignment Schema
// — Used for teacher-given assignments or projects.
//
const TaskSchema = new mongoose.Schema({
  skill: String,
  title: String,
  description: String,
  type: { type: String, default: "assignment" },
  attachment: { type: String, default: "" }, // Teacher’s uploaded file
  dueDate: { type: String, default: "" },
  assignedAt: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },

  // 🧾 Student submission details
  submission: { type: String, default: "" }, // Cloudinary or file URL
  submittedAt: { type: Date },
  uploadedBy: { type: String, default: "" }, // Student email
});


//
// 🧩 Quiz Schema
// — Each quiz contains multiple questions and stores students' attempts.
//
const QuizSchema = new mongoose.Schema(
  {
    skill: String,
    title: String,
    type: { type: String, default: "quiz" },

    // 🧠 List of quiz questions
    quiz: [
      {
        question: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctAnswer: { type: String, required: true },
      },
    ],

    assignedAt: { type: Date, default: Date.now },
    completed: { type: Boolean, default: false },

    // ✅ List of student attempts
    attempts: {
      type: [
        {
          userEmail: { type: String, required: true },
          answers: { type: Object, default: {} },
          score: { type: Number, default: 0 },
          submittedAt: { type: Date, default: Date.now },
        },
      ],
      default: [], // Ensures empty array exists initially
    },
  },
  { minimize: false } // Forces saving of empty arrays
);


//
// 🧠 SkillProfile Schema (Main container)
// — One profile per user (student).
//
const SkillProfileSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true }, // Student email or ID
    softSkills: { type: Array, default: [] },
    techSkills: { type: Array, default: [] },
    tasks: [TaskSchema],
    quizzes: [QuizSchema],
    lastUpdated: { type: Date, default: Date.now },
  },
  { minimize: false }
);


//
// ✅ Export model (prevents recompiling on hot reload)
//
export default mongoose.models.SkillProfile ||
  mongoose.model("SkillProfile", SkillProfileSchema);
