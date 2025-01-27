import React from "react";
import style from "./overview.module.css";
import { Chip } from "@nextui-org/react";

interface OverviewCardProps {
    formState: string;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
}

const OverviewCard: React.FC<OverviewCardProps> = ({formState, setStatus }) => {
    const handleChipClick = (status: string) => {
        if (formState === status) {
            setStatus("");
            return;
        }

        setStatus(status);
    };

    return (
        <div className="bg-gray-900 text-black p-5 rounded-lg w-full">
            <div className={style.content}>
                <div className="flex items-center">
                    <Chip
                        onClick={() => handleChipClick("Finalizados")}
                        style={{
                            backgroundColor: "#80C41C",
                            color: "#fff",
                            fontSize: "1vw",
                            padding: "0.2px",
                            cursor: "pointer",
                        }}
                    >
                        Finalizados
                    </Chip>
                </div>
                <div className="flex items-center">
                    <Chip
                        onClick={() => handleChipClick("Programados")}
                        style={{
                            backgroundColor: "#FECF00",
                            color: "#000",
                            padding: "0.2px",
                            fontSize: "1vw",
                            cursor: "pointer",
                        }}
                    >
                        Programados
                    </Chip>
                </div>
                <div className="flex items-center">
                    <Chip
                        onClick={() => handleChipClick("Sin Cerrar")}
                        style={{
                            backgroundColor: "#c84e42",
                            color: "#fff",
                            padding: "0.2px",
                            fontSize: "1vw",
                            cursor: "pointer",
                        }}
                    >
                        Sin Cerrar
                    </Chip>
                </div>
                <div className="flex items-center">
                    <Chip
                        onClick={() => handleChipClick("Cancelados")}
                        style={{
                            backgroundColor: "#b9b9b9",
                            color: "#fff",
                            fontSize: "1vw",
                            padding: "0.2px",
                            cursor: "pointer",
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