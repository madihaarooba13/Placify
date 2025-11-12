// // // // // // import { NextResponse } from "next/server";
// // // // // // import connectDB from "@/db/createDB";
// // // // // // import Chat from "@/models/Chat";

// // // // // // export async function POST(req) {
// // // // // //   try {
// // // // // //     await connectDB();
// // // // // //     const { sender, receiver, message } = await req.json();

// // // // // //     if (!sender || !receiver || !message)
// // // // // //       return NextResponse.json(
// // // // // //         { error: "Missing fields" },
// // // // // //         { status: 400 }
// // // // // //       );

// // // // // //     let chat = await Chat.findOne({ userEmail: sender });

// // // // // //     // if not found → create new conversation object
// // // // // //     if (!chat) {
// // // // // //       chat = new Chat({
// // // // // //         userEmail: sender,
// // // // // //         mentorEmail: receiver,
// // // // // //         messages: [],
// // // // // //       });
// // // // // //     }

// // // // // //     // push new message into that user's messages array
// // // // // //     chat.messages.push({ sender, receiver, message });
// // // // // //     chat.lastUpdated = new Date();

// // // // // //     await chat.save();

// // // // // //     return NextResponse.json({ success: true, chat });
// // // // // //   } catch (err) {
// // // // // //     console.error("❌ Chat Save Error:", err);
// // // // // //     return NextResponse.json({ error: "Server error" }, { status: 500 });
// // // // // //   }
// // // // // // }

// // // // // // export async function GET(req) {
// // // // // //   try {
// // // // // //     await connectDB();
// // // // // //     const { searchParams } = new URL(req.url);
// // // // // //     const userEmail = searchParams.get("user");

// // // // // //     if (!userEmail)
// // // // // //       return NextResponse.json(
// // // // // //         { error: "Missing user email" },
// // // // // //         { status: 400 }
// // // // // //       );

// // // // // //     const chat = await Chat.findOne({ userEmail });

// // // // // //     if (!chat)
// // // // // //       return NextResponse.json(
// // // // // //         { messages: [] },
// // // // // //         { status: 200 }
// // // // // //       );

// // // // // //     return NextResponse.json(chat.messages);
// // // // // //   } catch (err) {
// // // // // //     console.error("❌ Chat Fetch Error:", err);
// // // // // //     return NextResponse.json({ error: "Server error" }, { status: 500 });
// // // // // //   }
// // // // // // }
// // // // // import { NextResponse } from "next/server";
// // // // // import connectDB from "@/db/createDB";
// // // // // import Chat from "@/models/Chat";
// // // // // import { pusherServer } from "@/lib/pusher";

// // // // // export async function POST(req) {
// // // // //   try {
// // // // //     await connectDB();
// // // // //     const { sender, receiver, message } = await req.json();

// // // // //     if (!sender || !receiver || !message) {
// // // // //       return NextResponse.json({ error: "Missing fields" }, { status: 400 });
// // // // //     }

// // // // //     // Save to MongoDB
// // // // //     const newMessage = await Chat.create({ sender, receiver, message });

// // // // //     // 🔔 Trigger Pusher event
// // // // //     await pusherServer.trigger("placify-chat", "new-message", newMessage);

// // // // //     return NextResponse.json({ success: true, message: newMessage });
// // // // //   } catch (err) {
// // // // //     console.error("❌ Chat save error:", err);
// // // // //     return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
// // // // //   }
// // // // // }

// // // // // export async function GET(req) {
// // // // //   try {
// // // // //     await connectDB();
// // // // //     const { searchParams } = new URL(req.url);
// // // // //     const user = searchParams.get("user");

// // // // //     if (!user) return NextResponse.json({ messages: [] });

// // // // //     const messages = await Chat.find({
// // // // //       $or: [{ sender: user }, { receiver: user }],
// // // // //     }).sort({ createdAt: 1 });

// // // // //     return NextResponse.json({ messages });
// // // // //   } catch (err) {
// // // // //     console.error("❌ Chat fetch error:", err);
// // // // //     return NextResponse.json({ error: "Failed to load chat" }, { status: 500 });
// // // // //   }
// // // // // }

// // // // import { NextResponse } from "next/server";
// // // // import connectDB from "@/db/createDB";
// // // // import Chat from "@/models/Chat";
// // // // import { pusherServer } from "@/lib/pusher";

// // // // export async function GET(req) {
// // // //   const user = req.nextUrl.searchParams.get("user");
// // // //   await connectDB();
// // // //   const chats = await Chat.find({
// // // //     $or: [{ sender: user }, { receiver: user }],
// // // //   }).sort({ createdAt: 1 });

// // // //   return NextResponse.json({ messages: chats });
// // // // }

// // // // export async function POST(req) {
// // // //   await connectDB();
// // // //   const { sender, receiver, message } = await req.json();

// // // //   const newMsg = await Chat.create({ sender, receiver, message });

// // // //   // 🟢 Trigger real-time event
// // // //   await pusherServer.trigger("chat-channel", "new-message", newMsg);

// // // //   return NextResponse.json({ success: true, newMsg });
// // // // }
// // // import { NextResponse } from "next/server";
// // // import connectDB from "@/db/createDB";
// // // import Chat from "@/models/Chat";
// // // import { pusherServer } from "@/lib/pusher";

// // // export async function GET(req) {
// // //   try {
// // //     await connectDB();
// // //     const { searchParams } = new URL(req.url);
// // //     const user = searchParams.get("user");

// // //     if (!user) return NextResponse.json({ messages: [] });

// // //     // Find all chats involving this user
// // //     const chats = await Chat.find({
// // //       $or: [{ userEmail: user }, { mentorEmail: user }],
// // //     });

// // //     // Flatten all messages into one list
// // //     const messages = chats.flatMap((chat) => chat.messages);

// // //     return NextResponse.json({ messages });
// // //   } catch (err) {
// // //     console.error("❌ Chat fetch error:", err);
// // //     return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
// // //   }
// // // }

// // // export async function POST(req) {
// // //   try {
// // //     await connectDB();
// // //     const { sender, receiver, message } = await req.json();

// // //     if (!sender || !receiver || !message) {
// // //       return NextResponse.json({ error: "Missing fields" }, { status: 400 });
// // //     }

// // //     // Identify who is student and mentor
// // //     const isStudent = sender.includes("student");
// // //     const userEmail = isStudent ? sender : receiver;
// // //     const mentorEmail = isStudent ? receiver : sender;

// // //     // Find or create chat between this pair
// // //     let chat = await Chat.findOne({ userEmail, mentorEmail });
// // //     if (!chat) {
// // //       chat = new Chat({ userEmail, mentorEmail, messages: [] });
// // //     }

// // //     // Add new message
// // //     const newMessage = { sender, receiver, message };
// // //     chat.messages.push(newMessage);
// // //     chat.lastUpdated = new Date();

// // //     await chat.save();

// // //     // Trigger realtime update
// // //     await pusherServer.trigger("placify-chat", "new-message", newMessage);

// // //     return NextResponse.json({ success: true, message: newMessage });
// // //   } catch (err) {
// // //     console.error("❌ Chat save error:", err);
// // //     return NextResponse.json({ error: "Server error" }, { status: 500 });
// // //   }
// // // }
// // import { NextResponse } from "next/server";
// // import connectDB from "@/db/createDB";
// // import Chat from "@/models/Chat";
// // import { pusherServer } from "@/lib/pusher";

// // // 🟢 Fetch all messages for a user (student or teacher)
// // export async function GET(req) {
// //   try {
// //     await connectDB();
// //     const { searchParams } = new URL(req.url);
// //     const user = searchParams.get("user");

// //     if (!user) return NextResponse.json({ messages: [] });

// //     // 🧠 Find all chats where this user is either student or mentor
// //     const chats = await Chat.find({
// //       $or: [{ userEmail: user }, { mentorEmail: user }],
// //     });

// //     // Flatten all message arrays
// //     const messages = chats.flatMap((chat) => chat.messages);

// //     return NextResponse.json({ messages });
// //   } catch (err) {
// //     console.error("❌ Chat fetch error:", err);
// //     return NextResponse.json(
// //       { error: "Failed to fetch messages" },
// //       { status: 500 }
// //     );
// //   }
// // }

// // // 🟩 Send a message (student or teacher)
// // export async function POST(req) {
// //   try {
// //     await connectDB();
// //     const { sender, receiver, message } = await req.json();

// //     if (!sender || !receiver || !message) {
// //       return NextResponse.json({ error: "Missing fields" }, { status: 400 });
// //     }

// //     // ✅ Identify student vs teacher dynamically
// //     // if sender includes "student" → it’s the student; otherwise mentor
// //     const isStudent =
// //       sender.toLowerCase().includes("student") ||
// //       sender.toLowerCase().includes("gmail");
// //     const userEmail = isStudent ? sender : receiver;
// //     const mentorEmail = isStudent ? receiver : sender;

// //     // 🔍 Find or create chat between this pair
// //     let chat = await Chat.findOne({ userEmail, mentorEmail });
// //     if (!chat) {
// //       chat = new Chat({ userEmail, mentorEmail, messages: [] });
// //     }

// //     // 📨 Add message
// //     const newMessage = { sender, receiver, message, sentAt: new Date() };
// //     chat.messages.push(newMessage);
// //     chat.lastUpdated = new Date();

// //     await chat.save();

// //     // 🔔 Trigger real-time Pusher event for both sides
// //     await pusherServer.trigger("placify-chat", "new-message", newMessage);

// //     console.log("✅ New message sent:", newMessage);

// //     return NextResponse.json({ success: true, message: newMessage });
// //   } catch (err) {
// //     console.error("❌ Chat save error:", err);
// //     return NextResponse.json({ error: "Server error" }, { status: 500 });
// //   }
// // }
// import { NextResponse } from "next/server";
// import connectDB from "@/db/createDB";
// import Chat from "@/models/Chat";
// import { pusherServer } from "@/lib/pusher";

// export async function GET(req) {
//   try {
//     await connectDB();
//     const user = req.nextUrl.searchParams.get("user");

//     if (!user) {
//       return NextResponse.json({ messages: [] });
//     }

//     // 🔍 Find all chats where user is sender or receiver
//     const chats = await Chat.find({
//       $or: [{ userEmail: user }, { mentorEmail: user }],
//     }).sort({ lastUpdated: 1 });

//     // Combine all messages into a single flat array
//     const allMessages = chats.flatMap((c) => c.messages || []);

//     return NextResponse.json({ messages: allMessages });
//   } catch (err) {
//     console.error("❌ Chat fetch error:", err);
//     return NextResponse.json({ error: "Failed to load chat" }, { status: 500 });
//   }
// }

// export async function POST(req) {
//   try {
//     await connectDB();
//     const { sender, receiver, message } = await req.json();

//     if (!sender || !receiver || !message) {
//       return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//     }

//     // 🧠 Determine which one is student & mentor
//     const isSenderStudent = sender.includes("student") || !sender.includes("placify.com");
//     const userEmail = isSenderStudent ? sender : receiver;
//     const mentorEmail = isSenderStudent ? receiver : sender;

//     // 🔍 Find existing chat or create new
//     let chat = await Chat.findOne({ userEmail, mentorEmail });
//     if (!chat) {
//       chat = new Chat({
//         userEmail,
//         mentorEmail,
//         messages: [],
//       });
//     }

//     // ➕ Add new message
//     const newMsg = { sender, receiver, message, sentAt: new Date() };
//     chat.messages.push(newMsg);
//     chat.lastUpdated = new Date();
//     await chat.save();

//     // 🔔 Real-time trigger for both users
//     await pusherServer.trigger("placify-chat", "new-message", newMsg);

//     return NextResponse.json({ success: true, message: newMsg });
//   } catch (err) {
//     console.error("❌ Chat save error:", err);
//     return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import connectDB from "@/db/createDB";
import Chat from "@/models/Chat";
import { pusherServer } from "@/lib/pusher";

export async function GET(req) {
  try {
    await connectDB();
    const user = req.nextUrl.searchParams.get("user");

    if (!user) return NextResponse.json({ messages: [] });

    // Fetch chats where user is involved (as student or mentor)
    const chats = await Chat.find({
      $or: [{ userEmail: user }, { mentorEmail: user }],
    }).sort({ lastUpdated: 1 });

    const allMessages = chats.flatMap((c) => c.messages || []);

    return NextResponse.json({ messages: allMessages });
  } catch (err) {
    console.error("❌ Chat fetch error:", err);
    return NextResponse.json({ error: "Failed to load chat" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const { sender, receiver, message } = await req.json();

    if (!sender || !receiver || !message)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    // Identify student and mentor
    const isSenderStudent =
      sender.toLowerCase().includes("student") || sender.toLowerCase().includes("gmail");
    const userEmail = isSenderStudent ? sender : receiver;
    const mentorEmail = isSenderStudent ? receiver : sender;

    // Find or create chat
    let chat = await Chat.findOne({ userEmail, mentorEmail });
    if (!chat) chat = new Chat({ userEmail, mentorEmail, messages: [] });

    const newMsg = { sender, receiver, message, sentAt: new Date() };
    chat.messages.push(newMsg);
    chat.lastUpdated = new Date();
    await chat.save();

    // 🔔 Real-time broadcast
    await pusherServer.trigger("placify-chat", "new-message", newMsg);
    console.log("📡 Pusher event triggered:", newMsg);

    return NextResponse.json({ success: true, message: newMsg });
  } catch (err) {
    console.error("❌ Chat save error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
