// // // import { NextResponse } from "next/server";
// // import { writeFile } from "fs/promises";
// // import path from "path";
// // import cloudinary from "@/lib/cloudinary";
// // import connectDB from "@/db/createDB";
// // import SkillProfile from "@/models/SkillProfile";

// // export async function POST(req) {
// //   try {
// //     await connectDB();

// //     const formData = await req.formData();
// //     const email = formData.get("email");
// //     const taskIndex = formData.get("taskIndex");
// //     const file = formData.get("file");

// //     if (!email || !file)
// //       return NextResponse.json(
// //         { error: "Missing email or file" },
// //         { status: 400 }
// //       );

// //     // ✅ Temporary local save
// //     const bytes = await file.arrayBuffer();
// //     const buffer = Buffer.from(bytes);
// //     const fileName = `${Date.now()}-${file.name}`;
// //     const filePath = path.join(process.cwd(), "public", "uploads", fileName);
// //     await writeFile(filePath, buffer);

// //     // ✅ Upload to Cloudinary (PlacifySubmissions folder)
// //     const uploadResponse = await cloudinary.uploader.upload(filePath, {
// //       folder: "PlacifySubmissions",
// //       resource_type: "raw",
// //       public_id: `submission_${email.replace(/@.*/, "")}_${Date.now()}`,
// //     });

// //     console.log("📤 Uploaded File:", uploadResponse.secure_url);

// //     // ✅ Update student's task record in SkillProfile
// //     const profile = await SkillProfile.findOne({ userId: email });

// //     if (!profile) {
// //       return NextResponse.json(
// //         { error: "Student profile not found" },
// //         { status: 404 }
// //       );
// //     }

// //     if (!profile.tasks || !profile.tasks[taskIndex]) {
// //       return NextResponse.json(
// //         { error: "Task not found" },
// //         { status: 404 }
// //       );
// //     }

// //     // 🧠 Update the selected task
// //     profile.tasks[taskIndex].submission = uploadResponse.secure_url;
// //     profile.tasks[taskIndex].completed = true;
// //     profile.tasks[taskIndex].submittedAt = new Date();

// //     await profile.save();

// //     console.log("✅ Updated submission for:", email);

// //     return NextResponse.json({
// //       message: "Assignment uploaded successfully ✅",
// //       tasks: profile.tasks,
// //     });
// //   } catch (err) {
// //     console.error("❌ Assignment upload error:", err);
// //     return NextResponse.json({ error: "Upload failed" }, { status: 500 });
// //   }
// // }
// import { NextResponse } from "next/server";
// import { writeFile } from "fs/promises";
// import path from "path";
// import cloudinary from "@/lib/cloudinary";
// import connectDB from "@/db/createDB";
// import SkillProfile from "@/models/SkillProfile";

// export async function POST(req) {
//   try {
//     await connectDB();

//     const formData = await req.formData();
//     const email = formData.get("email");
//     const taskId = formData.get("taskId"); // ✅ taskId instead of taskIndex
//     const file = formData.get("file");

//     if (!email || !taskId || !file) {
//       return NextResponse.json(
//         { error: "Missing required fields (email, taskId, file)" },
//         { status: 400 }
//       );
//     }

//     // ✅ Convert file into buffer
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);
//     const fileName = `${Date.now()}-${file.name}`;
//     const filePath = path.join(process.cwd(), "public", "uploads", fileName);
//     await writeFile(filePath, buffer);

//     // ✅ Upload to Cloudinary (PlacifySubmissions folder)
//     const uploadResponse = await cloudinary.uploader.upload(filePath, {
//       folder: "PlacifySubmissions",
//       resource_type: "raw",
//       public_id: `submission_${email.replace(/@.*/, "")}_${Date.now()}`,
//     });

//     console.log("📎 Uploaded to Cloudinary:", uploadResponse.secure_url);

//     // ✅ Find student profile
//     const profile = await SkillProfile.findOne({ userId: email });
//     if (!profile) {
//       return NextResponse.json(
//         { error: "Student profile not found" },
//         { status: 404 }
//       );
//     }

//     // ✅ Find and update task by ID
//     const task = profile.tasks.id(taskId);
//     if (!task) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }

//     // ✅ Update task submission data
//     task.submission = uploadResponse.secure_url;
//     task.completed = true;
//     task.submittedAt = new Date();

//     await profile.save();

//     console.log(`✅ Submission updated for ${email}, task: ${task.title}`);

//     return NextResponse.json({
//       success: true,
//       message: "Assignment submitted successfully!",
//       tasks: profile.tasks,
//     });
//   } catch (err) {
//     console.error("❌ Assignment upload error:", err);
//     return NextResponse.json(
//       { error: "Server error during upload" },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from "next/server";
// import { writeFile } from "fs/promises";
// import path from "path";
// import cloudinary from "@/lib/cloudinary";
// import connectDB from "@/db/createDB";
// import SkillProfile from "@/models/SkillProfile";

// export async function POST(req) {
//   try {
//     await connectDB();

//     const formData = await req.formData();
//     const email = formData.get("email");
//     const taskId = formData.get("taskId");
//     const file = formData.get("file");

//     if (!email || !taskId || !file) {
//       return NextResponse.json(
//         { error: "Missing required fields (email, taskId, file)" },
//         { status: 400 }
//       );
//     }

//     // Convert file to buffer
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);
//     const fileName = `${Date.now()}-${file.name}`;
//     const filePath = path.join(process.cwd(), "public", "uploads", fileName);
//     await writeFile(filePath, buffer);

//     // Upload to Cloudinary
//     const uploadResponse = await cloudinary.uploader.upload(filePath, {
//       folder: "PlacifySubmissions",
//       resource_type: "raw",
//     });

//     console.log("📎 Uploaded File:", uploadResponse.secure_url);

//     // Find and update student profile
//     const profile = await SkillProfile.findOne({ userId: email });
//     if (!profile) {
//       return NextResponse.json(
//         { error: "Student profile not found" },
//         { status: 404 }
//       );
//     }

//     const task = profile.tasks.id(taskId);
//     if (!task)
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });

//     task.submission = uploadResponse.secure_url;
//     task.completed = true;
//     task.submittedAt = new Date();

//     await profile.save();

//     console.log(`✅ Updated submission for ${email}: ${task.title}`);

//     return NextResponse.json({
//       success: true,
//       submission: uploadResponse.secure_url,
//       tasks: profile.tasks,
//     });
//   } catch (err) {
//     console.error("❌ Assignment Upload Error:", err);
//     return NextResponse.json(
//       { error: "Server error while uploading assignment" },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import cloudinary from "@/lib/cloudinary";
import connectDB from "@/db/createDB";
import SkillProfile from "@/models/SkillProfile";

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const email = formData.get("email");
    const taskId = formData.get("taskId");
    const file = formData.get("file");

    if (!email || !taskId || !file) {
      return NextResponse.json(
        { error: "Missing required fields (email, taskId, file)" },
        { status: 400 }
      );
    }

    // ✅ Upload to Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), "public", "uploads", fileName);
    await writeFile(filePath, buffer);

    const uploadResponse = await cloudinary.uploader.upload(filePath, {
      folder: "PlacifySubmissions",
      resource_type: "raw",
    });

    console.log("📎 Uploaded File:", uploadResponse.secure_url);

    // ✅ Find student profile
    const profile = await SkillProfile.findOne({ userId: email });
    if (!profile) {
      return NextResponse.json(
        { error: "Student profile not found" },
        { status: 404 }
      );
    }

    // 🧩 Try to find task by _id first
    let task = profile.tasks.id(taskId);

    // 🧩 Fallback: maybe frontend sent index instead of _id
    if (!task && !isNaN(taskId)) {
      const index = parseInt(taskId, 10);
      task = profile.tasks[index];
    }

    if (!task) {
      return NextResponse.json(
        { error: "Task not found for submission" },
        { status: 404 }
      );
    }

    // ✅ Update the task fields
    task.submission = uploadResponse.secure_url;
    task.completed = true;
    task.submittedAt = new Date();
    task.uploadedBy = email;

    await profile.save();

    console.log(`✅ Submission updated for ${email} | Task: ${task.title}`);

    return NextResponse.json({
      success: true,
      message: "Assignment submitted successfully!",
      submission: uploadResponse.secure_url,
    });
  } catch (err) {
    console.error("❌ Submission error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
