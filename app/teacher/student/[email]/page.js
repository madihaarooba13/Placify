// "use client";
// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";

// export default function StudentProfilePage() {
//   const { email } = useParams();
//   const [student, setStudent] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // 🧠 Fetch student details by email
//   useEffect(() => {
//     const fetchStudent = async () => {
//       try {
//         const res = await fetch(`/api/students/${email}`);
//         if (!res.ok) throw new Error("Student not found");
//         const data = await res.json();
//         setStudent(data.student);
//       } catch (err) {
//         console.error("Error fetching student:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (email) fetchStudent();
//   }, [email]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center text-lg text-sky-700 font-semibold">
//         Loading student profile...
//       </div>
//     );
//   }

//   if (!student) {
//     return (
//       <div className="min-h-screen flex justify-center items-center text-lg text-red-500 font-semibold">
//         ❌ Student not found
//       </div>
//     );
//   }

//   // ✅ Handle both array & string formats for skills
//   const formattedSkills = student.skills
//     ? Array.isArray(student.skills)
//       ? student.skills.join(", ")
//       : student.skills
//     : "No skills";

//   // ✅ Handle goals if you have them
//   const formattedGoals = student.goals || "No goals added";

//   return (
//     <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 py-12 px-6 mt-32">
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
//         {/* 👤 Header Section */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
//           <div className="flex items-center space-x-4">
//             <img
//               src={student.profilepic || "/default-profile.png"}
//               alt="Profile"
//               className="w-20 h-20 rounded-full border-4 border-sky-400 shadow-md object-cover"
//             />
//             <div>
//               <h1 className="text-2xl font-bold text-sky-800">
//                 {student.name || student.username}
//               </h1>
//               <p className="text-gray-600">{student.email}</p>
//               <p className="text-sm text-gray-500">
//                 Role: {student.role?.toUpperCase()}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* 🏫 College Info */}
//         <div className="bg-gradient-to-r from-sky-50 to-emerald-50 rounded-xl p-5 mb-6 border border-sky-100">
//           <h2 className="text-lg font-semibold text-sky-700 mb-2">
//             🎓 Academic Details
//           </h2>
//           <p>
//             <strong>College:</strong> {student.college}
//           </p>
//           <p>
//             <strong>Branch:</strong> {student.branch || "Not specified"}
//           </p>
//           <p>
//             <strong>CGPA:</strong> {student.cgpa || "Not available"}
//           </p>
//           <p>
//             <strong>Enrollment No:</strong>{" "}
//             {student.enrollment || "Not available"}
//           </p>
//         </div>

//         {/* 📚 Semester Details */}
//         <div className="bg-gradient-to-r from-emerald-50 to-sky-50 rounded-xl p-5 mb-6 border border-emerald-100">
//           <h2 className="text-lg font-semibold text-emerald-700 mb-2">
//             📘 Semester Performance
//           </h2>
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
//             {Object.entries(student.semester || {}).map(([sem, val], i) => (
//               <p key={i} className="text-gray-700">
//                 <strong>{sem.toUpperCase()}:</strong>{" "}
//                 {val !== undefined ? val : "N/A"}
//               </p>
//             ))}
//           </div>
//         </div>

//         {/* 🧠 Skills & Goals */}
//         <div className="bg-gradient-to-r from-sky-50 to-green-50 rounded-xl p-5 mb-6 border border-green-100">
//           <h2 className="text-lg font-semibold text-green-700 mb-2">
//             💡 Skills & Goals
//           </h2>
//           <p>
//             <strong>Skills:</strong> {formattedSkills}
//           </p>
//           <p>
//             <strong>Goals:</strong> {formattedGoals}
//           </p>
//         </div>

//         {/* 📝 Resume */}
//         <div className="bg-gradient-to-r from-sky-50 to-indigo-50 rounded-xl p-5 mb-6 border border-indigo-100">
//           <h2 className="text-lg font-semibold text-indigo-700 mb-2">
//             📄 Resume
//           </h2>
//           {student.resume ? (
//             <a
//               href={student.resume}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-sky-600 hover:underline"
//             >
//               View Resume
//             </a>
//           ) : (
//             <p className="text-gray-500">No resume uploaded</p>
//           )}
//         </div>

//         {/* 🧾 Feedback */}
//         <div className="bg-gradient-to-r from-emerald-50 to-sky-50 rounded-xl p-5 border border-emerald-100">
//           <h2 className="text-lg font-semibold text-sky-700 mb-2">
//             🧾 Teacher Feedback
//           </h2>
//           {student.feedback?.rating ? (
//             <>
//               <p>
//                 <strong>Rating:</strong> {student.feedback.rating}/10
//               </p>
//               <p className="italic text-gray-700">
//                 “{student.feedback.feedback}”
//               </p>
//               <p className="text-xs text-gray-400 text-right">
//                 {new Date(student.feedback.date).toLocaleDateString()}
//               </p>
//             </>
//           ) : (
//             <p className="text-gray-500 italic">No feedback yet</p>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }
"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function StudentProfilePage() {
  const { email } = useParams();
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🧠 Fetch student details by email
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch(`/api/students/${email}`);
        if (!res.ok) throw new Error("Student not found");
        const data = await res.json();
        setStudent(data.student);
      } catch (err) {
        console.error("Error fetching student:", err);
      } finally {
        setLoading(false);
      }
    };
    if (email) fetchStudent();
  }, [email]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg text-sky-700 font-semibold ">
        Loading student profile...
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg text-red-500 font-semibold ">
        ❌ Student not found
      </div>
    );
  }

  // ✅ Handle both array & string formats for skills
  const formattedSkills = student.skills
    ? Array.isArray(student.skills)
      ? student.skills.join(", ")
      : student.skills
    : "No skills";

  const formattedGoals = student.goals || "No goals added";

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 py-12 px-6 mt-28 lg:mt-19">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-200">

        {/* 🔙 Back Button */}
        <button
          onClick={() => router.push("/teacher/dashboard")}
          className="mb-6 px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-semibold shadow-md transition hover:cursor-pointer"
        >
          ← Back to Dashboard
        </button>

        {/* 👤 Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 lg:space-x-10 space-y-3 sm:space-y-0 text-center sm:text-left mb-6 sm:mb-8 gap-2">
  {/* 🧑‍🎓 Avatar */}
  <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-sky-400 to-emerald-400 flex items-center justify-center border-2 md:border-3 border-white shadow-sm md:shadow-md shadow-emerald-100 overflow-hidden aspect-square mx-auto sm:mx-0">
    <span className="text-white text-xl sm:text-2xl md:text-3xl font-semibold drop-shadow-sm select-none">
      {student.name ? student.name.charAt(0).toUpperCase() : "S"}
    </span>
  </div>

  {/* 🧾 Info */}
  <div className="flex flex-col justify-center overflow-hidden">
    <h2 className="text-lg sm:text-xl font-semibold text-sky-800 truncate">
      {student.name || "Unknown Student"}
    </h2>
    <p className="text-sm text-gray-600 break-all">{student.email}</p>
    <p className="text-sm text-gray-600">{student.branch || "Branch N/A"}</p>
  </div>
</div>


        {/* 🏫 College Info */}
        <div className="bg-gradient-to-r from-sky-50 to-emerald-50 rounded-xl p-5 mb-6 border border-sky-100">
          <h2 className="text-lg font-semibold text-sky-700 mb-2">
            🎓 Academic Details
          </h2>
          <p>
            <strong>College:</strong> {student.college}
          </p>
          <p>
            <strong>Branch:</strong> {student.branch || "Not specified"}
          </p>
          <p>
            <strong>CGPA:</strong> {student.cgpa || "Not available"}
          </p>
          <p>
            <strong>Enrollment No:</strong>{" "}
            {student.enrollment || "Not available"}
          </p>
        </div>

        {/* 📚 Semester Details */}
        <div className="bg-gradient-to-r from-emerald-50 to-sky-50 rounded-xl p-5 mb-6 border border-emerald-100">
          <h2 className="text-lg font-semibold text-emerald-700 mb-2">
            📘 Semester Performance
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
            {Object.entries(student.semester || {}).map(([sem, val], i) => (
              <p key={i} className="text-gray-700">
                <strong>{sem.toUpperCase()}:</strong>{" "}
                {val !== undefined ? val : "N/A"}
              </p>
            ))}
          </div>
        </div>

        {/* 🧠 Skills & Goals */}
        <div className="bg-gradient-to-r from-sky-50 to-green-50 rounded-xl p-5 mb-6 border border-green-100">
          <h2 className="text-lg font-semibold text-green-700 mb-2">
            💡 Skills & Goals
          </h2>
          <p>
            <strong>Skills:</strong> {formattedSkills}
          </p>
          {/* <p>
            <strong>Goals:</strong> {formattedGoals}
          </p> */}
        </div>

        {/* 📄 Resume */}
        <div className="bg-gradient-to-r from-sky-50 to-indigo-50 rounded-xl p-5 mb-6 border border-indigo-100">
          <h2 className="text-lg font-semibold text-indigo-700 mb-2">
            📄 Resume
          </h2>
          {student.resume && student.resume.trim() !== "" ? (
            <a
              href={student.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-sky-600 hover:bg-sky-700 text-white px-5 py-2 rounded-lg font-semibold transition shadow-sm"
            >
              View Resume 🔗
            </a>
          ) : (
            <p className="text-gray-500 italic">No resume uploaded</p>
          )}
        </div>

        {/* 🧾 Feedback */}
        <div className="bg-gradient-to-r from-emerald-50 to-sky-50 rounded-xl p-5 border border-emerald-100">
          <h2 className="text-lg font-semibold text-sky-700 mb-2">
            🧾 Teacher Feedback
          </h2>
          {student.feedback?.rating ? (
            <>
              <p>
                <strong>Rating:</strong> {student.feedback.rating}/10
              </p>
              <p className="italic text-gray-700">
                “{student.feedback.feedback}”
              </p>
              <p className="text-xs text-gray-400 text-right">
                {new Date(student.feedback.date).toLocaleDateString()}
              </p>
            </>
          ) : (
            <p className="text-gray-500 italic">No feedback yet</p>
          )}
        </div>
      </div>
    </main>
  );
}
