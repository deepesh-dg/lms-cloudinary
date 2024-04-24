"use client";

import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const { logout } = useAuth();
  const router = useRouter();
  React.useEffect(() => {
    logout().finally(() => {
      router.push("/login");
    });
  }, [logout, router]);

  return (
    <p className="mt-12 text-center w-full">Logging out, please wait...</p>
  );
}
