"use client"

import { Inter } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import "./globals.css";
import "../components/static/static.module.css";
import Header from "@/components/static/Header";
import Footer from "@/components/static/Footer";
import "@/components/Metadata/Metadata";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showLayout = !pathname.includes("/embed");

  return (
      <html lang="en">
      <head>
        <link rel="icon" href="/next.png" />
      </head>
      <body className={inter.className}>
      <NextUIProvider>
          <header>
              <Header  showHeader={showLayout}/>
          </header>
        <div className="layout">{children}</div>
        {showLayout && (
            <footer>
              <Footer />
            </footer>
        )}
      </NextUIProvider>
      </body>
      </html>
  );
}