"use client";

import { Inter } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import "./globals.css";
import "../components/static/static.module.css";
import Header from "@/components/static/Header";
import Footer from "@/components/static/Footer";
import { metadata } from "@/components/Metadata/Metadata";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const showLayout = !pathname.includes("/embed");
    const layoutClassName = showLayout ? "layout" : "layout_embedded";
    const isProduction = true;

    return (
        <html lang="en">
        <head>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />

            {isProduction && (
                <>
                    {/* Google Analytics */}
                    <Script
                        async
                        src="https://www.googletagmanager.com/gtag/js?id=G-14FSWFJX6S"
                    />
                    <Script id="google-analytics">
                        {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-14FSWFJX6S');
              `}
                    </Script>
                    {/* Microsoft Clarity */}
                    <Script id="microsoft-clarity">
                        {`
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "puh2ygrbjk");
              `}
                    </Script>
                </>
            )}

            {metadata.openGraph && (
                <>
                    <meta property="og:title" content={metadata.openGraph.title} />
                    <meta property="og:description" content={metadata.openGraph.description} />
                    <meta property="og:image" content={metadata.openGraph.image.url} />
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