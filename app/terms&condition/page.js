"use client";
import React from "react";

export default function TermsPage() {
  return (
    <div className="min-h-screen pb-16 pt-32 px-6 bg-gradient-to-b from-sky-50 to-sky-200 mt-3">

      {/* Animated Gradient Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-700 to-blue-900 animate-pulse">
          Terms & Conditions
        </h1>

        <p className="mt-4 text-gray-700 text-lg max-w-2xl mx-auto leading-7">
          These Terms govern your use of Placify. Please read them carefully to understand
          your rights and responsibilities while using our platform.
        </p>
      </div>

      {/* Glass Card */}
      <div className="backdrop-blur-lg bg-white/60 border border-white/40 shadow-xl rounded-3xl max-w-4xl mx-auto p-8 md:p-12 text-gray-800 leading-7">

        <h2 className="text-2xl font-bold mb-3 text-sky-700">🎯 Purpose of Placify</h2>
        <p className="mb-6">
          Placify is designed to guide students in developing skills, career confidence, 
          and placement preparation. The platform supports growth and learning in a positive environment.
        </p>

        <h2 className="text-2xl font-bold mb-3 text-sky-700">🧑‍💻 User Responsibilities</h2>
        <ul className="list-disc ml-6 mb-6 space-y-2">
          <li>Maintain confidentiality and security of your account.</li>
          <li>Provide accurate information while using platform features.</li>
          <li>Avoid misuse, disruption, or harmful use of any services.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-3 text-sky-700">📘 Learning Material</h2>
        <p className="mb-6">
          Our resources are designed to support your preparation, but we do not guarantee 
          outcomes or completeness. Growth depends on personal effort and application.
        </p>

        <h2 className="text-2xl font-bold mb-3 text-sky-700">🎨 Intellectual Property</h2>
        <p className="mb-6">
          All branding, visual design, and content belong to Placify. Reuse or redistribution
          without permission is not allowed.
        </p>

        <h2 className="text-2xl font-bold mb-3 text-sky-700">🌍 Third-Party Links</h2>
        <p className="mb-6">
          Placify may reference external websites. We are not responsible for the practices or content of third-party platforms.
        </p>

        <h2 className="text-2xl font-bold mb-3 text-sky-700">⚖ Limitation of Liability</h2>
        <p className="mb-6">
          Placify offers guidance but does not guarantee job placement or results.
          Your decisions and outcomes remain your responsibility.
        </p>

        <h2 className="text-2xl font-bold mb-3 text-sky-700">🔐 Account Suspension</h2>
        <p className="mb-6">
          We may limit or suspend accounts that engage in harmful or misleading behavior.
        </p>

        <h2 className="text-2xl font-bold mb-3 text-sky-700">📝 Updates to These Terms</h2>
        <p className="mb-6">
          These Terms may be updated when necessary. The latest version will always be available on this page.
        </p>

        <h2 className="text-2xl font-bold mb-3 text-sky-700">💬 Contact Us</h2>
        <p>
          For questions or support, reach us at:
          <strong> support@placify.com</strong>
        </p>

        <p className="mt-10 text-sm text-gray-500 text-center">
          Last Updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}