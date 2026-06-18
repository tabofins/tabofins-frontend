import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaboFins — Future of Cooperative Finance",
  description:
    "Digital Njangi, cross-border transfers, escrow protection, and crypto-fiat interoperability in one unified ecosystem.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
