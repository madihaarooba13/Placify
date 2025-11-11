import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import cloudinary from "@/lib/cloudinary";
import connectDB from "@/db/createDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {
    await connectDB();

    // ✅ Get teacher session
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "teacher") {
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

    // ✅ Upload to Cloudinary under a separate folder
    const uploadResponse = await cloudinary.uploader.upload(filePath, {
      folder: "PlacifyTasks", // 👈 separate folder for teacher uploads
      resource_type: "raw",
      overwrite: false, // each upload unique
    });

    console.log("✅ Task File Uploaded:", uploadResponse.secure_url);

    // ✅ Return URL to frontend (no DB save here — handled by assign API)
    return NextResponse.json({
      success: true,
      url: uploadResponse.secure_url,
    });
  } catch (err) {
    console.error("❌ Task Upload Error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
