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
                        backgroundColor: "#80C41C", // Custom background color
                        color: "#fff", // Text color
                        fontSize: " 0.6vw", // Font size
                        padding: "0px", // Padding
                    }}
                >
                    Eventos Finalizados
                </Chip>
            </div>
            <div className="flex items-center">
                <Chip
                    style={{
                        backgroundColor: "#FECF00", // Custom background color
                        color: "#000", // Darker text color for contrast
                        padding: "0px", // Padding
                        fontSize: " 0.6vw", // Font size
                    }}
                >
                    Eventos Programados
                </Chip>
            </div>
            <div className="flex items-center">
                <Chip
                    style={{
                        backgroundColor: "#c84e42", // Custom background color
                        color: "#fff", // Text color
                        padding: "0px", // Padding
                        fontSize: " 0.6vw", // Font size
                    }}
                >
                    Eventos sin Cerrar
                </Chip>
            </div>
            <div className="flex items-center">
                <Chip
                    style={{
                        backgroundColor: "#b9b9b9", // Custom background color
                        fontSize: " 0.8rem", // Font size
                        padding: "0px", // Padding
                        color: "#fff", // Text color
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
