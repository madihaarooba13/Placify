import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: String,
  aiScore: { type: Number, default: 0 },
  teacherScore: { type: Number, default: 0 },
  finalScore: { type: Number, default: 0 },
  feedback: { type: String, default: "" },
});

const taskSchema = new mongoose.Schema({
  skill: String,
  title: String,
  completed: { type: Boolean, default: false },
});

const skillProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  softSkills: [skillSchema],
  techSkills: [skillSchema],
  tasks: [taskSchema],
});

export default mongoose.models.SkillProfile ||
  mongoose.model("SkillProfile", skillProfileSchema);
