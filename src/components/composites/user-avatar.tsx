"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name: string;
  imageSrc?: string;
  className?: string;
  fallbackClassName?: string;
}

export function UserAvatar({
  name,
  imageSrc,
  className,
  fallbackClassName,
}: UserAvatarProps) {
  const fallbackText = name.charAt(0).toUpperCase();

  return (
    <Avatar className={cn("cursor-pointer", className)}>
      <AvatarImage src={imageSrc} alt={name} />
      <AvatarFallback className={fallbackClassName}>
        {fallbackText}
      </AvatarFallback>
    </Avatar>
  );
}
