import React from "react";
import style from "./overview.module.css";
import { Chip } from "@nextui-org/react";

const OverviewCard = () => {
  return (
    <div className="bg-gray-900 text-black p-5 rounded-lg w-full">
        <div className={style.content}>
            <div className="flex items-center">
                <Chip
                    style={{
                        backgroundColor: "#80C41C",
                        color: "#fff",
                        fontSize: "0.7vw",
                        padding: "0px",
                    }}
                >
                    Eventos Finalizados
                </Chip>
            </div>
            <div className="flex items-center">
                <Chip
                    style={{
                        backgroundColor: "#FECF00",
                        color: "#000",
                        padding: "0px",
                        fontSize: "0.7vw",
                    }}
                >
                    Eventos Programados
                </Chip>
            </div>
            <div className="flex items-center">
                <Chip
                    style={{
                        backgroundColor: "#c84e42",
                        color: "#fff",
                        padding: "0px",
                        fontSize: "0.7vw",
                    }}
                >
                    Eventos sin Cerrar
                </Chip>
            </div>
            <div className="flex items-center">
                <Chip
                    style={{
                        backgroundColor: "#b9b9b9",
                        color: "#fff",
                        fontSize: "0.7vw",
                        padding: "0px",
                    }}
                >
                    Eventos cancelados
                </Chip>
            </div>
        </div>
    </div>
  );
};

export default OverviewCard;
