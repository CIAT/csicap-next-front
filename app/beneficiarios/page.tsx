"use client";

import { NextPage } from "next";
import styles from "./assistance.module.css";
import styleBeneficiaries from "@/components/ui/card/CardBeneficiaries.module.css";
import {
  Chart,
  ArcElement,
  CategoryScale,
  BarElement,
  LinearScale,
  Title,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Chart as ReactChart } from "react-chartjs-2";
import { TreemapController, TreemapElement } from "chartjs-chart-treemap";
import { useEffect, useState } from "react";
import { EventsData } from "@/interfaces";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import BeneficiariesRepository from "@/helpers/Component/Repository/BeneficiariesRepository";
import { DataFormat } from "@/interfaces/Components/BeneficiariesComponent";
import BeneficiariesController from "@/helpers/Component/Controller/BeneficiariesController";
import CardComponent from "@/components/ui/card/Card";
import MapComponent from "@/components/data/Map/MapComponent";
import CalendarController from "@/helpers/Component/Controller/CalendarController";

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
  }, []);

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
        data: [],
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
          {/* Tab Beneficiarios */}
          <Tab key="beneficiarios" title="Beneficiarios" className="w-full h-full flex flex-wrap">
            <div className="w-full h-full flex flex-wrap">
              {/* Card superior */}
              <div className={styles.top_div}>
                <CardComponent styles={styleBeneficiaries} title={"Total productores"}>
                  <div className={styles.top_div_division}>
                    <label className={styles.top_card_label}>{totalData}</label>
                  </div>
                </CardComponent>
                {/* Doughnut: Género */}
                <CardComponent
                    title="Género"
                    styles={styleBeneficiaries}
                >
                  <div className={styles.doughnut_chart}>
                    <Doughnut data={sex} options={config}/>
                  </div>
                </CardComponent>

                {/* Doughnut: Tipo de propiedad */}
                <CardComponent
                    title="Tipo de propiedad"
                    styles={styleBeneficiaries}
                >
                  <div className={styles.doughnut_chart}>
                    <Doughnut data={typeOfHousing} options={config2}/>
                  </div>
                </CardComponent>

                {/* Doughnut: Etnia */}
                <CardComponent
                    title="Etnia"
                    styles={styleBeneficiaries}
                >
                  <div className={styles.doughnut_chart}>
                    <Doughnut data={etnia} options={config3}/>
                  </div>
                </CardComponent>
              </div>
              <div className={styles.bottom_div}>
                <div className={styles.flex_container}>
                  <div className={styles.width}>
                    <CardComponent title="TreeMap" styles={styleBeneficiaries}>
                      <ReactChart type="treemap" data={data} options={options}/>
                    </CardComponent>
                  </div>
                  <div className={styles.width}>
                    <CardComponent title="Mapa Colombia" styles={styleBeneficiaries}>
                      <div className="w-full h-full">
                        <MapComponent provinces={CalendarController.extractProvinces(filteredEvents)}/>
                      </div>
                    </CardComponent>
                  </div>
                </div>
              </div>
            </div>
          </Tab>

          {/* Tab Cultivos Priorizados */}
          <Tab key="cultivos" title="Cultivos Priorizados" className="w-full h-full flex flex-wrap">
            <div className="w-full h-full flex flex-wrap">
              {/* Card superior */}
              <div className={styles.top_div}>
                <CardComponent
                    title="Total Hectáreas"
                    styles={styleBeneficiaries}
                >
                  <div className={styles.top_div_division}>
                    <label className={styles.top_card_label}>9557</label>
                  </div>
                </CardComponent>
                <CardComponent
                    title="Género"
                    styles={styleBeneficiaries}
                >
                  <div className={styles.doughnut_chart}>
                    <Doughnut data={sex} options={config} />
                  </div>
                </CardComponent>

                {/* Doughnut: Tipo de propiedad */}
                <CardComponent
                    title="Tipo de propiedad"
                    styles={styleBeneficiaries}
                >
                  <div className={styles.doughnut_chart}>
                    <Doughnut data={typeOfHousing} options={config2} />
                  </div>
                </CardComponent>
                {/* Doughnut: Etnia */}
                <CardComponent
                    title="Etnia"
                    styles={styleBeneficiaries}
                >
                  <div className={styles.doughnut_chart}>
                    <Doughnut data={etnia} options={config3} />
                  </div>
                </CardComponent>
              </div>
              <div className={styles.bottom_div}>
                <div className={styles.flex_container}>
                  <div className={styles.width}>
                    <CardComponent title="TreeMap" styles={styleBeneficiaries}>
                      <ReactChart type="treemap" data={data} options={options} />
                    </CardComponent>
                  </div>
                  <div className={styles.width}>
                    <CardComponent title="Mapa Colombia" styles={styleBeneficiaries}>
                      <div className="w-full h-full">
                        <MapComponent provinces={CalendarController.extractProvinces(filteredEvents)} />
                      </div>
                    </CardComponent>
                  </div>
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
  );
};

export default BeneficiariosPage;
