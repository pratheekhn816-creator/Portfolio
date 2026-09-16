import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PageTransition } from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "PRATHEEK H N | Build. Create. Grow.",
  description: "Portfolio of Pratheek H N, a full-stack developer specializing in Node.js, Express, React, Next.js, REST APIs, and SQL.",
  metadataBase: new URL("https://your-domain.example"),
  openGraph: { title: "PRATHEEK H N | Build. Create. Grow.", description: "Node.js, Express, React, Next.js, REST APIs, and SQL.", type: "website" },
  twitter: { card: "summary_large_image", title: "PRATHEEK H N | Build. Create. Grow.", description: "Node.js, Express, React, Next.js, REST APIs, and SQL." },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><PageTransition>{children}</PageTransition></body></html>;
}
