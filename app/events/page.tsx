"use client";

import { NextPage } from "next";
import { Doughnut, Bar } from "react-chartjs-2";
import styles from "./events.module.css";
import { TreemapController, TreemapElement } from "chartjs-chart-treemap";
import {
  Chart,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  BarElement,
  LinearScale,
} from "chart.js";
import { Chart as ReactChart } from "react-chartjs-2";
// import CardComponent from "@/components/events/Card";
import ChartCardComponent from "@/components/events/chartCard";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CardComponent from "@/components/events/card";

Chart.register(
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  BarElement,
  LinearScale,
  TreemapController,
  TreemapElement
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
        enabled: true,
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
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Asegúrate de usar un valor válido
      },
    },
  };

  return (
    <div className="flex flex-row w-full h-full">
      <div className={styles.div}>
        <ChartCardComponent
          title="Numero de eventos por cultivos"
          header={
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Filtrar</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Filtrar"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Eje</MenuItem>
                <MenuItem value={20}>Cultivo</MenuItem>
                <MenuItem value={30}>Lugar</MenuItem>
                <MenuItem value={30}>Gremio/Institucion</MenuItem>
              </Select>
            </FormControl>
          }
        >
          <ReactChart type="treemap" data={data} options={options} />
        </ChartCardComponent>
      </div>

      <div className={styles.card_container}>
        <div className={styles.overview}>
          <ChartCardComponent title="Vision General" header={<></>}>
            <></>
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
