import React, { FC } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, Tooltip, Legend, Title, CategoryScale, LinearScale } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(BarElement, Tooltip, Legend, Title, CategoryScale, LinearScale, ChartDataLabels);

export const BarChart: FC<{ data: number[], labels: string[], colors: string[], title?: string, width?: number, height?: number }> = ({ data, labels, colors, title, width, height }) => {
    const chartData = {
        labels,
        datasets: [
            {
                data,
                backgroundColor: colors,
                label: "Dataset 1",
            },
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
            datalabels: {
                formatter: (value: number, context: any) => {
                    const dataset = context.dataset.data;
                    const total = dataset.reduce((sum: number, value: number) => sum + value, 0);
                    const percentage = ((value / total) * 100).toFixed(2) + "%";
                    return percentage;
                },
                color: "#ffff",
                font: {
                    size: 16, // Increase font size
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Bar data={chartData} options={options} width={width} height={height} />;
};

export default BarChart;
