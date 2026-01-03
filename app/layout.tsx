import type { Metadata } from "next";
import { Mona_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { client } from "@/lib/sanity.client";
import { footerSettingsQuery } from "@/lib/sanity.queries";
import { FooterSettings } from "@/lib/types";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const footerSettings =
    await client.fetch<FooterSettings>(footerSettingsQuery);

  return (
    <html lang="en">
      <body
        className={`${monaSans.variable} ${montserrat.variable} antialiased relative min-w-[320px] bg-neutral-0`}
      >
        <Navbar />
        {children}
        <Footer settings={footerSettings} />
      </body>
    </html>
  );
}
