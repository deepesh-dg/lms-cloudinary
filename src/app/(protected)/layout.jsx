"use client";

import React from "react";
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) router.replace("/login");
  }, [isAuthenticated, router]);

  return isAuthenticated ? children : null;
}
