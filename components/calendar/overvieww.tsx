import React from "react";
import style from "./overview.module.css";

const OverviewCard = () => {
    return (
        <div className="bg-gray-900 text-black p-5 rounded-lg w-full">
            <div className={style.content}>
                <div className="flex items-center">
                    <div className="text-2xl mr-3">🟩</div>
                    <div>
                        <p className="text-gray-400 text-sm">Eventos finalizados</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="text-2xl mr-3">🟥</div>
                    <div>
                        <p className="text-gray-400 text-sm">Eventos sin Cerrar</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="text-2xl mr-3">🟦</div>
                    <div>
                        <p className="text-gray-400 text-sm">Eventos programados</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewCard;
