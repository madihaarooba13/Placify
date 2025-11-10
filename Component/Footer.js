"use client";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-sky-200 text-black mt-12">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          {/* Logo / Brand */}
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center gap-2">
              <img src="tea.gif" alt="Placify Logo" className="h-8" />
              <span className="text-2xl font-semibold whitespace-nowrap">
                Placify
              </span>
            </Link>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">Resources</h2>
              <ul className="text-black font-medium">
                <li className="mb-4">
                  <Link href="/" className="hover:underline">Home</Link>
                </li>
                <li>
                  <Link href="/placement" className="hover:underline">Placement</Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">Follow us</h2>
              <ul className="text-black font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">Github</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Discord</a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">Legal</h2>
              <ul className="text-black font-medium">
                <li className="mb-4">
                  <Link href="#" className="hover:underline">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms&condition" className="hover:underline">Terms & Conditions</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6 border-black/30 sm:mx-auto lg:my-8" />

        {/* Copyright */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm sm:text-center">
            © {new Date().getFullYear()} <Link href="/" className="hover:underline">Placify™</Link>. All Rights Reserved.
          </span>

          <div className="flex mt-4 sm:justify-center sm:mt-0 gap-4">
            <a href="#" className="hover:text-gray-700">
              <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h10.97v-9.29H9.69v-3.62h3.05V8.41c0-3.02 1.79-4.66 4.53-4.66 1.29 0 2.4.1 2.73.14v3.17h-1.87c-1.47 0-1.75.7-1.75 1.72v2.25h3.5l-.46 3.62h-3.04V24h5.96c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-gray-700">
              <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.56c-.89.39-1.84.66-2.84.78a4.93 4.93 0 0 0 2.17-2.72 9.865 9.865 0 0 1-3.12 1.19 4.924 4.924 0 0 0-8.39 4.49A13.958 13.958 0 0 1 1.67 3.15a4.923 4.923 0 0 0 1.52 6.56 4.902 4.902 0 0 1-2.23-.61v.06a4.923 4.923 0 0 0 3.95 4.83 4.94 4.94 0 0 1-2.22.08 4.923 4.923 0 0 0 4.59 3.42 9.867 9.867 0 0 1-6.1 2.1c-.39 0-.77-.02-1.15-.07a13.945 13.945 0 0 0 7.56 2.21c9.06 0 14-7.5 14-14 0-.21 0-.42-.01-.63a10.012 10.012 0 0 0 2.46-2.55z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
