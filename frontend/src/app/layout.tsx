import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { PMAssistantWidget } from "@/features/pm-assistant/PMAssistantWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MedLink360 - Healthcare Management Platform",
  description: "A comprehensive healthcare management system connecting patients with healthcare providers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        <PMAssistantWidget />
      </body>
    </html>
  );
}
