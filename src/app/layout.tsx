import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const poppins = Poppins({
  weight: ["100", "300", "500", "600", "700"],
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
      <body className={poppins.className}>
        <Navbar />
        <main className="px-4 md:px-12">{children}</main>
      </body>
    </html>
  );
}
