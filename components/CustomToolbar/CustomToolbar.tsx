import React from "react";
import style from "./toolbar.module.css";
import {CustomToolbarProps} from "@/interfaces/Components/CustomToolbar";

const CustomToolbar: React.FC<CustomToolbarProps> = ({
                                                         label,
                                                         onNavigate
                                                     }) => {
    const [month, year] = label.split(" ");

    return (
        <div className={style["custom-toolbar"]}>
            <div className={style["button-container"]}>
                <button className={style["button"]} onClick={() => onNavigate("PREV")}>
                    <img src="/images/Calendar/arrow_left.png" alt="Anterior" className={style["arrow-icon"]} />
                </button>
                <button className={`${style["button"]} ${style["central-button"]}`} onClick={() => onNavigate("TODAY")}>
                    Hoy
                </button>
                <button className={style["button"]} onClick={() => onNavigate("NEXT")}>
                    <img src="/images/Calendar/arrow_right.png" alt="Siguiente" className={style["arrow-icon"]} />
                </button>
            </div>
            <span className={style["calendar-title"]}>
                {month} {year}
            </span>
        </div>
    );
};

export default CustomToolbar;