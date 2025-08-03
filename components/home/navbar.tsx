"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div
      data-bp-location="top_navigation_bar"
      className="global-nav bg-global-nav-background h-global-nav black"
      data-id="t-100"
    >
      <div className="global-nav-inner h-global-nav" data-id="t-101">
        <div
          aria-hidden="true"
          className="z-global-nav-overlay w-full fixed top-0 h-global-nav [&>*]:h-full bg-container-background black opacity-30 rounded-b-3.5xl"
          data-id="t-102"
        ></div>
      </div>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <Image
                src="/vaza-logo.webp"
                alt="Vaza Logo"
                className="h-8 w-auto"
                width={100}
                height={100}
              />
            </Link>

            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="hidden lg:block text-sm text-gray-700 hover:text-blue-600 transition-colors duration-300 cursor-pointer"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="group relative overflow-hidden bg-[#28313a] text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 cursor-pointer"
              >
                <span className="relative z-10 transition-all duration-500 group-hover:text-white">
                  Sign Up
                </span>
                <svg
                  className="w-4 h-4 relative z-10 transition-all duration-500 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
                <div className="absolute inset-0 bg-blue-600 transform translate-x-full transition-transform duration-300 ease-in-out group-hover:translate-x-0"></div>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
