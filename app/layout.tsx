import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
import "./globals.css";
import "../components/static/static.module.css";
import Header from "@/components/static/Header";
import Footer from "@/components/static/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CSICAP",
  description: "CSICAP FRONT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUIProvider>
          <header>
            <Header />
          </header>
          <div className="w-screen h-screen">{children}</div>
          <footer>
            <Footer />
          </footer>
        </NextUIProvider>
      </body>
    </html>
  );
}
