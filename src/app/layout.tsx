"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Renderiza a Navbar apenas se não estiver na rota /admin
  const showNavbar = !pathname.startsWith("/admin"); //const showNavbar = !(pathname.startsWith("/admin") || pathname.startsWith("/products")); EXEMPLO PARA MAIS PAGINAS


  return (
    <html lang="en">
      <body className={cn("bg-background min-h-screen font-sans antialiased", inter.variable)}>
        {showNavbar && <Navbar />}
        {children}
      </body>
    </html>
  );
}
