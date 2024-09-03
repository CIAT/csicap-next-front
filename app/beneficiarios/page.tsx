"use client";

import Image from "next/image";
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
import MapComponent from "@/components/data/Map/MapComponent";
import CalendarController from "@/helpers/Component/Controller/CalendarController";
import { SetStateAction, useState } from "react";
import { EventsData } from "@/interfaces";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

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
  labels: ["Hombre", "Mujer"],
  datasets: [
    {
      label: "Sexo",
      data: [1029, 678],
      backgroundColor: [
        "#0E6E8C",
        "#80C41C"
      ],
      borderColor: [
        "#0E6E8C",
        "#80C41C"
      ],
      borderWidth: 1,
    },
  ],
};

const typeOfHousing = {
  labels: ["Propia con titulo", "Propia sin titulo (poseedor)", "arrendada", "colectiva", "familiar", "otro"],
  datasets: [
    {
      label: "Tipo de propiedad",
      data: [923, 301, 241, 90, 20, 130],
      backgroundColor: [
        "#0E6E8C",
        "#80C41C",
        "#C8A041",
        "#FECF00",
        "#D2D200",
        "#00BFB3",
        "#FAAF41",
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF"
      ],
      borderColor: [
        "#0E6E8C",
        "#80C41C",
        "#C8A041",
        "#FECF00",
        "#D2D200",
        "#00BFB3",
        "#FAAF41",
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF"
      ],
      borderWidth: 1,
    },
  ],
};

const etnia = {
  labels: ["Indigena", "Afrocolombiano", "Mestizo", "Ninguno", "otro"],
  datasets: [
    {
      label: "Etnia",
      data: [332, 173, 144, 1041, 14],
      backgroundColor: [
        "#0E6E8C",//azul
        "#80C41C",//verde
        "#C8A041",//marron
        "#FECF00",
        "#D2D200",
        "#00BFB3",
        "#FAAF41",
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF"
      ],
      borderColor: [
        "#0E6E8C",//azul
        "#80C41C",//verde
        "#C8A041",//marron
        "#FECF00",
        "#D2D200",
        "#00BFB3",
        "#FAAF41",
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF"
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
    text: typeOfHousing.datasets[0].label, // Usar el label del dataset como título
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

const BeneficiariosPage: NextPage = () => {

  const [events, setEvents] = useState<EventsData[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventsData[]>(
    events
  );
  const [selectedEvent, setSelectedEvent] = useState<EventsData | null>(null);

  return (
    <div className="w-full h-full flex flex-wrap">
      <Tabs aria-label="Options">
        <Tab key="beneficiarios" title="Benefiaciarios" className="w-full h-full flex flex-wrap">
          <div className="w-full h-full flex flex-wrap">
            <div className={styles.top_div}>
              <CardComponent
                title=""
                header={
                  <div className={styles.top_card}>
                    <div className={styles.top_div_division}>
                      <label className={styles.header_width}>Total productores</label>
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
                      <label className={styles.header_width}>Genero</label>
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
                      <label className={styles.header_width}>Tipo de propiedad</label>
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
                      <label className={styles.header_width}>Etnia</label>
                    </div>
                  </div>
                }
              >
                <div className={styles.top_card}>
                  <div className={styles.total_assist}>
                    {/* <label>Total Asistencias</label> */}
                    <label className={styles.top_card_label}>1714</label>
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
                    <Doughnut data={typeOfHousing} options={config2} />
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
                    <Doughnut data={etnia} options={config3} />
                  </div>
                </div>
              </CardComponent>
            </div>

            <div className={styles.bottom_div}>
              <div className={styles.width}>
                <ChartCardComponent title="TreeMap" header={<></>}>
                  <ReactChart type="treemap" data={data} options={options} />
                </ChartCardComponent>
              </div>
              <div className={styles.width}>
                <ChartCardComponent title="Mapa Colombia" header={<></>}>
                  <div className="w-full h-full">
                    <MapComponent provinces={CalendarController.extractProvinces(filteredEvents)} />
                  </div>
                </ChartCardComponent>
              </div>
            </div>
          </div>
        </Tab>
        <Tab key="cultivos" title="Cultivos Priorizados" className="w-full h-full flex flex-wrap">
          <div className="w-full h-full flex flex-wrap">
            <div className={styles.top_div}>
              <CardComponent
                title=""
                header={
                  <div className={styles.top_card}>
                    <div className={styles.top_div_division}>
                      <label className={styles.header_width}>Total Hectareas</label>
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
                      <label className={styles.header_width}>Cultivo priorizado 1</label>
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
                      <label className={styles.header_width}>Cultivo priorizado 2</label>
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
                      <label className={styles.header_width}>Sistemas productivos</label>
                    </div>
                  </div>
                }
              >
                <div className={styles.top_card}>
                  <div className={styles.total_assist}>
                    {/* <label>Total Asistencias</label> */}
                    <label className={styles.top_card_label}>9557</label>
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
                    <Doughnut data={typeOfHousing} options={config2} />
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
                    <Doughnut data={etnia} options={config3} />
                  </div>
                </div>
              </CardComponent>
            </div>

            <div className={styles.bottom_div}>
              <div className={styles.width}>
                <ChartCardComponent title="TreeMap" header={<></>}>
                  <ReactChart type="treemap" data={data} options={options} />
                </ChartCardComponent>
              </div>
              <div className={styles.width}>
                <ChartCardComponent title="Mapa Colombia" header={<></>}>
                  <div className="w-full h-full">
                    <MapComponent provinces={CalendarController.extractProvinces(filteredEvents)} />
                  </div>
                </ChartCardComponent>
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default BeneficiariosPage;
