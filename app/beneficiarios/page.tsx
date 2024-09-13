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
import { SetStateAction, useEffect, useState } from "react";
import { EventsData } from "@/interfaces";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import BeneficiariesRepository from "@/helpers/Component/Repository/BeneficiariesRepository";
import { DataFormat } from "@/interfaces/Components/BeneficiariesComponent";
import BeneficiariesController from "@/helpers/Component/Controller/BeneficiariesController";

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

const colores = [
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
];

function countTotalRecords(data: DataFormat[]): number {
  return data.length;
}

function countGenders(data: { sexo: string }[]) {
  const genderCount: { [key: string]: number } = {};

  data.forEach((item) => {
    const gender = item.sexo;
    genderCount[gender] = (genderCount[gender] || 0) + 1;
  });

  return genderCount;
}

function countTypeOfHousing(data: { propiedad: string }[]) {
  const housingCount: { [key: string]: number } = {};

  data.forEach((item) => {
    const house = item.propiedad;
    housingCount[house] = (housingCount[house] || 0) + 1;
  });

  return housingCount;
}

function countEthnicity(data: { etnia: string }[]) {
  const ethnicityCount: { [key: string]: number } = {};

  data.forEach((item) => {
    const ethnicity = item.etnia;
    ethnicityCount[ethnicity] = (ethnicityCount[ethnicity] || 0) + 1;
  });

  return ethnicityCount;
}

function countOrganizations(data: DataFormat[]): { [key: string]: number } {
  const organizationCount: { [key: string]: number } = {};

  data.forEach(item => {
    const gremio = item.gremio;
    organizationCount[gremio] = (organizationCount[gremio] || 0) + 1;
  });

  return organizationCount;
}

const BeneficiariosPage: NextPage = () => {

  const [events, setEvents] = useState<EventsData[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventsData[]>(
    events
  );
  const [selectedEvent, setSelectedEvent] = useState<EventsData | null>(null);
  const [dataCalendarResp, setDataCalendarResp] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const [genderNumber, setGenderNumber] = useState<number[]>([]);
  const [genderLabel, setGenderLabel] = useState<string[]>([]);
  const [typeHouseNumber, setTypeHouseNumber] = useState<number[]>([]);
  const [typeHouseLabel, setTypeHouseLabel] = useState<string[]>([]);
  const [ethnicityNumber, setEthnicityNumber] = useState<number[]>([]);
  const [ethnicityLabel, setEthnicityLabel] = useState<string[]>([]);
  const [treemapData, setTreemapData] = useState<
    { name: string; value: number }[]
  >([]);

  useEffect(() => {
    BeneficiariesRepository.fetchEvents()
      .then((data: DataFormat[]) => {
        const formattedEvents = BeneficiariesController.formatEvents(data);

        // setDataCalendarResp(200);
        const totalDataRecord = countTotalRecords(data);
        setTotalData(totalDataRecord);

        const genderCount = countGenders(data);
        setGenderLabel(Object.keys(genderCount));
        setGenderNumber(Object.values(genderCount));

        const housingCount = countTypeOfHousing(data)
        setTypeHouseLabel(Object.keys(housingCount));
        setTypeHouseNumber(Object.values(housingCount));

        const ethnicityCount = countEthnicity(data);
        setEthnicityLabel(Object.keys(ethnicityCount));
        setEthnicityNumber(Object.values(ethnicityCount));

        let organizationData: { [key: string]: number };

        organizationData = countOrganizations(data)

        const treemapData = Object.keys(organizationData).map((key) => ({
          name: key,
          value: organizationData[key],
        }));

        setTreemapData(treemapData);


      })
      .catch(error => {
        console.error("Error fetching events:", error);
        setDataCalendarResp(-1); // Set error state
      });
  });

  const sex = {
    labels: genderLabel,
    datasets: [
      {
        label: "Sexo",
        data: genderNumber,
        backgroundColor: colores,
        borderColor: colores,
        borderWidth: 1,
      },
    ],
  };

  const typeOfHousing = {
    labels: typeHouseLabel,
    datasets: [
      {
        label: "Tipo de propiedad",
        data: typeHouseNumber,
        backgroundColor: colores,
        borderColor: colores,
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
        backgroundColor: colores,
        borderColor: colores,
        borderWidth: 1,
      },
    ],
  };

  const data = {
    datasets: [
      {
        // Se requiere la propiedad `data` aunque esté vacía
        data: [], // Obligatorio para Chart.js
        tree: treemapData,
        key: "value",
        groups: ["name"],
        backgroundColor: (ctx: { dataIndex: number }) => {
          const colors = colores;
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
        position: "left" as const,
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
                <ChartCardComponent title="Gremios" header={<></>}>
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
