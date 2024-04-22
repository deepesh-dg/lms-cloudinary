"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? null : (
    <div className="flex justify-center items-center py-12">{children}</div>
  );
}
