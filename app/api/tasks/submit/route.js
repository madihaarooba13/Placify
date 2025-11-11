import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import cloudinary from "@/lib/cloudinary";
import connectDB from "@/db/createDB";
import SkillProfile from "@/models/SkillProfile";

/**
 * Handles student assignment submissions
 * Uploads file -> Cloudinary -> saves to MongoDB (SkillProfile.tasks[])
 */
export async function POST(req) {
  try {
    await connectDB();

    // Parse form data (contains file + metadata)
    const formData = await req.formData();
    const file = formData.get("file");
    const email = formData.get("email");
    const taskIndex = parseInt(formData.get("taskIndex"));

    if (!file || !email || isNaN(taskIndex)) {
      return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
    }

    // Save file temporarily
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), "public", "uploads", fileName);
    await writeFile(filePath, buffer);

    // Upload to Cloudinary (raw resource)
    const uploadRes = await cloudinary.uploader.upload(filePath, {
      folder: "PlacifySubmissions",
      resource_type: "raw",
      public_id: `submission_${email.replace(/@.*/, "")}_${Date.now()}`,
      overwrite: true,
    });

    // Find student SkillProfile
    const profile = await SkillProfile.findOne({ userId: email });
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // Ensure valid task index
    if (!profile.tasks[taskIndex]) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // Update the selected task with submission details
    profile.tasks[taskIndex].submission = uploadRes.secure_url;
    profile.tasks[taskIndex].submittedAt = new Date();
    profile.tasks[taskIndex].completed = true; // ✅ mark completed
    profile.lastUpdated = new Date();

    await profile.save();

    console.log(
      `✅ Assignment submitted by ${email}: ${uploadRes.secure_url}`
    );

    return NextResponse.json({
      success: true,
      message: "Assignment submitted successfully!",
      tasks: profile.tasks,
    });
  } catch (err) {
    console.error("❌ Error submitting assignment:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
