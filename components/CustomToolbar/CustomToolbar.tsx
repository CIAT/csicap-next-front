import React from "react";
import style from "./toolbar.module.css";
import {CustomToolbarProps} from "@/interfaces/Components/CustomToolbar";
import Image from 'next/image';


const CustomToolbar: React.FC<CustomToolbarProps> = ({
                                                         label,
                                                         onNavigate
                                                     }) => {
    const [month, year] = label.split(" ");

    return (
        <div className={style["custom-toolbar"]}>
            <div className={style["button-container"]}>
                <button className={style["button"]} onClick={() => onNavigate("PREV")}>
                    <Image src="/arrow-left-svgrepo-com.png" alt="" width={30} height={30}/>
                </button>
                <button className={`${style["button"]} ${style["central-button"]}`} onClick={() => onNavigate("TODAY")}>
                    Hoy
                </button>
                <button className={style["button"]} onClick={() => onNavigate("NEXT")}>
                <Image src="/arrow-right-svgrepo-com.png" alt="" width={30} height={30}/>
                </button>
            </div>
            <span className={style["calendar-title"]}>
                {month} {year}
            </span>
        </div>
    );
};

export default CustomToolbar;