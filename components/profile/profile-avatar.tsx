"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfile } from "@/types/profile";

interface ProfileAvatarProps {
  profile: UserProfile | null;
  size?: "sm" | "md" | "lg" | "xl";
}

export const ProfileAvatar = ({ profile, size = "lg" }: ProfileAvatarProps) => {
  const getInitials = (name?: string) => {
    if (!name) return "U";

    const names = name.split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();

    return `${names[0].charAt(0)}${names[names.length - 1].charAt(
      0
    )}`.toUpperCase();
  };

  const sizeClasses = {
    sm: "h-12 w-12 text-sm",
    md: "h-16 w-16 text-lg",
    lg: "h-20 w-20 sm:h-24 sm:w-24 text-lg sm:text-xl",
    xl: "h-24 w-24 sm:h-32 sm:w-32 text-xl sm:text-2xl",
  };

  return (
    <Avatar className={sizeClasses[size]}>
      <AvatarImage
        src={"/vaza-logo.webp"}
        alt={profile?.full_name || "User avatar"}
      />
      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
        {getInitials(profile?.full_name)}
      </AvatarFallback>
    </Avatar>
  );
};
