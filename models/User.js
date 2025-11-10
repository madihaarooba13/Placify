import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String },
    username: { type: String, required: true, unique: true },
    profilepic: { type: String },
    coverpic: { type: String },

    // 🔹 New fields for profile page
    college: {
      type: String,
      default: "Jai Narain College of Technology",
    },
    branch: { type: String },
    cgpa: { type: Number },
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
    skills: { type: String },
    resume: { type: String },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// ✅ Prevent model overwrite error in Next.js
export const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
