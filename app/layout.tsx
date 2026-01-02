import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Viral Content Generator",
  description: "Automated viral content generator and scheduler",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
