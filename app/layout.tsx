import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Fieldwork Sans substitute — body copy, nav, buttons
const fieldwork = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-fieldwork",
  display: "swap",
});

// Panelface substitute — display headlines, section titles
const panelface = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-panelface",
  display: "swap",
});

// Reference designators, spec values, code
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dushyant Singh Rathore — Full-Stack Developer",
  description:
    "Full-Stack Developer focused on Next.js & the PERN ecosystem. Architecting disciplined, multi-tenant databases and scalable systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fieldwork.variable} ${panelface.variable} ${mono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}