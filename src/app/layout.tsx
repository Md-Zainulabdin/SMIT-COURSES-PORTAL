import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { NextAuthProvider } from "@/providers/Auth-provider";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SMIT",
  description: "Developed by ~Zain-ul-Abdin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <body className={inter.className}>
          <Navbar />
          <main className="px-4 md:px-12">{children}</main>
        </body>
      </NextAuthProvider>
    </html>
  );
}
