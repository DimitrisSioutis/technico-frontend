import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { Red_Hat_Display } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";

const redhat= Red_Hat_Display({
  subsets: ['latin'], 
  weight: ['400', '700'], 
});

export const metadata: Metadata = {
  title: "Technico",
  description: "Create by DS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={redhat.className}
      >
        <Navbar/>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
