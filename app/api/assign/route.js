import connectDB from "@/db/createDB";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();
    const students = await User.find({ role: "student" }).select(
      "username email branch cgpa"
    );
    return Response.json({ students });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch students" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const { email, rating, feedback } = await req.json();

    if (!email || !rating) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const student = await User.findOne({ email });
    if (!student) {
      return Response.json({ error: "Student not found" }, { status: 404 });
    }

    student.feedback = { rating, feedback, date: new Date() };
    await student.save();

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error submitting feedback" }, { status: 500 });
  }
}
