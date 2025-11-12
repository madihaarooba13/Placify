import { NextResponse } from "next/server";
import connectDB from "@/db/createDB";
import User from "@/models/User";

export async function GET(req, context) {
  try {
    await connectDB();

    // ✅ unwrap params properly
    const { email } = await context.params;
    const decodedEmail = decodeURIComponent(email);

    console.log("🔍 Searching for student:", decodedEmail);

    const student = await User.findOne({ email: decodedEmail });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json({ student }, { status: 200 });
  } catch (err) {
    console.error("❌ Error fetching student details:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
