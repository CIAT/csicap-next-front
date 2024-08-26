'use client'; 

import { NextPage } from "next";
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart, ArcElement, CategoryScale, BarElement} from "chart.js";
import styles from "./events.module.css";
import { TreemapController, TreemapElement } from "chartjs-chart-treemap";
import { Chart as ChartJS, Tooltip, Legend, LinearScale } from "chart.js";
import { Chart as ReactChart } from "react-chartjs-2";
import { Select, SelectSection, SelectItem } from "@nextui-org/react";
import OverviewCard from "@/components/overview";
import CardComponent from "@/components/events/card";
import ChartCardComponent from "@/components/events/chartCard";


Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  TreemapController,
  TreemapElement,
  LinearScale,
  CategoryScale, // Register the CategoryScale here
  BarElement // Register the BarElement for bar charts
);

const EventPage: NextPage = () => {
  const institutionParticipants = {
    labels: [
      "CENICAFE",
      "CIAT",
      "ASBAMA",
      "AUGURA",
      "FENALCE",
      "FEDEPANELA",
      "AGROSAVIA",
      "CIMMYT",
      "ADR",
      "CENICAÑA",
    ],
    datasets: [
      {
        label: "Instituciones participantes",
        data: [3, 8, 1, 1, 2, 2, 1, 1, 2, 1],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

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

  const typesAsist = {
    labels: [
      "Agricultura digital",
      "Servicios de informacion",
      "Mejoramiento genetico",
      "Servicios de asistencia",
      "Medio ambiental",
    ],
    datasets: [
      {
        label: "Customer Types",
        data: [50, 20, 4, 16, 40], // Tus datos numéricos
        backgroundColor: [
          "#36A2EB", // Returning Customer
          "#FF6384", // VIP
          "#FFCE56", // Trial
          "#9966FF", // Inactive
          "#FF9F40", // Referral
        ],
        hoverBackgroundColor: [
          "#36A2EB", // Returning Customer
          "#FF6384", // VIP
          "#FFCE56", // Trial
          "#9966FF", // Inactive
          "#FF9F40", // Referral
        ],
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

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true,
            max: 8,
            ticks: {
                stepSize: 1
            }
        }
    },
    plugins: {
        legend: {
            display: false // Asegúrate de usar un valor válido
        }
    }
};


  return (
    <div className="flex flex-row w-full h-full">
      <div className={styles.div}>
        <ChartCardComponent
          title="Numero de eventos por cultivos"
          header={
            <Select label="Filtrar" className={styles.width_50}>
              <SelectItem key="eje">Eje</SelectItem>
              <SelectItem key="cultivo">Cultivo</SelectItem>
              <SelectItem key="lugar">Lugar</SelectItem>
              <SelectItem key="gremio">Gremio/Instituto</SelectItem>
            </Select>
          }
        >
          <ReactChart type="treemap" data={data} options={options} />
        </ChartCardComponent>
      </div>

      <div className={styles.card_container}>
        <div className={styles.overview}>
          <ChartCardComponent title="Vision General" header={<></>}>
            <OverviewCard />
          </ChartCardComponent>
        </div>
        <div className={styles.sub_card_container}>
          <CardComponent title="Total Eventos">
            <div className="w-full h-full">
              <Doughnut data={eventsTotal} options={config} />
            </div>
          </CardComponent>
          <CardComponent title="Ejes por evento">
            <div className="w-full h-full">
              <Doughnut data={typesAsist} options={config} />
            </div>
          </CardComponent>
          <CardComponent title="Tipo de Participantes por evento">
            <div className="w-full h-full">
              <Doughnut data={typesAsist} options={config} />
            </div>
          </CardComponent>
          <CardComponent title="Instituciones participantes">
            <div className="w-full h-full">
              <Bar data={institutionParticipants} options={barChartOptions} />
            </div>
          </CardComponent>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
