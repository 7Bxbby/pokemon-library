import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Image from "next/image";
import logo from "@/public/logo.png";
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PocketDex",
  description: "Explore Pokemon's World",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overscroll-none`}
      >
      <ThemeProvider>
          <div className="min-h-screen poke-bg">
              <div className="text-4xl justify-center items-center h-[334px] px-4 pt-12 relative">
                  <Link href="/">
                      <Image
                          src={logo}
                          width={1021}
                          height={334}
                          alt="logo"
                          className="select-none w-full max-w-[800px] h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer" // Dodano "cursor-pointer" dla wskaźnika
                      />
                  </Link>

                  <ThemeToggle />
              </div>
              {children}
          </div>
      </ThemeProvider>
      </body>
    </html>
  );
}
