import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import cloudinary from "@/lib/cloudinary";
import connectDB from "@/db/createDB";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {
    await connectDB();

    // ✅ Get user session
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Get file from form data
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // ✅ Save temporarily
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), "public", "uploads", fileName);
    await writeFile(filePath, buffer);

    // ✅ Upload to Cloudinary as raw
    const uploadResponse = await cloudinary.uploader.upload(filePath, {
      folder: "PlacifyUploads",
      resource_type: "raw",
      public_id: `resume_${session.user.email.replace(/@.*/, "")}`, // overwrite old one
      overwrite: true, // ✅ ensures old file is replaced
    });

    console.log("✅ Uploaded:", uploadResponse.secure_url);

    // ✅ Update user's resume in MongoDB
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { resume: uploadResponse.secure_url, updatedAt: new Date() },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Resume uploaded and saved!",
      resumeUrl: uploadResponse.secure_url,
      user: updatedUser,
    });
  } catch (err) {
    console.error("❌ Upload Error:", err);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
