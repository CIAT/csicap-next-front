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
import { useEffect, useState } from "react";
import { EventsData } from "@/interfaces";
import TechnicalRepository from "@/helpers/Component/Repository/TechnicalRepository";
import { DataFormat, TecnicalBeneficiaries } from "@/interfaces/Components/TechnicalComponent";
import TechnicalController from "@/helpers/Component/Controller/TechnicalController";

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

function countTotalRecords(data: { data: object }[]): number {
  return data.length;
}

function countGenders(data: { data: { gender_at_birth: string } }[]) {
  const genderCount: { [key: string]: number } = {};

  data.forEach((item) => {
    const gender = item.data.gender_at_birth;
    genderCount[gender] = (genderCount[gender] || 0) + 1;
  });

  return genderCount;
}

function countEducationLevel(data: { data: { highest_educational_level: string } }[]) {
  const educationLevelCount: { [key: string]: number } = {};

  data.forEach((item) => {
    const educationLevel = item.data.highest_educational_level;
    educationLevelCount[educationLevel] = (educationLevelCount[educationLevel] || 0) + 1;
  });

  return educationLevelCount;
}

function countEthnicity(data: { data: { ethnic_affiliation: string } }[]) {
  const ethnicityCount: { [key: string]: number } = {};

  data.forEach((item) => {
    const ethnicity = item.data.ethnic_affiliation;
    ethnicityCount[ethnicity] = (ethnicityCount[ethnicity] || 0) + 1;
  });

  return ethnicityCount;
}
const BeneficiariosPage: NextPage = () => {

  const [events, setEvents] = useState<TecnicalBeneficiaries[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<TecnicalBeneficiaries[]>(
    events
  );
  const [dataCalendarResp, setDataCalendarResp] = useState<number>(0);
  const [selectedEvent, setSelectedEvent] = useState<TecnicalBeneficiaries | null>(null);
  const [cropState, setCropState] = useState<string[]>([]);
  const [provinceState, setProvinceState] = useState<string[]>([]);
  const [genderNumber, setGenderNumber] = useState<number[]>([]);
  const [genderLabel, setGenderLabel] = useState<string[]>([]);
  const [educationaLevelNumber, setEducationalLevelNumber] = useState<number[]>([]);
  const [educationalLevelLabel, setEducationalLevelLabel] = useState<string[]>([]);
  const [ethnicityNumber, setEthnicityNumber] = useState<number[]>([]);
  const [ethnicityLabel, setEthnicityLabel] = useState<string[]>([]);
  const [totalData, setTotalData] = useState<number>(0);


  useEffect(() => {
    TechnicalRepository.fetchEvents()
      .then((data: DataFormat) => {
        const formattedEvents = TechnicalController.formatEvents(data);
        const uniqueCrop = TechnicalController.getUniqueCrops(formattedEvents);
        const uniqueProvinces = TechnicalController.extractProvinces(formattedEvents);
        setEvents(formattedEvents);
        setFilteredEvents(formattedEvents);
        setCropState([...uniqueCrop]);
        setProvinceState([...uniqueProvinces]);
        setDataCalendarResp(200);

        const totalDataRecord = countTotalRecords(data);
        setTotalData(totalDataRecord);

        const genderCount = countGenders(data)
        setGenderLabel(Object.keys(genderCount))
        setGenderNumber(Object.values(genderCount));

        const educationLevelCount = countEducationLevel(data)
        setEducationalLevelLabel(Object.keys(educationLevelCount))
        setEducationalLevelNumber(Object.values(educationLevelCount))

        const ethnicityCount = countEthnicity(data)
        setEthnicityLabel(Object.keys(ethnicityCount))
        setEthnicityNumber(Object.values(ethnicityCount))

      })
      .catch(error => {
        console.error("Error fetching events:", error);
        setDataCalendarResp(-1); // Set error state
      });
  }, []);

  const gender = {
    labels: genderLabel,
    datasets: [
      {
        label: "Sexo",
        data: genderNumber,
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

  const educationalLevel = {
    labels: educationalLevelLabel,
    datasets: [
      {
        label: "Nivel educativo",
        data: educationaLevelNumber,
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
    labels: ethnicityLabel,
    datasets: [
      {
        label: "Etnia",
        data: ethnicityNumber,
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
        position: "left" as const,
      },
    },
    title: {
      display: true,
      text: gender.datasets[0].label,
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
        position: "left" as const,
      },
    },
    title: {
      display: true,
      text: educationalLevel.datasets[0].label, // Usar el label del dataset como título
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
    <div className="w-full h-full flex flex-wrap">
      <div className={styles.top_div}>
        <CardComponent
          title=""
          header={
            <div className={styles.top_card}>
              <div className={styles.top_div_division}>
                <label className={styles.header_width}>Total tecnicos</label>
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
                <label className={styles.header_width}>Nivel Educativo</label>
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
              <label className={styles.top_card_label}>{totalData}</label>
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
              <Doughnut data={gender} options={config} />
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
              <Doughnut data={educationalLevel} options={config2} />
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
          <ChartCardComponent title="Tecnicos por Departamento" header={<></>}>
            <div className="w-full h-full">
              <MapComponent
                //TODO: fix the error with the string on technical interface
                //@ts-ignore
                provinces={TechnicalController.extractProvinces(filteredEvents)}
              />
            </div>
          </ChartCardComponent>
        </div>
      </div>
    </div>
  );
};

export default BeneficiariosPage;
