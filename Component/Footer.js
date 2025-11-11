"use client";
import React from "react";
import Link from "next/link";
import {
  Linkedin,
  Github,
  Home,
  Briefcase,
  ShieldCheck,
  FileText,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-sky-200 text-black mt-6 sm:mt-10">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">

        <div className="md:flex md:justify-between">

          {/* Logo / Brand */}
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/image.png"
                alt="Placify Logo"
                height={70}
                width={70}
                className="border rounded-2xl border-transparent"
              />
              <div>
                <div className="text-3xl font-bold whitespace-nowrap">
                  Placify
                </div>
                <div className="font-bold text-xs">- path to placement</div>
              </div>
            </Link>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">

            {/* Resources */}
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">Resources</h2>
              <ul className="text-black font-medium space-y-3">

                <li className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-sky-700 transition-transform duration-200 hover:scale-110" />
                  <Link href="/" className="hover:underline">Home</Link>
                </li>

                <li className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-sky-700 transition-transform duration-200 hover:scale-110" />
                  <Link href="/placement" className="hover:underline">Placement</Link>
                </li>

              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">Follow Us</h2>
              <ul className="text-black font-medium space-y-3">

                <li className="flex items-center gap-2">
                  <Linkedin className="w-5 h-5 text-sky-700 transition-transform duration-200 hover:scale-110" />
                  <a
                    href="https://www.linkedin.com/company/jnctbhopal-ac-in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    LinkedIn
                  </a>
                </li>

                <li className="flex items-center gap-2">
                  <Github className="w-5 h-5 transition-transform duration-200 hover:scale-110" />
                  <a
                    href="https://github.com/madihaarooba13"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    GitHub
                  </a>
                </li>

              </ul>
            </div>

            {/* Legal */}
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">Legal</h2>
              <ul className="text-black font-medium space-y-3">

                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-sky-700 transition-transform duration-200 hover:scale-110" />
                  <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
                </li>

                <li className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-sky-700 transition-transform duration-200 hover:scale-110" />
                  <Link href="/terms&condition" className="hover:underline">Terms & Conditions</Link>
                </li>

              </ul>
            </div>

          </div>
        </div>

        <hr className="my-6 border-black/30 sm:mx-auto lg:my-8" />

        {/* Bottom */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm sm:text-center">
            © {new Date().getFullYear()} <Link href="/" className="hover:underline">Placify™</Link>.
            All Rights Reserved.
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
