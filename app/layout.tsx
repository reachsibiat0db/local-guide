import type { Metadata } from "next";
import ReportBug from "@/components/report-bug";
import BottomNav from "@/components/bottom-nav";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Local Guide",
  description: "Trusted local recommendations",
  manifest: "/manifest.json",
  themeColor: "#ffffff",
};

export const viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="color-scheme" content="light" />
        <link rel="manifest" href="/manifest.json" />
      </head>     
      <body className="bg-white text-gray-900 antialiased">
        {children}
        <BottomNav />
        <ReportBug />
      </body>
    </html>
  );
}
