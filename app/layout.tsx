"use client";

import { Inter } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import "./globals.css";
import "../components/static/static.module.css";
import Header from "@/components/static/Header";
import Footer from "@/components/static/Footer";
import { metadata } from "@/components/Metadata/Metadata";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const showLayout = !pathname.includes("/embed");
    const layoutClassName = showLayout ? "layout" : "layout_embedded";

    return (
        <html lang="en">
        <head>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />

            {metadata.openGraph && (
                <>
                    <meta property="og:title" content={metadata.openGraph.title} />
                    <meta property="og:description" content={metadata.openGraph.description} />
                    {metadata.openGraph.images?.map((image, index) => (
                        <meta
                            key={index}
                            property="og:image"
                            content={image.url}
                        />
                    ))}
                    <meta property="og:type" content={metadata.openGraph.type} />
                </>
            )}
            <link rel="icon" href="/next.png" />
        </head>
        <body className={`${inter.className} ${layoutClassName}`}>
        <NextUIProvider>
            <header>
                <Header showHeader={showLayout} />
            </header>
            <div className={layoutClassName}>{children}</div>
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