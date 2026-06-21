import type { Metadata } from "next";
import { Poppins, Syne } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "Muthukumar | Frontend Developer & AI Enthusiast",
  description: "Portfolio of Muthukumar - B.Tech Mechanical Engineer specializing in React Native, Next.js, UI/UX, AI integrations, and prompt engineering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${syne.variable} antialiased`} style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
