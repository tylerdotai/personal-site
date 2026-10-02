import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tyler Delano",
  description: "Tyler Delano — AI agent builder, community organizer, and maker of strange little web experiments.",
  openGraph: {
    title: "Tyler Delano | Terminal Portfolio",
    description: "Explore Tyler Delano's projects in an interactive terminal.",
    url: "https://tylerdotai.github.io/personal-site/",
    type: "website",
  },
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
