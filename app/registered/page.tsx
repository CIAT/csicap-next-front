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
import { EventsData, sectionStateData } from "@/interfaces";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import BeneficiariesRepository from "@/helpers/Component/Repository/BeneficiariesRepository";
import { DataFormat } from "@/interfaces/Components/BeneficiariesComponent";
import BeneficiariesController from "@/helpers/Component/Controller/BeneficiariesController";
import CardComponent from "@/components/ui/card/Card";
import MapComponent from "@/components/data/Map/MapComponent";
import MapController from "@/helpers/Component/Controller/MapController";
import {NestedDictionary} from "@/interfaces/Map/NestedDictionary";

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

function countGenders(data: { gen_name: string }[]) {
  const genderCount: { [key: string]: number } = {};

  data.forEach((item) => {
    const gender = item.gen_name;
    genderCount[gender] = (genderCount[gender] || 0) + 1;
  });

  return genderCount;
}

function countTypeOfHousing(data: { type_property: string }[]) {
  const housingCount: { [key: string]: number } = {};

  data.forEach((item) => {
    const house = item.type_property;
    housingCount[house] = (housingCount[house] || 0) + 1;
  });

  return housingCount;
}

function countEthnicity(data: { pr_ethnic_group: string }[]) {
  const ethnicityCount: { [key: string]: number } = {};

  data.forEach((item) => {
    const ethnicity = item.pr_ethnic_group;
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

function countPrimaryCrop(data: DataFormat[]): { [key: string]: number } {
  const primaryCropCount: { [key: string]: number } = {};

  data.forEach(item => {
    const primaryCrop = item.pr_primary_crop;
    primaryCropCount[primaryCrop] = (primaryCropCount[primaryCrop] || 0) + 1;
  });

  return primaryCropCount;
}

const BeneficiariosPage: NextPage = () => {

  const [events, setEvents] = useState<DataFormat[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<DataFormat[]>(
    events
  );
  const [counts, setCounts] = useState<NestedDictionary>({});


  const [selectedEvent, setSelectedEvent] = useState<DataFormat | null>(null);
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
  const [treemapDataFiltered, setTreemapDataFiltered] = useState<
      { name: string; value: number }[]
  >([]);

  useEffect(() => {
    BeneficiariesRepository.fetchEvents()
      .then((data: DataFormat[]) => {
        const formattedEvents = BeneficiariesController.formatEvents(data);
        setEvents(formattedEvents);
        setFilteredEvents(formattedEvents);

        setCounts(MapController.updateCountBeneficiariesByCity(formattedEvents));

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

        let primaryCropData: { [key: string]: number };

        primaryCropData = countPrimaryCrop(data)

        const treemapData = Object.keys(primaryCropData).map((key) => ({
          name: key,
          value: primaryCropData[key],
        }));

        setTreemapData(treemapData);
      })
      .catch(error => {
        console.error("Error fetching events:", error);
        setDataCalendarResp(-1); // Set error state
      });
  }, []);

  useEffect(() => {
    setTreemapDataFiltered(treemapData
        .sort((a, b) => b.value - a.value)
        .map(item => ({
          ...item,
          value: item.value
        })));
    console.log(treemapDataFiltered)
  }, [treemapData]);

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
        tree: treemapDataFiltered,
        key: "value",
        groups: ["name"],
        backgroundColor: (ctx: { dataIndex: number }) => {
          const colors = colores;
          return colors[ctx.dataIndex % colors.length];
        },
        borderColor: "rgba(0,0,0,0.1)",
        spacing: 1,
        borderWidth: 0,
        labels: {
          display: true,
          align: "center" as const,
          position: "top" as const,
          color: "white",
          wrap: true,
          formatter: (context: any) => {
            const data = context.dataset.tree[context.dataIndex];
            return `${data.name}: ${data.value}`;
          },
        },
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
          title: function () {
            return "";
          },
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
        <Tab key="registrados" title="Registrados" className="w-full h-full flex flex-wrap">
          <div className="w-full h-full flex flex-wrap">
            {/* Card superior */}
            <div className={styles.top_div}>
              <CardComponent styles={styleBeneficiaries} title={"Total productores registrados"}>
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
                      <MapComponent
                        polygons={BeneficiariesController.extractProvincesAndCities(filteredEvents)}
                        data={counts}
                      />
                    </div>
                  </CardComponent>
                </div>
              </div>
            </div>
          </div>
        </Tab>

        {/* Tab Cultivos Priorizados */}
        {/*<Tab key="cultivos" title="Cultivos Priorizados" className="w-full h-full flex flex-wrap">*/}
        {/*  <div className="w-full h-full flex flex-wrap">*/}
        {/*    /!* Card superior *!/*/}
        {/*    <div className={styles.top_div}>*/}
        {/*      <CardComponent*/}
        {/*        title="Total Hectáreas"*/}
        {/*        styles={styleBeneficiaries}*/}
        {/*      >*/}
        {/*        <div className={styles.top_div_division}>*/}
        {/*          <label className={styles.top_card_label}>9557</label>*/}
        {/*        </div>*/}
        {/*      </CardComponent>*/}
        {/*      <CardComponent*/}
        {/*        title="Género"*/}
        {/*        styles={styleBeneficiaries}*/}
        {/*      >*/}
        {/*        <div className={styles.doughnut_chart}>*/}
        {/*          <Doughnut data={sex} options={config} />*/}
        {/*        </div>*/}
        {/*      </CardComponent>*/}

        {/*      /!* Doughnut: Tipo de propiedad *!/*/}
        {/*      <CardComponent*/}
        {/*        title="Tipo de propiedad"*/}
        {/*        styles={styleBeneficiaries}*/}
        {/*      >*/}
        {/*        <div className={styles.doughnut_chart}>*/}
        {/*          <Doughnut data={typeOfHousing} options={config2} />*/}
        {/*        </div>*/}
        {/*      </CardComponent>*/}
        {/*      /!* Doughnut: Etnia *!/*/}
        {/*      <CardComponent*/}
        {/*        title="Etnia"*/}
        {/*        styles={styleBeneficiaries}*/}
        {/*      >*/}
        {/*        <div className={styles.doughnut_chart}>*/}
        {/*          <Doughnut data={etnia} options={config3} />*/}
        {/*        </div>*/}
        {/*      </CardComponent>*/}
        {/*    </div>*/}
        {/*    <div className={styles.bottom_div}>*/}
        {/*      <div className={styles.flex_container}>*/}
        {/*        <div className={styles.width}>*/}
        {/*          <CardComponent title="TreeMap" styles={styleBeneficiaries}>*/}
        {/*            <ReactChart type="treemap" data={data} options={options} />*/}
        {/*          </CardComponent>*/}
        {/*        </div>*/}
        {/*        <div className={styles.width}>*/}
        {/*          <CardComponent title="Mapa Colombia" styles={styleBeneficiaries}>*/}
        {/*            <div className="w-full h-full">*/}
        {/*              <MapComponent*/}
        {/*                polygons={[]}*/}
        {/*                data={{}}*/}
        {/*              />*/}
        {/*            </div>*/}
        {/*          </CardComponent>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</Tab>*/}
      </Tabs>
    </div>
  );
};

export default BeneficiariosPage;
