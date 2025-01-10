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
                        fontSize: "1vw",
                        padding: "0px",
                    }}
                >
                    Finalizados
                </Chip>
            </div>
            <div className="flex items-center">
                <Chip
                    style={{
                        backgroundColor: "#FECF00",
                        color: "#000",
                        padding: "0px",
                        fontSize: "1vw",
                    }}
                >
                    Programados
                </Chip>
            </div>
            <div className="flex items-center">
                <Chip
                    style={{
                        backgroundColor: "#c84e42",
                        color: "#fff",
                        padding: "0px",
                        fontSize: "1vw",
                    }}
                >
                    Sin Cerrar
                </Chip>
            </div>
            <div className="flex items-center">
                <Chip
                    style={{
                        backgroundColor: "#b9b9b9",
                        color: "#fff",
                        fontSize: "1vw",
                        padding: "0px",
                    }}
                >
                    Cancelados
                </Chip>
            </div>
        </div>
    </div>
  );
};

export default OverviewCard;
