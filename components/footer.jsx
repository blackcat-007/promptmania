"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-10 w-full">
      <div className="max-w-7xl mx-auto px-6 py-8 md:flex md:justify-between md:items-center">
        {/* Left Section - Logo */}
        <div className="flex items-center gap-2 mb-6 md:mb-0">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/images/logo.svg"
              alt="Promptmania Logo"
              width={35}
              height={35}
              className="object-contain"
            />
            <p className="text-xl font-bold text-gray-800 dark:text-white">
              Promptmania
            </p>
          </Link>
        </div>

        {/* Middle Section - Links */}
        <div className="flex flex-wrap gap-6 mb-6 md:mb-0 text-sm">
          <Link
            href="/community-guidelines"
            className="hover:text-blue-500 transition"
          >
            Community Guidelines
          </Link>
          <Link
            href="/privacy-policy"
            className="hover:text-blue-500 transition"
          >
            Privacy Policy
          </Link>
          <a
            href="https://github.com/blackcat-007/promptmania"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition"
          >
            GitHub Repo
          </a>
          <a
            href="mailto:shubhodeepmukherjee24@gmail.com"
            className="hover:text-blue-500 transition"
          >
            Contact
          </a>
        </div>

        {/* Right Section - Copyright */}
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center md:text-right">
          © {new Date().getFullYear()} Promptmania. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
