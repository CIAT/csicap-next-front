import React, { useState } from "react";
import { EllipsisVertical } from "lucide-react";
import styles from "./ExportDropdown.module.css"; // Estilos personalizados
import { downloadChart } from "@/helpers/Component/download/DownloadChart";

interface ExportDropdownProps {
    chartId?: string;
    chartData?: string[];
}

const ExportDropdown: React.FC<ExportDropdownProps> = ({ chartId, chartData }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleFilterChange = (value: string) => {
        setIsOpen(false); // Cerrar el menú al seleccionar una opción

        if (value === "image" && chartId) {
            downloadChart(chartId);
        }

        if (value === "data" && chartData) {
            console.log("Descargar datos");
        }
    };

    return (
        <div className={styles.container}>
            <button
                className={styles.iconButton}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Opciones de exportación"
            >
                <EllipsisVertical className={styles.icon} />
            </button>
            {isOpen && (
                <ul className={styles.dropdownMenu}>
                    {chartId && (
                        <li
                            className={styles.menuItem}
                            onClick={() => handleFilterChange("image")}
                        >
                            Descargar gráfica
                        </li>
                    )}
                    {chartData && (
                        <li
                            className={styles.menuItem}
                            onClick={() => handleFilterChange("data")}
                        >
                            Descargar datos
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default ExportDropdown;