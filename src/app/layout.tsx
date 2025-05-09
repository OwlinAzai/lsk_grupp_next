import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Oswald } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Breadcrumbs from "./components/breadcrumbs";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const oswaldWght = Oswald({
  variable: "--font-oswald-wght",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} ${oswaldWght.variable} antialiased bg-[#e4e4e4]`}
      >
        <Header />
        <Breadcrumbs />
        {children}
      </body>
    </html>
  );
}
