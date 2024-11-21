import React from "react";
import {
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
    Box,
} from "@mui/material";
import { EllipsisVertical } from "lucide-react";
import { downloadChart } from "@/helpers/Component/download/DownloadChart";
import styles from "./ExportDropdown.module.css";

interface ExportDropdownProps {
    chartId?: string;
    chartData?: string[];
}

const ExportDropdown: React.FC<ExportDropdownProps> = ({ chartId, chartData }) => {
    const [selectedFilter, setSelectedFilter] = React.useState<string>("");

    const handleFilterChange = (event: SelectChangeEvent) => {
        const value = event.target.value as string;
        setSelectedFilter(value);

        if (value === "image") {
            downloadChart(chartId);
        }

        if (value === "data") {
            console.log("Descargar datos");
        }
    };

    return (
        <div>
            <FormControl
                className={styles.container}
                size="small"
            >
                <Select
                    value={selectedFilter}
                    onChange={handleFilterChange}
                    displayEmpty
                    renderValue={() => null}
                    IconComponent={() => null}
                    classes={{
                        select: styles.select,
                        outlined: styles.notchedOutline,
                    }}
                    sx={{
                        padding: "2px",
                        margin: "3px",
                        borderRadius: "50%",
                        height: "95%",
                        aspectRatio: "1 / 1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    MenuProps={{
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right",
                        },
                        transformOrigin: {
                            vertical: "top",
                            horizontal: "right",
                        }
                    }}
                >
                    {chartId && (
                        <MenuItem value="image">Descargar gráfica</MenuItem>
                    )}
                    {chartData && (
                        <MenuItem value="data">Descargar datos</MenuItem>
                    )}
                </Select>
                <Box className={styles.iconContainer}>
                    <EllipsisVertical className={styles.icon}/>
                </Box>
            </FormControl>
        </div>
    );
};

export default ExportDropdown;