import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ThemeProvider from "@/components/ThemeProvider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alok Srivastav | AI & Data Developer Portfolio",
  description: "Personal portfolio of Alok Srivastav, specializing in Artificial Intelligence engineering, Data Analytics solutions, and Full Stack development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
      style={{ scrollBehavior: "auto" }}
    >
      <body className="min-h-full flex flex-col bg-luxury-bg text-luxury-text font-sans selection:bg-luxury-accent selection:text-white transition-colors duration-300">
        <ThemeProvider>
          <SmoothScroll>
            <div className="noise-overlay" />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}


