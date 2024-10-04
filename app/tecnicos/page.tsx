"use client";

import { NextPage } from "next";
import styles from "./assistance.module.css";
import styleTechnical from "@/components/ui/card/CardBeneficiaries.module.css";
import CardComponent from "@/components/ui/card/Card";
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
import { TreemapController, TreemapElement } from "chartjs-chart-treemap";
import { Chart as ReactChart } from "react-chartjs-2";
import ChartCardComponent from "@/components/events/chartCard";
import MapComponent from "@/components/data/Map/MapComponent";
import { useEffect, useState } from "react";
import TechnicalRepository from "@/helpers/Component/Repository/TechnicalRepository";
import { DataFormat, TechnicalBeneficiaries } from "@/interfaces/Components/TechnicalComponent";
import TechnicalController from "@/helpers/Component/Controller/TechnicalController";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { colors } from "@nextui-org/react";
import {sectionStateData} from "@/interfaces";

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
  "#FECF00",
  "#0E6E8C",
  "#D2D200",
  "#00BFB3",
  "#FAAF41",
  "#569aaf",
  "#80C41C",
  "#C8A041",
  "#669d16",
];

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

function countCrops(data: DataFormat): { [key: string]: number } {
  const cropCount: { [key: string]: number } = {};

  data.forEach(item => {
    item.data.crops_worked_last_12_months.forEach(crop => {
      cropCount[crop] = (cropCount[crop] || 0) + 1;
    });
  });

  return cropCount;
}

function countOrganizations(data: DataFormat): { [key: string]: number } {
  const organizationCount: { [key: string]: number } = {};

  data.forEach(item => {
    item.data.affiliated_guild_or_organization.forEach(organization => {
      organizationCount[organization] = (organizationCount[organization] || 0) + 1;
    });
  });

  return organizationCount;
}

const BeneficiariosPage: NextPage = () => {

  const [events, setEvents] = useState<TechnicalBeneficiaries[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<TechnicalBeneficiaries[]>(
    events
  );
  const [dataCalendarResp, setDataCalendarResp] = useState<number>(0);
  const [provinceState, setProvinceState] = useState<string[]>([]);
  const [genderNumber, setGenderNumber] = useState<number[]>([]);
  const [genderLabel, setGenderLabel] = useState<string[]>([]);
  const [educationaLevelNumber, setEducationalLevelNumber] = useState<number[]>([]);
  const [educationalLevelLabel, setEducationalLevelLabel] = useState<string[]>([]);
  const [ethnicityNumber, setEthnicityNumber] = useState<number[]>([]);
  const [ethnicityLabel, setEthnicityLabel] = useState<string[]>([]);
  const [totalData, setTotalData] = useState<number>(0);
  const [selectedFilter, setSelectedFilter] = useState<string>("institution");
  const [treemapTitle, setTreemapTitle] = useState("");
  const [treemapData, setTreemapData] = useState<
    { name: string; value: number }[]
  >([]);

  useEffect(() => {
    TechnicalRepository.fetchEvents()
      .then((data: DataFormat) => {
        const formattedEvents = TechnicalController.formatEvents(data);
        const uniqueProvinces = TechnicalController.extractProvinces(formattedEvents);
        setEvents(formattedEvents);
        setFilteredEvents(formattedEvents);
        setProvinceState([...uniqueProvinces]);
        setDataCalendarResp(200);

        let filterData: { [key: string]: number };

        // Based on selected filter, count occurrences
        switch (selectedFilter) {
          case "crop":
            filterData = countCrops(data);
            setTreemapTitle("Cultivos")
            break;
          case "institution":
          default:
            filterData = countOrganizations(data);
            setTreemapTitle("Instituciones")
        }

        const treemapData = Object.keys(filterData).map((key) => ({
          name: key,
          value: filterData[key],
        }));

        setTreemapData(treemapData);

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
  }, [selectedFilter]);

  const handleFilterChange = (event: SelectChangeEvent) => {
    setSelectedFilter(event.target.value);
  };

  const gender = {
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

  const educationalLevel = {
    labels: educationalLevelLabel,
    datasets: [
      {
        label: "Nivel educativo",
        data: educationaLevelNumber,
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

  const treeMap = {
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

  const filterTechnicians = (state: sectionStateData) => {

  };

  return (
      <div className="w-full h-full flex flex-wrap">
        {/* Card superior */}
        <div className="w-full h-full flex flex-wrap">
          <div className={styles.top_div}>
            {/* Card: Total técnicos */}
            <CardComponent title="Total técnicos registrados" styles={styleTechnical}>
              <div className={styles.top_div_division}>
                <label className={styles.top_card_label}>{totalData}</label>
              </div>
            </CardComponent>

            {/* Card: Género */}
            <CardComponent title="Género" styles={styleTechnical}>
              <div className={styles.doughnut_chart}>
                <Doughnut data={gender} options={config}/>
              </div>
            </CardComponent>

            {/* Card: Nivel Educativo */}
            <CardComponent title="Nivel Educativo" styles={styleTechnical}>
              <div className={styles.doughnut_chart}>
                <Doughnut data={educationalLevel} options={config2}/>
              </div>
            </CardComponent>

            {/* Card: Etnia */}
            <CardComponent title="Etnia" styles={styleTechnical}>
              <div className={styles.doughnut_chart}>
                <Doughnut data={etnia} options={config3}/>
              </div>
            </CardComponent>
          </div>

          {/* Sección inferior con gráficos adicionales */}
          <div className={styles.bottom_div}>
            <div className={styles.flex_container}>
              <div className={styles.width}>
                {/* Gráfico de Treemap */}
                <ChartCardComponent title={treemapTitle} header={
                  <FormControl sx={{m: 1, minWidth: 120}} size="small">
                    <InputLabel id="filter-select-label">Filtrar</InputLabel>
                    <Select
                        labelId="filter-select-label"
                        id="filter-select"
                        value={selectedFilter}
                        onChange={handleFilterChange}
                        label="Filtrar"
                    >
                      <MenuItem value="crop">Cultivo</MenuItem>
                      <MenuItem value="institution">Institución</MenuItem>
                    </Select>
                  </FormControl>
                }>
                  <ReactChart type="treemap" data={treeMap} options={options}/>
                </ChartCardComponent>
              </div>

              <div className={styles.width}>
                {/* Mapa de Colombia */}
                <CardComponent title="Técnicos por Departamento" styles={styleTechnical}>
                  <div className="w-full h-full">
                    <MapComponent
                     polygons={TechnicalController.extractProvinces(TechnicalController.transformToFormattedBeneficiary(filteredEvents))}
                     data={{}}
                     filterData={(newState: sectionStateData) => filterTechnicians(newState)}/>
                  </div>
                </CardComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default BeneficiariosPage;
