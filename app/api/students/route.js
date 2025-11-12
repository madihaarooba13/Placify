// ✅ app/api/students/route.js
import { NextResponse } from "next/server";
import connectDB from "@/db/createDB";
import User from "@/models/User"; // <-- your user model

export async function GET() {
  try {
    await connectDB();
    
    // 🧠 Get users with student role
    const students = await User.find({ role: "student" }).select("name email");
    
    return NextResponse.json({ students });
  } catch (err) {
    console.error("❌ Error fetching students:", err);
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}
