import React from "react";
import style from "./footer.module.css";

export function Footer () {
  return(
      <div className={style["container"]}>
          <div className={style["left"]}>

          </div>
          <div>
              <img src="/Logo_Colombia_+_Ministerio_Blanco.png" alt="alliance-logo" className={style["size-logos"]}/>
          </div>
          <div>
              <img src="/Alliance_Logo_Refresh-SP_white.png" alt="CAS-logo" className={style["size-logos"]}/>
          </div>
          <div className={style["right"]}>
          </div>
      </div>
  );
}