"use client";

import Image from "next/image";
import { NextPage } from "next";
import styles from "./assistance.module.css";
import CardComponent from "@/components/assistance/card";
import {
  Chart as ChartJS,
  Tooltip as TooltipPlugin,
  Legend as LegendPlugin,
  ArcElement,
  CategoryScale,
  BarElement,
  LinearScale,
  Title as TitlePlugin,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { TreemapController, TreemapElement } from "chartjs-chart-treemap";
import { Chart as ReactChart } from "react-chartjs-2";
import ChartCardComponent from "@/components/events/chartCard";
import MapComponent from "@/components/data/Map/MapComponent";
import CalendarController from "@/helpers/Component/Controller/CalendarController";
import { useEffect, useState } from "react";
import { EventsData } from "@/interfaces";

interface Assistance {
  data: {
    "Instituciones que organizan el evento": string[];
    Eje: string[];
    Edad: string;
    "¿Es su primera vez asistiendo a algún evento CSICAP?": string | null;
    "Tipo de documento": string;
    "Ocupación principal": string;
    id_unique: string;
    "Cadena productiva": string[];
    Componente: string[];
    "¿Cúal fue su sexo al nacer?": string;
    "Departamento del evento": string;
    "Unique Row Identifier (UUID)": string;
    "Organización o afiliación": string;
    id_event: string;
    "Municipio al cual va dirigido el evento": string;
  };
  id_event: string;
  unique_row_id: string;
}

ChartJS.register(
  TooltipPlugin,
  LegendPlugin,
  ArcElement,
  CategoryScale,
  BarElement,
  LinearScale,
  TitlePlugin,
  TreemapController,
  TreemapElement
);

const colors = [
  "#FECF00",
  "#D2D200",
  "#00BFB3",
  "#FAAF41",
  "#C8A041",
  "#80C41C",
  "#669d16",
  "#0E6E8C",
  "#569aaf",
];

const borderColors = [
  "#FECF00",
  "#D2D200",
  "#00BFB3",
  "#FAAF41",
  "#C8A041",
  "#80C41C",
  "#669d16",
  "#0E6E8C",
  "#569aaf",
];

async function getAssistanceData(): Promise<Assistance[]> {
  try {
    const response = await fetch(
      "https://1my60gpxj7.execute-api.us-east-1.amazonaws.com/assistence-list"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const json = await response.json();

    // Ensure the response contains the expected "data" array
    if (json && Array.isArray(json)) {
      return json;
    } else {
      console.log("API returned unexpected structure.");
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return [];
  }
}

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
        return colors[ctx.dataIndex % colors.length]; // Reuse colors array
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
  },
};

const config2 = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        font: {
          size:10,
        },
        usePointStyle: true,
      },
      position: "right" as const,
    },
  },
  title: {
    display: true,
  },
};

const config3 = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        font: {
          size:6,
        },
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
  const [totalAssistants, setTotalAssistants] = useState<number>(); // State to hold total assistants
  const [events, setEvents] = useState<EventsData[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventsData[]>(events);
  const [genderStats, setGenderStats] = useState({ men: 0, women: 0, other: 0 });
  const [ageStats, setAgeStats] = useState<{ [key: string]: number }>({});
  const [occupationStats, setOccupationStats] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAssistanceData();
        let menCount = 0;
        let womenCount = 0;
        let otherCount = 0;
        let ageCount: { [key: string]: number } = {
          "20-25": 0,
          "26-30": 0,
          "31-40": 0,
          "41-50": 0,
          "51+": 0,
          "N/N": 0,
        };
        let occupationCount: { [key: string]: number } = {
          "Otro": 0 // Initialize "Otro" to count any null or undefined occupations
        };
  
        data.forEach((item) => {
          const gender = item.data["¿Cúal fue su sexo al nacer?"]?.toLowerCase();
          const age = parseInt(item.data.Edad);
          const occupation = item.data["Ocupación principal"];
  
          // Count gender
          if (gender === "hombre") {
            menCount++;
          } else if (gender === "mujer") {
            womenCount++;
          } else {
            otherCount++;
          }
  
          // Count age groups
          if (!isNaN(age)) {
            if (age >= 20 && age <= 25) {
              ageCount["20-25"]++;
            } else if (age >= 26 && age <= 30) {
              ageCount["26-30"]++;
            } else if (age >= 31 && age <= 40) {
              ageCount["31-40"]++;
            } else if (age >= 41 && age <= 50) {
              ageCount["41-50"]++;
            } else if (age >= 51) {
              ageCount["51+"]++;
            }
          } else {
            ageCount["N/N"]++;
          }
  
          // Count occupations, if occupation is null, undefined, or empty, count as "Otro"
          if (occupation) {
            occupationCount[occupation] = (occupationCount[occupation] || 0) + 1;
          } else {
            occupationCount["Otro"]++; // Increment "Otro" for null/undefined occupations
          }
        });
  
        // Update state with the counts
        setTotalAssistants(data.length);
        setGenderStats({ men: menCount, women: womenCount, other: otherCount });
        setAgeStats(ageCount);
        setOccupationStats(occupationCount);
      } catch (error) {
        console.error('Failed to fetch or process data:', error);
      }
    }
  
    fetchData();
  }, []);
  
  

  const genderChartData = {
    labels: ["Hombre", "Mujer",  "Otro"],
    datasets: [
      {
        label: "Distribución de Género",
        data: [genderStats.men, genderStats.women, genderStats.other],
        backgroundColor: ["rgba(54, 162, 235, 0.5)", "rgba(255, 99, 132, 0.5)", "rgba(179, 179, 179, 0.5)"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)", "rgba(179, 179, 179, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // Chart data for age distribution
  const ageChartData = {
    labels: ["20-25", "26-30", "31-40", "41-50", "51+","N/N"],
    datasets: [
      {
        label: "Distribución de Edad",
        data: Object.values(ageStats), // Use age group counts
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)", // Ingeniería
          "rgba(54, 162, 235, 0.5)", // Docencia
          "rgba(75, 192, 192, 0.5)", // Administración
          "rgba(153, 102, 255, 0.5)", // Salud
          "rgba(255, 205, 86, 0.5)",
          "rgba(179, 179, 179, 0.5)" 
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // Ingeniería
          "rgba(54, 162, 235, 1)", // Docencia
          "rgba(75, 192, 192, 1)", // Administración
          "rgba(153, 102, 255, 1)", // Salud
          "rgba(255, 205, 86, 1)", // Arte
          "rgba(179, 179, 179, 1)"
        ],
        borderWidth: 1,
      },
    ],
  };

  // Generate colors dynamically for the occupation chart
  const occupationBackgroundColors = Object.keys(occupationStats).map(
    (_, index) => colors[index % colors.length]
  );

  const occupationBorderColors = Object.keys(occupationStats).map(
    (_, index) => borderColors[index % borderColors.length]
  );

  // Chart data for occupation distribution with dynamic color assignment
  const occupationChartData = {
    labels: Object.keys(occupationStats), // Use occupation types as labels
    datasets: [
      {
        label: "Distribución de Ocupaciones",
        data: Object.values(occupationStats), // Use occupation counts
        backgroundColor: occupationBackgroundColors, // Dynamically assigned background colors
        borderColor: occupationBorderColors, // Dynamically assigned border colors
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.div}>
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
                }}
              ></div>

              <div className={styles.top_div_division}>
                <label className={styles.header_width}>Sexo</label>
              </div>

              <div
                style={{
                  width: "1px", // Ancho del divisor
                  height: "20px",
                  backgroundColor: "#d1d1d1", // Color del divisor
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
              <label className={styles.top_card_label}>{totalAssistants}</label>
            </div>
            <div
              style={{
                width: "1px", // Ancho del divisor
                height: "100%",
                backgroundColor: "#d1d1d1", // Color del divisor
              }}
            ></div>
            <div className={styles.top_div_division}>
              <Doughnut data={genderChartData} options={config} />
            </div>
            <div
              style={{
                width: "1px", // Ancho del divisor
                height: "100%",
                backgroundColor: "#d1d1d1", // Color del divisor
              }}
            ></div>
            <div className={styles.top_div_division}>
              <Doughnut data={ageChartData} options={config2} />
            </div>
            <div
              style={{
                width: "1px", // Ancho del divisor
                height: "100%",
                backgroundColor: "#d1d1d1", // Color del divisor
              }}
            ></div>
            <div className={styles.top_div_division2}>
              <div className={styles.chart_inner}>
                <Doughnut data={occupationChartData} options={config3} />
              </div>
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
              <MapComponent
                provinces={CalendarController.extractProvinces(filteredEvents)}
              />
            </div>
          </ChartCardComponent>
        </div>
      </div>
    </div>
  );
};

export default AssistancePage;
