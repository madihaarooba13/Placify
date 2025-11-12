// // // import Pusher from "pusher";
// // // import ClientPusher from "pusher-js";

// // // // 🧠 Server-side instance (used in API routes)
// // // export const pusherServer = new Pusher({
// // //   appId: process.env.PUSHER_APP_ID,
// // //   key: process.env.PUSHER_KEY,
// // //   secret: process.env.PUSHER_SECRET,
// // //   cluster: process.env.PUSHER_CLUSTER,
// // //   useTLS: true,
// // // });

// // // // 💬 Client-side instance (used in React components)
// // // export const pusherClient = new ClientPusher(process.env.PUSHER_KEY, {
// // //   cluster: process.env.PUSHER_CLUSTER,
// // //   forceTLS: true,
// // // });

// // import Pusher from "pusher";
// // import ClientPusher from "pusher-js";

// // // 🧠 Server-side Pusher (for API routes)
// // export const pusherServer = new Pusher({
// //   appId: process.env.PUSHER_APP_ID,
// //   key: process.env.PUSHER_KEY,
// //   secret: process.env.PUSHER_SECRET,
// //   cluster: process.env.PUSHER_CLUSTER,
// //   useTLS: true,
// // });

// // // 💬 Client-side Pusher (for React components)
// // export const pusherClient = new ClientPusher(
// //   process.env.NEXT_PUBLIC_PUSHER_KEY, // ✅ must use NEXT_PUBLIC_ prefix
// //   {
// //     cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
// //     forceTLS: true,
// //   }
// // );
// import Pusher from "pusher";
// import ClientPusher from "pusher-js";

// // 🧠 Server-side instance
// export const pusherServer = new Pusher({
//   appId: process.env.PUSHER_APP_ID,
//   key: process.env.PUSHER_KEY,
//   secret: process.env.PUSHER_SECRET,
//   cluster: process.env.PUSHER_CLUSTER,
//   useTLS: true,
// });

// // 💬 Client-side instance
// export const pusherClient = new ClientPusher(
//   process.env.NEXT_PUBLIC_PUSHER_KEY,
//   {
//     cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
//     forceTLS: true,
//   }
// );
import Pusher from "pusher";
import ClientPusher from "pusher-js";

// 🧠 Server-side instance (for API routes)
export const pusherServer = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

// 💬 Client-side instance (for React components)
export const pusherClient = new ClientPusher(
  process.env.NEXT_PUBLIC_PUSHER_KEY,
  {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    forceTLS: true,
  }
);

