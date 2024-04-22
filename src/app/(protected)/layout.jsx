"use client";

import React from "react";
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  const { isAuthenticated, verifyLogin } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    verifyLogin().then((status) => {
      if (!status) router.replace("/login");
    });
  }, []);

  return isAuthenticated ? children : null;
}
