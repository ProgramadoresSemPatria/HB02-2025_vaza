"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const supabase = createClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Error checking user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Listen for auth changes
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    const names = name.split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return `${names[0].charAt(0)}${names[names.length - 1].charAt(
      0
    )}`.toUpperCase();
  };

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
              {!loading && (
                <>
                  {!user ? (
                    <>
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
                    </>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className="flex items-center space-x-3 hover:opacity-80 transition-opacity px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                          style={{ cursor: "pointer" }}
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src="/vaza-logo.webp"
                              alt={
                                user?.user_metadata?.full_name || "User avatar"
                              }
                            />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-semibold">
                              {getInitials(user?.user_metadata?.full_name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium text-gray-700">
                            {user?.user_metadata?.full_name ||
                              user?.email ||
                              "Usuário"}
                          </span>
                          <svg
                            className="w-4 h-4 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem asChild>
                          <Link href="/dashboard/profile">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/dashboard/countries">Dashboard</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleSignOut}>
                          Sign Out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
