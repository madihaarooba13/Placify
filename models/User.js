// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema(
//   {
//     email: { type: String, required: true, unique: true },
//     name: { type: String },
//     username: { type: String, required: true, unique: true },
//     profilepic: { type: String },
//     coverpic: { type: String },

//     // 🔹 New fields for profile page
//     college: {
//       type: String,
//       default: "Jai Narain College of Technology",
//     },
//     branch: { type: String },
//     cgpa: { type: Number },
//     semester: {
//       sem1: { type: Number },
//       sem2: { type: Number },
//       sem3: { type: Number },
//       sem4: { type: Number },
//       sem5: { type: Number },
//       sem6: { type: Number },
//       sem7: { type: Number },
//       sem8: { type: Number },
//     },
//     skills: { type: String },
//     resume: { type: String },

//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now },
//   },
//   { timestamps: true }
// );

// // ✅ Prevent model overwrite error in Next.js
// export const User = mongoose.models.User || mongoose.model("User", UserSchema);
// export default User;


// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema(
//   {
//     email: { type: String, required: true, unique: true },
//     name: { type: String },
//     username: { type: String, required: true, unique: true },
//     profilepic: { type: String },
//     coverpic: { type: String },

//     // 🔹 New fields for profile page
//     college: {
//       type: String,
//       default: "Jai Narain College of Technology",
//     },
//     branch: { type: String },
//     cgpa: { type: Number },
//     semester: {
//       sem1: { type: Number },
//       sem2: { type: Number },
//       sem3: { type: Number },
//       sem4: { type: Number },
//       sem5: { type: Number },
//       sem6: { type: Number },
//       sem7: { type: Number },
//       sem8: { type: Number },
//     },
//     skills: { type: String },
//     resume: { type: String },

//     // 🧩 Role-based access (student / teacher)
//     role: {
//       type: String,
//       enum: ["student", "teacher"],
//       default: "student",
//     },

//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now },
//   },
//   { timestamps: true }
// );

// // ✅ Prevent model overwrite error in Next.js (important for Hot Reload)
// export const User = mongoose.models.User || mongoose.model("User", UserSchema);
// export default User;

// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema(
//   {
//     email: { type: String, required: true, unique: true },
//     name: { type: String },
//     username: { type: String, required: true, unique: true },
//     profilepic: { type: String },
//     coverpic: { type: String },

//     // ✅ New role-based access
//     role: { type: String, enum: ["teacher", "student"], default: "student" },

//     // Profile details
//     college: {
//       type: String,
//       default: "Jai Narain College of Technology",
//     },
//     branch: { type: String },
//     cgpa: { type: Number },
//     semester: {
//       sem1: { type: Number },
//       sem2: { type: Number },
//       sem3: { type: Number },
//       sem4: { type: Number },
//       sem5: { type: Number },
//       sem6: { type: Number },
//       sem7: { type: Number },
//       sem8: { type: Number },
//     },
//     skills: { type: String },
//     resume: { type: String },

//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now },
//   },
//   { timestamps: true }
// );

// export const User = mongoose.models.User || mongoose.model("User", UserSchema);
// export default User;

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String },
    username: { type: String, required: true, unique: true },
    profilepic: { type: String },
    coverpic: { type: String },

    // 🔹 Role field for teacher or student
    role: {
      type: String,
      enum: ["student", "teacher"],
      default: "student",
    },

    // 🔹 College details
    college: {
      type: String,
      default: "Jai Narain College of Technology",
    },
    branch: { type: String },
    cgpa: { type: Number },

    // 🔹 Semester-wise SGPA (optional)
    semester: {
      sem1: { type: Number },
      sem2: { type: Number },
      sem3: { type: Number },
      sem4: { type: Number },
      sem5: { type: Number },
      sem6: { type: Number },
      sem7: { type: Number },
      sem8: { type: Number },
    },

    // 🔹 Skills, resume link, etc.
    skills: { type: String },
    resume: { type: String },

    // 🔹 Teacher feedback for student
    feedback: {
      rating: { type: Number },
      feedback: { type: String },
      date: { type: Date },
    },

    // 🔹 Chat availability (for teacher)
    isAvailable: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// ✅ Prevent model overwrite in Next.js hot reload
export default mongoose.models.User || mongoose.model("User", UserSchema);
