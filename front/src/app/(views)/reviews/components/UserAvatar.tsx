"use client";

import Image from "next/image";

interface UserAvatarProps {
  src?: string | null;
  alt?: string;
  size?: number;
  name?: string;
}

export default function UserAvatar({
  src,
  alt = "Usuario",
  size = 48,
  name,
}: UserAvatarProps) {
  // Si no hay imagen, generamos iniciales
  const initials =
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="object-cover border rounded-full border-primary-txt-800"
      />
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className="flex items-center justify-center font-bold rounded-full bg-primary-txt-800 text-primary-txt-100"
    >
      {initials}
    </div>
  );
}

