import React from "react";
import Head from "next/head";
import style from "./layout.module.css";
import { Topbar, Footer } from "../ui";


export const metadata = {
  description: "default description"
};

export function Layout({ children, title }: { children: React.ReactNode, title: string }) {
  return (
    <div className={style["container"]}>
      <Head>
        <title>{title}</title>
      </Head>
      <Topbar />
      <main className={style["sub-container"]}>
        {children}
      </main>
      <Footer />
    </div>
  );
}