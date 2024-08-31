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
                    <img src="/public/arrow-left-svgrepo-com.png" alt="Atras" />
                </button>
                <button className={`${style["button"]} ${style["central-button"]}`} onClick={() => onNavigate("TODAY")}>
                    Hoy
                </button>
                <button className={style["button"]} onClick={() => onNavigate("NEXT")}>
                    <img src="/public/arrow-right-svgrepo-com.png" alt="Siguiente" />
                </button>
            </div>
            <span className={style["calendar-title"]}>
                {month} {year}
            </span>
        </div>
    );
};

export default CustomToolbar;