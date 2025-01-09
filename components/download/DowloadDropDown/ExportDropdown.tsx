import React, { useState, useRef, useEffect } from "react";
import { EllipsisVertical } from "lucide-react";
import styles from "./ExportDropdown.module.css"; // Estilos personalizados
import {downloadChart, downloadDataAsExcel} from "@/helpers/Component/download/DownloadChart";
import MapController from "@/helpers/Component/Controller/MapController";

interface ExportDropdownProps {
    chartId?: string;
    chartData?: any;
    mapImageName?: string;
}

const ExportDropdown: React.FC<ExportDropdownProps> = ({ chartId, chartData, mapImageName }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleFilterChange = (value: string) => {
        setIsOpen(false);

        if (value === "image" && chartId) {
            downloadChart(chartId);
        }

        if (value === "map" && mapImageName) {
            MapController.downloadMapAsImage(mapImageName);
        }

        if (value === "data" && chartData) {
            downloadDataAsExcel(chartData);
        }
    };

    // Manejador para cerrar el menú al hacer clic fuera
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    // Registrar y eliminar el evento de clic
    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className={styles.container} ref={dropdownRef}>
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
                    {mapImageName && (
                        <li
                            className={styles.menuItem}
                            onClick={() => handleFilterChange("map")}
                        >
                            Descargar mapa
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