import React, { FC } from "react";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

export const PieChart: FC<{data: number[], labels: string[], colors: string[], title?: string, width?: number, height?: number}> = ({ data, labels, colors, title }) => {
    const chartData = {
        labels,
        datasets: [
            {
                data,
                backgroundColor: colors,
                label: "Dataset 1"
            }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom" as const, 
            },
            title: {
                display: true,
                text: title,
            },
            datalabels:{
                display: true,
                formatter: (value: number, context: any) => {
                    const dataset = context.dataset.data;
                    const total = dataset.reduce((sum: number, value: number) => sum + value, 0);
                    const percentage = ((value / total ) * 100).toFixed(0) + "%";
                    return percentage;
                },
                color: "#FFFF",
                font: {
                    size: 20
                }
            }
        },
        
    };

    return <Pie data={chartData} options={options} />;
};

export default PieChart;
