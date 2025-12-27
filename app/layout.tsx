import type { Metadata } from "next";
import { Mona_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bechem United FC",
  description: "Official website of Bechem United Football Club",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${monaSans.variable} ${montserrat.variable} antialiased relative min-w-[320px] bg-neutral-0`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
