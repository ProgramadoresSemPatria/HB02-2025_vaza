"use client";

import Image from "next/image";
import Link from "next/link";

export const FooterSection = () => {
  return (
    <footer className="pt-24 px-6 pb-6 lg:pt-32 lg:pb-6 text-black">
      <div className="lg:flex lg:flex-row-reverse lg:justify-between lg:mb-64">
        <div className="flex justify-between lg:gap-x-19 lg:justify-normal">
          <nav className="flex flex-col gap-y-5 lg:gap-y-4">
            <h6 className="text-xs font-semibold uppercase tracking-wider">
              INFO
            </h6>
            <div className="flex flex-col gap-y-1 lg:gap-y-1">
              <Link href="/dashboard" className="text-sm group">
                <div className="overflow-hidden h-5 lg:h-5">
                  <div className="flex flex-col transition-all duration-300 ease-in-out group-hover:-translate-y-6 gap-y-0">
                    <span>Dashboard</span>
                    <span>Dashboard</span>
                  </div>
                </div>
              </Link>
              <Link href="/plan" className="text-sm group">
                <div className="overflow-hidden h-5 lg:h-5">
                  <div className="flex flex-col transition-all duration-300 ease-in-out group-hover:-translate-y-6 gap-y-0">
                    <span>Create Plan</span>
                    <span>Create Plan</span>
                  </div>
                </div>
              </Link>
              <Link href="/countries" className="text-sm group">
                <div className="overflow-hidden h-5 lg:h-5">
                  <div className="flex flex-col transition-all duration-300 ease-in-out group-hover:-translate-y-6 gap-y-0">
                    <span>Countries</span>
                    <span>Countries</span>
                  </div>
                </div>
              </Link>
            </div>
          </nav>

          <nav className="flex flex-col gap-y-5 lg:gap-y-4">
            <h6 className="text-xs font-semibold uppercase tracking-wider">
              Connect
            </h6>
            <div className="flex flex-col gap-y-1 items-end lg:items-start lg:gap-y-1">
              <a
                href="mailto:hello@vazai.com"
                className="text-sm group lg:text-sm"
              >
                <div className="overflow-hidden h-5 lg:h-5">
                  <div className="flex flex-col transition-all duration-300 ease-in-out group-hover:-translate-y-6 gap-y-0">
                    <span>Email</span>
                    <span>Email</span>
                  </div>
                </div>
              </a>
              <a
                href="tel:+1 (555) 123-4567"
                className="text-sm group lg:text-sm"
              >
                <div className="overflow-hidden h-5 lg:h-5">
                  <div className="flex flex-col transition-all duration-300 ease-in-out group-hover:-translate-y-6 gap-y-0">
                    <span>Phone</span>
                    <span>Phone</span>
                  </div>
                </div>
              </a>
              <Link href="/login" className="text-sm group lg:text-sm">
                <div className="overflow-hidden h-5 lg:h-5">
                  <div className="flex flex-col transition-all duration-300 ease-in-out group-hover:-translate-y-6 gap-y-0">
                    <span>Login</span>
                    <span>Login</span>
                  </div>
                </div>
              </Link>
              <div className="flex gap-x-1 w-fit mt-3 items-center lg:hidden lg:gap-x-1">
                <span className="text-xs inline-block">© 2025</span>
              </div>
            </div>
          </nav>
        </div>

        <div className="lg:flex lg:flex-col-reverse lg:items-start lg:justify-end lg:gap-y-8">
          <div className="mt-24 flex flex-col items-center gap-y-1 lg:mt-0 lg:justify-start lg:items-start lg:gap-y-1">
            <a href="mailto:hello@vazai.com" className="text-lg font-medium">
              hello@vazai.com
            </a>
            <a href="tel:+1 (555) 123-4567" className="text-lg font-medium">
              +1 (555) 123-4567
            </a>
          </div>

          <div className="text-xs mt-26 flex justify-center items-center gap-x-2 lg:hidden">
            <div className="flex gap-x-2 items-center">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="whitespace-nowrap">
                Based in São Paulo, Brazil
              </span>
            </div>
            <div className="w-1 h-1 flex-shrink-0 bg-black"></div>
            <div className="flex gap-x-2 items-center">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="whitespace-nowrap">Working Globally</span>
            </div>
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-x-6 text-black">
            <div className="flex gap-x-1 items-center">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="whitespace-nowrap">VAZAI 2025</span>
            </div>
            <div className="flex gap-x-2 items-center">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="whitespace-nowrap">
                Based in São Paulo, Brazil
              </span>
            </div>
            <div className="flex gap-x-2 items-center">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="whitespace-nowrap">Working Globally</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 lg:hidden relative">
        <svg
          viewBox="0 0 400 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <text
            x="200"
            y="130"
            textAnchor="middle"
            fill="#1e40af"
            fontSize="120"
            fontWeight="900"
            letterSpacing="-0.05em"
            fontFamily="system-ui, -apple-system, sans-serif"
            style={{ lineHeight: "100%" }}
          >
            VAZAI
          </text>
        </svg>
      </div>

      <div className="w-full hidden gap-x-12 lg:flex items-center">
        <div className="w-3/4">
          <svg
            viewBox="0 0 1000 350"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <text
              x="500"
              y="280"
              textAnchor="middle"
              fill="#1e40af"
              fontSize="280"
              fontWeight="900"
              letterSpacing="-0.1em"
              fontFamily="system-ui, -apple-system, sans-serif"
              style={{ lineHeight: "100%" }}
            >
              VAZAI
            </text>
          </svg>
        </div>
        <div className="w-1/4">
          <div className="aspect-video">
            <Image
              alt="footer gif"
              loading="lazy"
              width={500}
              height={500}
              className="rounded-lg h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=500&h=500&fit=crop"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
