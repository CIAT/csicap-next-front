"use client";

import { NextPage } from "next";
import styles from "./assistance.module.css";
import CardComponent from "@/components/assistance/card";
import {
  Chart,
  ArcElement,
  CategoryScale,
  BarElement,
  LinearScale,
  Title,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { TreemapController, TreemapElement } from "chartjs-chart-treemap";
import { Chart as ReactChart } from "react-chartjs-2";
import ChartCardComponent from "@/components/events/chartCard";

Chart.register(
  ArcElement,
  Legend,
  LinearScale,
  CategoryScale, // Register the CategoryScale here
  BarElement, // Register the BarElement for bar charts
  Title,
  TreemapController,
  TreemapElement
);

const sex = {
  labels: ["MUJER", "HOMBRE"],
  datasets: [
    {
      label: "Sexo",
      data: [28, 32],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
  ],
};

const age = {
  labels: ["20 a 25", "26 a 30"],
  datasets: [
    {
      label: "Edad",
      data: [28, 32],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
  ],
};

const role = {
  labels: ["Ingeniería", "Docencia", "Administración", "Salud", "Arte"],
  datasets: [
    {
      label: "Ocupaciones",
      data: [28, 32, 15, 20, 10],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)", // Ingeniería
        "rgba(54, 162, 235, 0.5)", // Docencia
        "rgba(75, 192, 192, 0.5)", // Administración
        "rgba(153, 102, 255, 0.5)", // Salud
        "rgba(255, 205, 86, 0.5)", // Arte
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)", // Ingeniería
        "rgba(54, 162, 235, 1)", // Docencia
        "rgba(75, 192, 192, 1)", // Administración
        "rgba(153, 102, 255, 1)", // Salud
        "rgba(255, 205, 86, 1)", // Arte
      ],
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
        const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];
        return colors[ctx.dataIndex % colors.length];
      },
      borderColor: "rgba(0,0,0,0.1)",
    },
  ],
};

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  title: {
    display: true,
    text: sex.datasets[0].label, // Usar el label del dataset como título
  },
};

const config = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
      },
      position: "right" as const,
    },
  },
  title: {
    display: true,
    text: sex.datasets[0].label, // Usar el label del dataset como título
  },
};

const config2 = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
      },
      position: "right" as const,
    },
  },
  title: {
    display: true,
    text: age.datasets[0].label, // Usar el label del dataset como título
  },
};

const config3 = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
      },
      position: "right" as const,
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

const AssistancePage: NextPage = () => {
  return (
    <div className="w-full h-full flex flex-wrap">
      <div className={styles.top_div}>
        <CardComponent
          title=""
          header={
            <div className={styles.top_card}>
              <div className={styles.top_div_division}>
                <label className={styles.header_width}>Total asistencias</label>
              </div>

              <div
                style={{
                  width: "1px", // Ancho del divisor
                  height: "20px",
                  backgroundColor: "#d1d1d1", // Color del divisor
                  margin: "0 20px", // Espaciado alrededor del divisor
                }}></div>

              <div className={styles.top_div_division}>
                <label className={styles.header_width}>Sexo</label>
              </div>

              <div
                style={{
                  width: "1px", // Ancho del divisor
                  height: "20px",
                  backgroundColor: "#d1d1d1", // Color del divisor
                  margin: "0 20px", // Espaciado alrededor del divisor
                }}
              ></div>

              <div className={styles.top_div_division}>
                <label className={styles.header_width}>Edad</label>
              </div>

              <div
                style={{
                  width: "1px", // Ancho del divisor
                  height: "20px",
                  backgroundColor: "#d1d1d1", // Color del divisor
                  margin: "0 20px", // Espaciado alrededor del divisor
                }}
              ></div>

              <div className={styles.top_div_division}>
                <label className={styles.header_width}>Ocupacion</label>
              </div>
            </div>
          }
        >
          <div className={styles.top_card}>
            <div className={styles.total_assist}>
              {/* <label>Total Asistencias</label> */}
              <label className={styles.top_card_label}>50</label>
            </div>
            <div
              style={{
                width: "1px", // Ancho del divisor
                height: "100%",
                backgroundColor: "#d1d1d1", // Color del divisor
                margin: "0 20px", // Espaciado alrededor del divisor
              }}
            ></div>
            <div className={styles.top_div_division}>
              <Doughnut data={sex} options={config} />
            </div>
            <div
              style={{
                width: "1px", // Ancho del divisor
                height: "100%",
                backgroundColor: "#d1d1d1", // Color del divisor
                margin: "0 20px", // Espaciado alrededor del divisor
              }}
            ></div>
            <div className={styles.top_div_division}>
              <Doughnut data={age} options={config2} />
            </div>
            <div
              style={{
                width: "1px", // Ancho del divisor
                height: "100%",
                backgroundColor: "#d1d1d1", // Color del divisor
                margin: "0 20px", // Espaciado alrededor del divisor
              }}
            ></div>
            <div className={styles.top_div_division}>
              <Doughnut data={role} options={config3} />
            </div>
          </div>
        </CardComponent>
      </div>

      <div className={styles.bottom_div}>
        <div className="h-full">
          <ChartCardComponent title="TreeMap" header={<></>}>
            <ReactChart type="treemap" data={data} options={options} />
          </ChartCardComponent>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default AssistancePage;
