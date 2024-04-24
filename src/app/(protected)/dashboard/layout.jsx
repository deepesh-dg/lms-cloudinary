"use client";

import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";
import React from "react";

export default function Layout({ children }) {
  const { userData } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!userData.member.roles.includes("teacher")) router.push("/");
  }, [userData, router]);

  return userData.member.roles.includes("teacher") ? children : null;
}
