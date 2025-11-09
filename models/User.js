// import mongoose from "mongoose";
// const { Schema, model } = mongoose;
// const UserSchema = new Schema({
//     email: { type: String, required: true, unique: true },
//     name: { type: String },
//     username: { type: String, required: true, unique: true },
//     profilepic: { type: String },
//     coverpic: { type: String },
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now },
// });
// // const User = ;
// export default   mongoose.models.User || model('User', UserSchema);

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  username: { type: String, required: true, unique: true },
  profilepic: { type: String },
  coverpic: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// ✅ fix model export for Next.js
export const User =
  mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
