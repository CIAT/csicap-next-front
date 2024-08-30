import React from "react";
import style from "./topbar.module.css";
// import { useRouter } from "next/router";
// import Link from "next/link";

export function Topbar() {
  // const { locale, locales, asPath } = useRouter();
  return (
    <div className={style["container"]}>
      <div className={style["left"]}>
        <h2><i className={style["title"]}>Monitoreo y evaluación</i></h2>
      </div>
      {/* <div className={style["right"]}>
        {locales ?
          locales.map((loc, idx) =>
            locale === loc ? <Link key={idx} href={asPath} locale={loc} className={style["lang_current"]}>{loc.toUpperCase()}</Link>
              :
              <Link key={idx} href={asPath} locale={loc} className={style["lang"]}>{loc.toUpperCase()}</Link>)
          :
          <></>}
      </div> */}
    </div>
  );
}