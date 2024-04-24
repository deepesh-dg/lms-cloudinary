"use client";

import { useAuth } from "@/contexts/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Header() {
  const { isAuthenticated, userData } = useAuth();
  const pathname = usePathname();

  const isTeacher = userData && userData.member.roles.includes("teacher");

  const navItems = [
    {
      label: "Home",
      href: "/",
      active: true,
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      active: isTeacher,
    },
    {
      label: "Profile",
      href: "/profile",
      active: isAuthenticated,
    },
    {
      label: "logout",
      href: "/logout",
      active: isAuthenticated,
    },
    {
      label: "Login",
      href: "/login",
      active: !isAuthenticated,
    },
    {
      label: "Sign up",
      href: "/signup",
      active: !isAuthenticated,
    },
  ];

  return (
    <header className="px-4 sticky top-0 inset-x-0 shadow bg-white z-40">
      <nav className="flex gap-4 items-center py-4 w-full max-w-7xl mx-auto">
        <Link href="/">
          <picture>
            <img src="/next.svg" alt="logo" className="h-7" />
          </picture>
        </Link>
        <ul className="flex ml-auto gap-3">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`inline-block px-4 py-1 rounded duration-200 ${
                    pathname === item.href
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ) : null
          )}
        </ul>
      </nav>
    </header>
  );
}
