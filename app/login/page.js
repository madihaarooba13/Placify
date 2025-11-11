

// "use client";
// import React, { useEffect } from "react";
// import { useSession, signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";

// const Login = () => {
//   const { data: session } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (session) {
//       if (session.user.role === "teacher") {
//         router.push("/teacher-dashboard");
//       } else {
//         router.push("/profile"); // or /student-dashboard
//       }
//     }
//   }, [session, router]);

//   return (
//     <div className="text-white py-20 min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-sky-700 via-sky-500 to-sky-300">
//       <h1 className="text-center font-bold text-4xl mb-10">
//         Login to Get Started
//       </h1>

//       <div className="flex flex-col gap-4 justify-center items-center w-full px-4">
//         {/* ✅ Google Login */}
//         <button
//           onClick={() => signIn("google")}
//           className="flex items-center bg-white w-full sm:w-80 justify-center border border-gray-300 rounded-lg shadow-md px-6 py-3 text-sm font-medium text-gray-800 hover:bg-gray-200 transition"
//         >
//           <svg
//             className="h-6 w-6 mr-2"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="-0.5 0 48 48"
//           >
//             <g fill="none" fillRule="evenodd">
//               <path
//                 fill="#FBBC05"
//                 d="M9.827 24c0-1.524.253-2.986.705-4.357L2.623 13.604A23.925 23.925 0 0 0 .214 24c0 3.737.868 7.262 2.406 10.388l7.904-6.051A14.137 14.137 0 0 1 9.827 24"
//               ></path>
//               <path
//                 fill="#EB4335"
//                 d="M23.714 10.133c3.311 0 6.302 1.173 8.652 3.093l6.836-6.826C35.036 2.773 29.695.533 23.714.533c-9.287 0-17.268 5.31-21.09 13.07l7.909 6.04c1.822-5.532 7.017-9.51 13.181-9.51"
//               ></path>
//               <path
//                 fill="#34A853"
//                 d="M23.714 37.867c-6.165 0-11.36-3.979-13.182-9.511l-7.909 6.039c3.822 7.761 11.803 13.072 21.09 13.072 5.732 0 11.204-2.035 15.312-5.849l-7.507-5.804a14.14 14.14 0 0 1-7.804 2.053"
//               ></path>
//               <path
//                 fill="#4285F4"
//                 d="M46.145 24c0-1.387-.213-2.88-.534-4.267H23.714v9.067h12.604a10.945 10.945 0 0 1-4.8 6.014l7.507 5.804C43.339 37.614 46.145 31.649 46.145 24"
//               ></path>
//             </g>
//           </svg>
//           <span>Continue with Google</span>
//         </button>

//         {/* ✅ GitHub Login */}
//         <button
//           onClick={() => signIn("github")}
//           className="flex items-center bg-white w-full sm:w-80 justify-center border border-gray-300 rounded-lg shadow-md px-6 py-3 text-sm font-medium text-gray-800 hover:bg-gray-200 transition"
//         >
//           <svg
//             className="h-6 w-6 mr-2"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 73 73"
//           >
//             <rect
//               stroke="#000"
//               strokeWidth="2"
//               fill="#000"
//               x="-1"
//               y="-1"
//               width="71"
//               height="71"
//               rx="14"
//             ></rect>
//             <path
//               d="M58.306 21.428C55.896 17.297 52.625 14.027 48.495 11.616A26.935 26.935 0 0 0 34.962 8a26.935 26.935 0 0 0-13.534 3.616A25.665 25.665 0 0 0 11.616 21.43 26.935 26.935 0 0 0 8 34.961c0 5.875 1.714 11.158 5.143 15.851a25.665 25.665 0 0 0 13.288 9.742..."
//               fill="#FFF"
//             ></path>
//           </svg>
//           <span>Continue with GitHub</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;

"use client";
import React, { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      if (session.user.role === "teacher") {
        router.push("/teacher/dashboard");
      } else {
        router.push("/profile"); // or /student-dashboard
      }
    }
  }, [session, router]);

  return (
    <div className="text-white py-20 min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200">
      {/* 💫 Animated & slightly darker heading */}
      <h1
        className="text-center font-extrabold text-5xl sm:text-6xl mb-6 
        bg-clip-text text-transparent 
        bg-gradient-to-r from-sky-800 via-blue-700 to-cyan-600 
        bg-[length:200%_200%] animate-gradient-slow 
        drop-shadow-[0_1px_6px_rgba(255,255,255,0.25)]"
      >
        Login to Get Started
      </h1>

      <p className="text-center text-gray-100 text-lg mb-10 max-w-lg">
        Step into your placement journey with{" "}
        <span className="font-semibold text-sky-950">Placify</span> — your smart
        guide to success 🚀
      </p>

      <div className="flex flex-col gap-4 justify-center items-center w-full px-4">
        {/* ✅ Google Login */}
        <button
          onClick={() => signIn("google")}
          className="cursor-pointer flex items-center bg-white w-full sm:w-80 justify-center border border-gray-300 rounded-lg shadow-md px-6 py-3 text-sm font-medium text-gray-800 hover:bg-gray-200 hover:scale-[1.03] transition-transform duration-200"
        >
          <svg
            className="h-6 w-6 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-0.5 0 48 48"
          >
            <g fill="none" fillRule="evenodd">
              <path
                fill="#FBBC05"
                d="M9.827 24c0-1.524.253-2.986.705-4.357L2.623 13.604A23.925 23.925 0 0 0 .214 24c0 3.737.868 7.262 2.406 10.388l7.904-6.051A14.137 14.137 0 0 1 9.827 24"
              ></path>
              <path
                fill="#EB4335"
                d="M23.714 10.133c3.311 0 6.302 1.173 8.652 3.093l6.836-6.826C35.036 2.773 29.695.533 23.714.533c-9.287 0-17.268 5.31-21.09 13.07l7.909 6.04c1.822-5.532 7.017-9.51 13.181-9.51"
              ></path>
              <path
                fill="#34A853"
                d="M23.714 37.867c-6.165 0-11.36-3.979-13.182-9.511l-7.909 6.039c3.822 7.761 11.803 13.072 21.09 13.072 5.732 0 11.204-2.035 15.312-5.849l-7.507-5.804a14.14 14.14 0 0 1-7.804 2.053"
              ></path>
              <path
                fill="#4285F4"
                d="M46.145 24c0-1.387-.213-2.88-.534-4.267H23.714v9.067h12.604a10.945 10.945 0 0 1-4.8 6.014l7.507 5.804C43.339 37.614 46.145 31.649 46.145 24"
              ></path>
            </g>
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* ✅ GitHub Login (official logo) */}
        <button
          onClick={() => signIn("github")}
          className="cursor-pointer flex items-center bg-white w-full sm:w-80 justify-center border border-gray-300 rounded-lg shadow-md px-6 py-3 text-sm font-medium text-gray-800 hover:bg-gray-200 hover:scale-[1.03] transition-transform duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12a12.003 12.003 0 0 0 8.207 11.385c.6.11.793-.26.793-.577v-2.017c-3.338.726-4.043-1.61-4.043-1.61-.546-1.385-1.334-1.754-1.334-1.754-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.238 1.838 1.238 1.07 1.835 2.809 1.305 3.492.998.108-.775.42-1.305.763-1.606-2.665-.3-5.467-1.335-5.467-5.933 0-1.31.467-2.382 1.235-3.223-.124-.303-.535-1.523.118-3.176 0 0 1.008-.323 3.3 1.23a11.48 11.48 0 0 1 3.005-.404c1.02.005 2.045.138 3.006.404 2.29-1.553 3.297-1.23 3.297-1.23.655 1.653.243 2.873.12 3.176.77.841 1.234 1.913 1.234 3.223 0 4.61-2.807 5.63-5.48 5.922.43.372.823 1.103.823 2.222v3.293c0 .32.19.694.8.576A12.004 12.004 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
          </svg>
          <span>Continue with GitHub</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
