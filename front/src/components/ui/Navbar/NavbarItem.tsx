// src/components/Navbar/NavbarItem.tsx
"use client";

import Link from "next/link";
import React, { FC } from "react";
import cs from "classnames";
import { usePathname } from "next/navigation";

export interface NavbarItemProps {
  label: string;
  href: string;
  isActive?: boolean;
}

const NavbarItem: FC<NavbarItemProps> = ({
  label,
  href = "#",
  isActive = false,
}) => {
  const pathname = usePathname();
  const isCurrentPage = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={cs(
          "text-sm font-medium hover:text-secondary-txt-600 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-secondary-txt-600 hover:after:w-full after:transition-all",
          isActive || isCurrentPage
            ? "text-primary-txt-100"
            : "text-secondary-txt-400 hover:text-primary-txt-100"
        )}
      >
        {label}
      </Link>
    </li>
  );
};

export default NavbarItem;
