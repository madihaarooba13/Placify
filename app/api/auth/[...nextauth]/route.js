// import NextAuth from 'next-auth';
// import GitHubProvider from 'next-auth/providers/github';
// import connectDB from '@/db/createDB';
// import User from '@/models/User';

// // Export authOptions so it can be imported in other API routes
// export const authOptions = {
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//     // You can uncomment/add other providers if needed
//     // AppleProvider({ ... })
//     // GoogleProvider({ ... })
//     // FacebookProvider({ ... })
//     // EmailProvider({ ... })
//   ],

//   callbacks: {
//     async signIn({ user, account }) {
//       if (account.provider === 'github') {
//         await connectDB();

//         const existingUser = await User.findOne({ email: user.email });
//         if (!existingUser) {
//           const newUser = new User({
//             email: user.email,
//             username: user.email.split('@')[0],
//           });
//           await newUser.save();
//         }
//       }
//       return true; // Allow sign in
//     },

//     async session({ session }) {
//       await connectDB();
//       const dbUser = await User.findOne({ email: session.user.email });
//       if (dbUser) {
//         session.user.name = dbUser.username;
//       }
//       return session;
//     },
//   },

//   secret: process.env.NEXTAUTH_SECRET, // Required for JWT/session encryption
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };


import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/db/createDB";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      await connectDB();

      const teacherEmails = process.env.TEACHER_EMAILS
        ? process.env.TEACHER_EMAILS.split(",").map((e) => e.trim())
        : [];

      let existingUser = await User.findOne({ email: user.email });

      const isTeacher = teacherEmails.includes(user.email);

      if (!existingUser) {
        existingUser = new User({
          email: user.email,
          username: user.email.split("@")[0],
          role: isTeacher ? "teacher" : "student",
        });
        await existingUser.save();
      } else if (!existingUser.role) {
        existingUser.role = isTeacher ? "teacher" : "student";
        await existingUser.save();
      }

      console.log(`User Role for ${user.email}:`, existingUser.role);
      return true;
    },

    async session({ session }) {
      await connectDB();
      const dbUser = await User.findOne({ email: session.user.email });
      if (dbUser) {
        session.user.name = dbUser.username;
        session.user.role = dbUser.role;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
