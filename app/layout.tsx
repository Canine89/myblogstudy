import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "editop의 스터디 블로그",
  description: "Next.js, React, TypeScript 등을 학습하고 공유하는 블로그입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="border-t mt-20">
          <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} editop의 스터디 블로그. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
