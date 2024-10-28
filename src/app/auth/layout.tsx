// src/app/auth/layout.tsx
"use client";

import { cn } from "@/lib/utils";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex min-h-screen items-center justify-center bg-gray-50 p-4")}>
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        {children}
      </div>
    </div>
  );
}
