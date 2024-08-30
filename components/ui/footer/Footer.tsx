import React from "react";
import style from "./footer.module.css";

export function Footer () {
  return(
    <div className={style["container"]}>
      <div className={style["left"]}>
        
      </div>
      <div>
        <img src="/logo_alianza.webp" alt="alliance-logo" className={ style["size-logos"] }  />
      </div>
      <div>
        <img src="/colombia-agro-logo.webp" alt="CAS-logo" className={ style["size-logos"] }  />
      </div>
      <div className={style["right"]}>
      </div>
    </div>
  );
}