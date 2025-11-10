import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import connectDB from "@/db/createDB";
import User from "@/models/User";

export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) return NextResponse.json({}, { status: 200 });

    return NextResponse.json(user);
  } catch (err) {
    console.error("Error fetching profile:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;

    const updateData = {
      name: body.name,
      username: body.username,
      branch: body.branch,
      cgpa: body.cgpa,
      college: body.college || "Jai Narain College of Technology",
      semester: body.semester,
      skills: body.skills,
      resume: body.resume,
    };

    await User.findOneAndUpdate({ email }, updateData, { upsert: true, new: true });
    return NextResponse.json({ message: "Profile saved successfully ✅" });
  } catch (err) {
    console.error("Error saving profile:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
