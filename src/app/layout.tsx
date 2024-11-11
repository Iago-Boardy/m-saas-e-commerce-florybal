"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const showNavbar = !pathname.startsWith("/admin") && !pathname.startsWith("/auth"); 

  return (
    <html lang="en">
      <body className={cn("bg-background min-h-screen font-sans antialiased", inter.variable)}>
        <SessionProvider>
          {showNavbar && <Navbar />}
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
