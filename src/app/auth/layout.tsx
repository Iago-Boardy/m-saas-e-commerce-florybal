// src/app/auth/layout.tsx
"use client";

import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });



export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className={cn("bg-background min-h-screen font-sans antialiased", inter.variable)}>
      {children}
    </body>
  );
}
