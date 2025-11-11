"use client";
import React from "react";
import {
  ShieldCheck,
  User,
  Layers,
  Lock,
  Cookie,
  Pencil,
  RefreshCcw,
  Mail
} from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6 bg-[#f9fafb] text-gray-800">

      {/* Fade-In Animation CSS */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(14px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
          animation: fadeInUp .6s ease-out both;
        }
      `}</style>

      {/* Header */}
      <div className="max-w-4xl mx-auto mb-12 text-center fade-in">
        <h1 className="text-4xl font-bold text-sky-700">
          Privacy Policy
        </h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto leading-relaxed text-base">
          Your privacy matters to us. This policy explains clearly how your data is collected,
          why we collect it, and the thoughtful measures we use to protect it.  
          Our goal is to ensure transparency and a safe experience on Placify.
        </p>
      </div>

      {/* Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12 space-y-12 fade-in">

        {/* Section */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-5 h-5 text-sky-600" />
            <h2 className="text-xl font-semibold text-sky-700">1. Introduction</h2>
          </div>
          <p className="leading-relaxed">
            Placify aims to help students gain clarity, skill confidence, and direction for
            placements. While using Placify, you share certain information with us. We treat
            that information responsibly. This policy ensures that you always know how your
            data is being handled.
          </p>
        </section>

        <hr className="border-gray-300 border-dotted" />

        {/* Section */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <User className="w-5 h-5 text-sky-600" />
            <h2 className="text-xl font-semibold text-sky-700">2. Information We Collect</h2>
          </div>
          <p className="mb-3 leading-relaxed">
            We collect information only to provide a smooth, personalized experience:
          </p>
          <ul className="list-disc ml-6 space-y-1 leading-relaxed">
            <li><strong>Profile Details:</strong> Name, email, and optional information you edit.</li>
            <li><strong>Usage Behavior:</strong> Pages viewed, interactions, time spent.</li>
            <li><strong>Technical Data:</strong> Browser type, device type, region-level IP insights.</li>
          </ul>
        </section>

        <hr className="border-gray-300 border-dotted" />

        {/* Section */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-5 h-5 text-sky-600" />
            <h2 className="text-xl font-semibold text-sky-700">3. How We Use Your Information</h2>
          </div>
          <p className="leading-relaxed mb-3">
            Every piece of data has a purpose. Your information helps us:
          </p>
          <ul className="list-disc ml-6 space-y-1 leading-relaxed">
            <li>Recommend better learning resources</li>
            <li>Improve your dashboard experience</li>
            <li>Maintain platform safety and stability</li>
            <li>Offer relevant placement guidance</li>
          </ul>
        </section>

        <hr className="border-gray-300 border-dotted" />

        {/* Section */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-5 h-5 text-sky-600" />
            <h2 className="text-xl font-semibold text-sky-700">4. Data Security</h2>
          </div>
          <p className="leading-relaxed">
            We take security seriously. Access to data is limited and monitored. While
            no online system is entirely risk-free, we continuously strengthen our
            protection methods to keep your information safe and respected.
          </p>
        </section>

        <hr className="border-gray-300 border-dotted" />

        {/* Section */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-5 h-5 text-sky-600" />
            <h2 className="text-xl font-semibold text-sky-700">5. Sharing of Information</h2>
          </div>
          <p className="leading-relaxed">
            We <strong>never</strong> sell or trade your data. It is only shared when legally required or
            when you clearly give permission—for example, during verification or integration
            with an authorized service.
          </p>
        </section>

        <hr className="border-gray-300 border-dotted" />

        {/* Section */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <Cookie className="w-5 h-5 text-sky-600" />
            <h2 className="text-xl font-semibold text-sky-700">6. Cookies</h2>
          </div>
          <p className="leading-relaxed">
            Cookies help pages load faster and remember your preferences. You can disable
            cookies in your browser settings at any time—you will still be able to use Placify normally.
          </p>
        </section>

        <hr className="border-gray-300 border-dotted" />

        <section>
          <div className="flex items-center gap-2 mb-2">
            <Pencil className="w-5 h-5 text-sky-600" />
            <h2 className="text-xl font-semibold text-sky-700">7. Your Rights</h2>
          </div>
          <ul className="list-disc ml-6 space-y-1 leading-relaxed">
            <li>View stored data</li>
            <li>Update or correct your profile</li>
            <li>Request deletion of personal information</li>
          </ul>
        </section>

        <hr className="border-gray-300 border-dotted" />

        <section>
          <div className="flex items-center gap-2 mb-2">
            <RefreshCcw className="w-5 h-5 text-sky-600" />
            <h2 className="text-xl font-semibold text-sky-700">8. Policy Updates</h2>
          </div>
          <p className="leading-relaxed">
            As Placify grows, features evolve. If changes are made, this page will always reflect
            the latest version of the Privacy Policy.
          </p>
        </section>

        <hr className="border-gray-300 border-dotted" />

        <section>
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-5 h-5 text-sky-600" />
            <h2 className="text-xl font-semibold text-sky-700">9. Contact Us</h2>
          </div>
          <p className="leading-relaxed">
            If you have privacy-related questions or suggestions, contact us at:
            <strong> support@placify.com</strong>
          </p>
        </section>

        <p className="text-center text-xs text-gray-500 mt-10">
          Last Updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}