import { NextPage } from "next";
import CardComponent from "@/components/card";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import styles from "./events.module.css";
import { TreemapController, TreemapElement } from "chartjs-chart-treemap";
import { Chart as ChartJS, Tooltip, Legend, LinearScale } from "chart.js";
import { Chart as ReactChart } from "react-chartjs-2";
import ChartCardComponent from "@/components/chartCard";
import OverviewCard from "@/components/overview";

Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  TreemapController,
  TreemapElement,
  LinearScale
);

const EventPage: NextPage = () => {
  const data = {
    datasets: [
      {
        // Se requiere la propiedad `data` aunque esté vacía
        data: [], // Obligatorio para Chart.js
        tree: [
          { name: "A", value: 100 },
          { name: "B", value: 200 },
          { name: "C", value: 150 },
          { name: "D", value: 80 },
          { name: "E", value: 130 },
        ],
        key: "value",
        groups: ["name"],
        backgroundColor: (ctx: { dataIndex: number }) => {
          const colors = [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
          ];
          return colors[ctx.dataIndex % colors.length];
        },
        borderColor: "rgba(0,0,0,0.1)",
      },
    ],
  };

  const eventsTotal = {
    labels: ["Completado", "En progreso"],
    datasets: [
      {
        label: "Event Status",
        data: [50, 20], // Tus datos numéricos
        backgroundColor: ["#4CAF50", "#FFCE56"],
        hoverBackgroundColor: ["#45a049", "#FFC107"],
      },
    ],
  };

  const config = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
        },
        position: "left" as const,
      },
    },
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const data = context.dataset.tree[context.dataIndex];
            return `${data.name}: ${data.value}`;
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-row gap-2 w-full h-full">
      
      <div className={styles.div}>
        <ChartCardComponent title="TreeMap">
          <ReactChart type="treemap" data={data} options={options} />
        </ChartCardComponent>
      </div>

      <div className={styles.card_container}>

      {/* <div className="w-full">
        <CardComponent title="Vision General">
          <OverviewCard/>
        </CardComponent>
      </div> */}

        <CardComponent title="Total Eventos">
          <div className="w-64 h-64">
            <Doughnut data={eventsTotal} options={config} />
          </div>
        </CardComponent>

        <CardComponent title="Total Asistentes">
          <div className="justify-center h-full w-full flex alignContent: 'center',">
            <label className={styles.total_assist}>50</label>
          </div>
        </CardComponent>

      </div>
    </div>
  );
};

export default EventPage;
