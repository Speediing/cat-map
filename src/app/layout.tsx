import type { Metadata, Viewport } from "next";
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

/** Public HTML metadata — must stay anonymous before auth (view-source, unfurls). */
const PUBLIC_TITLE = "Private";
const PUBLIC_DESCRIPTION = "Password required.";

export const metadata: Metadata = {
  title: PUBLIC_TITLE,
  description: PUBLIC_DESCRIPTION,
  robots: { index: false, follow: false },
  openGraph: {
    title: PUBLIC_TITLE,
    description: PUBLIC_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: PUBLIC_TITLE,
    description: PUBLIC_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f4ef",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-canvas font-sans text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
