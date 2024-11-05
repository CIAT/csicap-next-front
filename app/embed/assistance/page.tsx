"use client";

import {NextPage} from "next";
import styles from "./assistance.module.css";
import styleTechnical from "./assistance.module.css";
import CardComponent from "@/components/ui/card/Card";
import { Chart as ReactChart } from "react-chartjs-2";
import {
  Chart,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  BarElement,
  LinearScale,
  Title,
} from "chart.js";
import {Doughnut} from "react-chartjs-2";
import {TreemapController, TreemapElement} from "chartjs-chart-treemap";
import ChartCardComponent from "@/components/events/chartCard";
import MapComponent from "@/components/data/Map/MapComponent";
import CalendarController from "@/helpers/Component/Controller/CalendarController";
import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import LoadingAnimation from "@/components/loadingAnimation";
import { DataFormat, EventsData , Event} from "@/interfaces";
import { parse } from "path";
import CalendarRepository from "@/helpers/Component/Repository/CalendarRepository";
import MapController from "@/helpers/Component/Controller/MapController";
import {NestedDictionary} from "@/interfaces/Map/NestedDictionary";
import {Assistance} from "@/interfaces/Components/AssistanceComponent";
import AssistanceRepository from "@/helpers/Component/Repository/AssistanceRepository";


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

const shortenedLabels = [
  "1-Agricultura digital",
  "2-Información climática",
  "3-Mejoramiento génetico",
  "4-Técnicas de manejo de cultivos",
  "5-Modelos de negocio",
  "6-Asistencia técnica",
  "7-Monitoreo y evaluación",
  "8-Ambiental, social y género",
  "Equipo de coordinación",
];

const colors = [
  "#FECF00",
  "#669d16",
  "#0E6E8C",
  "#00BFB3",
  "#FAAF41",
  "#C8A041",
  "#80C41C",
  "#D2D200",
  "#569aaf",
];

const borderColors = [
  "#FECF00",
  "#669d16",
  "#0E6E8C",
  "#00BFB3",
  "#FAAF41",
  "#C8A041",
  "#80C41C",
  "#D2D200",
  "#569aaf",
];

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
    tooltip: {
      callbacks: {
        title: function () {
          return "";
        },
        label: function (tooltipItem: any) {
          const index = tooltipItem.dataIndex;
          return `${tooltipItem.label}: ${tooltipItem.raw}`;
        },
      },
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
        label: function (tooltipItem: any) {
          const data = tooltipItem.raw;
          const label = shortenedLabels.find((label) => label.startsWith(data.g.slice(0, 1))) || data.g;
          return `${label}: ${data.v}`;
        },
      },
    },
  },
};

const countCrops = (events: Event[]) => {
  const cropCount: { [key: string]: number } = {};
  let multicultivoCount = 0;
  events.forEach((event) => {
    if (event.crop.length > 1) {
      if (event.participant_count === "nan") {
        multicultivoCount += 0;
      } else {
        multicultivoCount += Number(event.participant_count);
      }
    } else {
      const crop = event.crop[0];
      if (event.participant_count === "nan") {
        cropCount[crop] = (cropCount[crop] || 0) + 0;
      } else {
        cropCount[crop] =
          (cropCount[crop] || 0) + Number(event.participant_count);
      }
    }
  });

  if (multicultivoCount > 0) {
    cropCount["Multi-Cultivos"] = multicultivoCount;
  }
  return cropCount;
};

const countEjes = (events: Event[]) => {
  const ejeCount: { [key: string]: number } = {};
  let multiEjeCount = 0;
  events.forEach((event) => {
    if (event.eje.length > 1) {
      if (event.participant_count === "nan") {
        multiEjeCount += 0;
      } else {
        multiEjeCount += Number(event.participant_count);
      }
    } else {
      const eje = event.eje[0];
      if (event.participant_count === "nan") {
        ejeCount[eje] = (ejeCount[eje] || 0) + 0;
      } else {
        ejeCount[eje] =
          (ejeCount[eje] || 0) + Number(event.participant_count);
      }
    }
  });

  if (multiEjeCount > 0) {
    ejeCount["Multi-Ejes"] = multiEjeCount;
  }
  return ejeCount;
};

const countCity = (events: Event[]) => {
  const cityCount: { [key: string]: number } = {};
  events.forEach((event) => {
      const city = event.city;
      if (event.participant_count === "nan") {
        cityCount[city] = (cityCount[city] || 0) + 0;
      } else {
        cityCount[city] =
          (cityCount[city] || 0) + Number(event.participant_count);
      }
  });
  return cityCount;
};

const countInstitutions = (assists: Assistance[]) => {
  const institutionCount: { [key: string]: number } = {};
  let nullInstitutionCount = 0;
  assists.forEach((assist) => {
      const institution = assist.organization_affiliation;
      if (institution) {
        institutionCount[institution] = (institutionCount[institution] || 0) + 1;
      }else if (institution === null || institution === "N/A") {
        nullInstitutionCount++;
      }
  });

  if (nullInstitutionCount > 0) {
    institutionCount["N/A"] = nullInstitutionCount;
  }
  return institutionCount;
};

const AssistancePage: NextPage = () => {
  const [events, setEvents] = useState<EventsData[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventsData[]>(events);
  const [counts, setCounts] = useState<NestedDictionary>({});

  const [genderStats, setGenderStats] = useState({
    men: 0,
    women: 0,
    other: 0,
  });
  const [ageStats, setAgeStats] = useState<{ [key: string]: number }>({});
  const [occupationStats, setOccupationStats] = useState<{
    [key: string]: number;
  }>({});
  const [treemapData, setTreemapData] = useState<
    { name: string; value: number }[]
  >([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("crop");
  const [allAssistanceData, setAllAssistanceData] = useState<Assistance[]>([]);
  const [allEventsData, setAllEventsData] = useState<Event[]>([]);

  useEffect(() => {
    CalendarRepository.fetchEvents()
        .then((data: DataFormat) => {
          const formattedEvents = CalendarController.formatEvents(data).map(event => ({
            ...event,
            city: event.city.toLowerCase(),
          }));
          setCounts(MapController.updateCountAssistantsByGender(formattedEvents));
          setEvents(formattedEvents);
          setFilteredEvents(formattedEvents);
        })
        .catch(error => {
          console.error("Error fetching events:", error);
        });

    async function fetchData() {
      const dataset =  await AssistanceRepository.getAssistanceData();
      setAllAssistanceData(dataset);
      const eventsDataSet = await CalendarRepository.fetchCustomEvent();
      setAllEventsData(CalendarController.formatEvent(eventsDataSet));
      initializeTreemapData(CalendarController.formatEvent(eventsDataSet));
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (allAssistanceData.length > 0) {
      proccesdata();
    }
  }, [allAssistanceData]);

  function proccesdata() {
    let ageCount: { [key: string]: number } = {
      "20-25": 0,
      "26-30": 0,
      "31-40": 0,
      "41-50": 0,
      "51+": 0,
      "N/N": 0,
    };

    let occupationCount: { [key: string]: number } = {
      "Tecnico/profesional": 0,
      "Productor(a) agropecuario(a)": 0,
      "Investigador(a)": 0,
      Otro: 0,
    };

    let menCount = 0;
    let womenCount = 0;
    let otherCount = 0;

    const currentYear = new Date().getFullYear(); // Current year

    allAssistanceData.forEach((item) => {
      const gender = item.sex_complete?.toLowerCase();
      const occupation = item?.main_occupation;
      const birthDate = item.birth_date ? new Date(item.birth_date) : null; // Parse the birth date
      const age = birthDate ? currentYear - birthDate.getFullYear() : null; // Calculate age

      // Count gender
      if (gender === "hombre") {
        menCount++;
      } else if (gender === "mujer") {
        womenCount++;
      } else {
        otherCount++;
      }

      // Count occupation
      if (occupation === "Técnico/Profesional") {
        occupationCount["Tecnico/profesional"]++;
      } else if (occupation === "Productor(a) agropecuario(a)") {
        occupationCount["Productor(a) agropecuario(a)"]++;
      } else if (occupation === "Investigador(a)") {
        occupationCount["Investigador(a)"]++;
      } else {
        occupationCount["Otro"]++;
      }

      // Count age
      if (age !== null) {
        if (age >= 20 && age <= 25) {
          ageCount["20-25"]++;
        } else if (age >= 26 && age <= 30) {
          ageCount["26-30"]++;
        } else if (age >= 31 && age <= 40) {
          ageCount["31-40"]++;
        } else if (age >= 41 && age <= 50) {
          ageCount["41-50"]++;
        } else if (age > 50) {
          ageCount["51+"]++;
        }
      } else {
        ageCount["N/N"]++;
      }
    });

    // Update state with the counts
    setGenderStats({ men: menCount, women: womenCount, other: otherCount });
    setAgeStats(ageCount);
    setOccupationStats(occupationCount);
  }

  const initializeTreemapData = (data: Event[]) => {
    const filterData = countCrops(data);
    const mappedData = Object.keys(filterData).map(key => ({
      name: key,
      value: filterData[key]
    }));
    setTreemapData(mappedData);
  };
  
  const processTreemapData = (filter: string, data: Event[], data2: Assistance[]) => {
    let filterData: { [key: string]: number } = {};

    switch (filter) {
      case "crop":
        filterData = countCrops(data); // Usar countCrop en lugar de countCrops
        break;
      case "ejes":
        filterData = countEjes(data);
        break;
      case "city":
        filterData = countCity(data);
        break;
      case "institution":
        filterData = countInstitutions(data2);
        break;
      default:
        return;
    }

    // Crear datos para el treemap
    const mappedData = Object.keys(filterData).map((key) => ({
      name: key,
      value: filterData[key],
    }));
    setTreemapData(mappedData);
  };

  const handleFilterChange = (event: SelectChangeEvent) => {
    const newFilter = event.target.value;
    setSelectedFilter(newFilter);
    processTreemapData(newFilter, allEventsData, allAssistanceData); // Use the stored event data
  };

  const occupationBackgroundColors = Object.keys(occupationStats).map(
    (_, index) => colors[index % colors.length]
  );

  const occupationBorderColors = Object.keys(occupationStats).map(
    (_, index) => borderColors[index % borderColors.length]
  );

  const treeData = {
    datasets: [
      {
        label: 'Eventos por Cultivo',
        data: treemapData.map(item => item.value),
        tree: treemapData,
        key: 'value',
        groups: ['name'],
        backgroundColor: (ctx: { dataIndex: number }) => {
          return colors[ctx.dataIndex % colors.length]; // Reuse colors array
        },
        borderColor: 'rgba(0,0,0,0.1)',
        spacing: 1,
        borderWidth: 0,
        labels: {
          display: true,
          align: "center" as const, // Asegúrate de que el valor sea uno de los permitidos
          position: "top" as const,
          color: "white",
          wrap: true,
          formatter: (ctx: any) => {
            const data = ctx.raw;
            const label = data.g ? shortenedLabels.find((label) => label.startsWith(data.g.slice(0, 1))) || data.g : "N/A";
            return `${label}: ${data.v}`;
          },
        },
      }
    ]
  };
  

  const ageChartData = {
    labels: ["20-25", "26-30", "31-40", "41-50", "51+", "N/N"],
    datasets: [
      {
        label: "Distribución de Edad",
        data: Object.values(ageStats),
        backgroundColor: occupationBackgroundColors,
        borderColor: occupationBorderColors,
      },
    ],
  };

  const occupationChartData = {
    labels: Object.keys(occupationStats),
    datasets: [
      {
        label: "Distribución de Ocupaciones",
        data: Object.values(occupationStats),
        backgroundColor: occupationBackgroundColors,
        borderColor: occupationBorderColors,
      },
    ],
  };

  const genderChartData = {
    labels: ["Hombre", "Mujer", "Otro"],
    datasets: [
      {
        label: "Distribución de Género",
        data: [genderStats.men, genderStats.women, genderStats.other],
        backgroundColor: occupationBackgroundColors,
        borderColor: occupationBorderColors,
      },
    ],
  };



  return (
    <div className={styles.div}>
      <div className={styles.top_div}>
        {/* Card: Total asistentes */}
        <CardComponent title="Total asistentes" styles={styleTechnical}>
          <label className={styles.top_card_label}>
            {allAssistanceData.length > 0 ? (
              allAssistanceData.length
            ) : (
              <LoadingAnimation />
            )}
          </label>
        </CardComponent>

        {/* Card: Género */}
        <CardComponent title="Género" styles={styleTechnical}>
          {allAssistanceData.length > 0 ? (
            <Doughnut data={genderChartData} options={config} />
          ) : (
            <LoadingAnimation />
          )}
        </CardComponent>

        {/* Card: Edad */}
        <CardComponent title="Edad" styles={styleTechnical}>
          {allAssistanceData.length > 0 ? (
            <Doughnut data={ageChartData} options={config} />
          ) : (
            <LoadingAnimation />
          )}
        </CardComponent>

        {/* Card: Ocupacion */}
        <CardComponent title="Ocupación" styles={styleTechnical}>
          {allAssistanceData.length > 0 ? (
            <Doughnut data={occupationChartData} options={config} />
          ) : (
            <LoadingAnimation />
          )}
        </CardComponent>
      </div>

      <div className={styles.bottom_div}>
        <div className={styles.width}>
          <ChartCardComponent
            title="Número de asistentes"
            header={
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Filtrar</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={selectedFilter}
                  onChange={handleFilterChange}
                  label="Filtrar"
                >
                  <MenuItem value="crop">Cultivo</MenuItem>
                  <MenuItem value="ejes">Eje</MenuItem>
                  <MenuItem value="city">Lugar</MenuItem>
                  <MenuItem value="institution">Institución</MenuItem>
                </Select>
              </FormControl>
            }
          >
            {treemapData.length > 0 ? (
            <ReactChart type="treemap" data={treeData} options={options} />
            ) : (<div className="flex w-full h-full items-center justify-center"><LoadingAnimation /></div>)}
          </ChartCardComponent>
        </div>

        <div className={styles.width}>
          <ChartCardComponent title="Asistentes por municipio" header={<></>}>
            <div className="w-full h-full">
              <MapComponent
                polygons={CalendarController.extractProvincesAndCities(filteredEvents)}
                data={counts}
              />
            </div>
          </ChartCardComponent>
        </div>
      </div>
    </div>
  );
};

export default AssistancePage;