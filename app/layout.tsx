import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Felix — Treatment, on-demand",
  description: "Weight loss and wellness treatment, personalized for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
