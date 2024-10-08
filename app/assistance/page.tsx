"use client";

import {NextPage} from "next";
import styles from "./assistance.module.css";
import styleTechnical from "./assistance.module.css";
import CardComponent from "@/components/ui/card/Card";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend as LegendPlugin,
  LinearScale,
  Title as TitlePlugin,
  Tooltip as TooltipPlugin,
} from "chart.js";
import {Doughnut} from "react-chartjs-2";
import {TreemapController, TreemapElement} from "chartjs-chart-treemap";
import ChartCardComponent from "@/components/events/chartCard";
import MapComponent from "@/components/data/Map/MapComponent";
import CalendarController from "@/helpers/Component/Controller/CalendarController";
import {useEffect, useState} from "react";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent,} from "@mui/material";
import LoadingAnimation from "@/components/loadingAnimation";
import {DataFormat, EventsData} from "@/interfaces";
import CalendarRepository from "@/helpers/Component/Repository/CalendarRepository";
import MapController from "@/helpers/Component/Controller/MapController";
import {NestedDictionary} from "@/interfaces/Map/NestedDictionary";
import {Assistance} from "@/interfaces/Components/AssistanceComponent";
import AssistanceRepository from "@/helpers/Component/Repository/AssistanceRepository";

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

async function getEventsData(): Promise<DataFormat> {
  return CalendarRepository.fetchEvents();
}

// async function getAssistanceData(): Promise<Assistance[]> {
//   try {
//     const response = await fetch(
//       "https://1my60gpxj7.execute-api.us-east-1.amazonaws.com/assistence-list"
//     );
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const json = await response.json();

//     // Ensure the response contains the expected "data" array
//     if (json && Array.isArray(json)) {
//       return json;
//     } else {
//       console.log("API returned unexpected structure.");
//       return [];
//     }
//   } catch (error) {
//     console.error("Failed to fetch data:", error);
//     return [];
//   }
// }

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

// const config2 = {
//   responsive: true,
//   maintainAspectRatio: false,
//   plugins: {
//     legend: {
//       labels: {
//         font: {
//           size: 10,
//         },
//         usePointStyle: true,
//       },
//       position: "right" as const,
//     },
//   },
//   title: {
//     display: true,
//   },
// };

// const config3 = {
//   responsive: true,
//   maintainAspectRatio: false,
//   plugins: {
//     legend: {
//       labels: {
//         font: {
//           size: 6,
//         },
//         usePointStyle: true,
//       },
//       position: "right" as const,
//     },
//   },
// };

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
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [allAssistanceData, setAllAssistanceData] = useState<Assistance[]>([]);

  useEffect(() => {

  }, []);

  useEffect(() => {
    CalendarRepository.fetchEvents()
        .then((data: DataFormat) => {
          const formattedEvents = CalendarController.formatEvents(data).map(event => ({
            ...event,
            city: event.city.toLowerCase(),
          }));
          setCounts(MapController.updateCountAssistantsByGender(formattedEvents));
          console.log("counts", counts)
          setEvents(formattedEvents);
          setFilteredEvents(formattedEvents);
        })
        .catch(error => {
          console.error("Error fetching events:", error);
        });

    async function fetchData() {
      const dataset =  await AssistanceRepository.getAssistanceData();
      setAllAssistanceData(dataset);
      console.log("Assistance data:", dataset);
      proccesdata();
      // initializeTreemapData(dataset.data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (allAssistanceData.length > 0) {
      proccesdata(); // Call your processing function once data is available
    }
  }, [allAssistanceData]);

  function proccesdata() {
    let ageCount: { [key: string]: number } = {
      "20-25": 0,
      "26-30": 0,
      "31-40": 0,
      "41-50": 0,
      "51+": 0,
      "N/N": 0, // For invalid or missing ages
    };

    let occupationCount: { [key: string]: number } = {
      "Tecnico/profesional": 0,
      "Productor(a) agropecuario(a)": 0,
      "Investigador(a)": 0,
      Otro: 0, // Initialize "Otro" to count any null or undefined occupations
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
        occupationCount["Otro"]++; // Increment "Otro" for null/undefined occupations
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
        ageCount["N/N"]++; // Count as "N/N" if age is not available
      }
    });
  
    // Update state with the counts
    setTotalAssistants(allAssistanceData.length);
    setGenderStats({ men: menCount, women: womenCount, other: otherCount });
    setAgeStats(ageCount);
    setOccupationStats(occupationCount);
  }


  const handleFilterChange = (event: SelectChangeEvent) => {
    const newFilter = event.target.value;
    setSelectedFilter(newFilter);
    processTreemapData(newFilter, allAssistanceData); // Use the stored event data
  };

  const processTreemapData = (filter: string, data: Assistance[]) => {
    let filterData: { [key: string]: number } = {};

    switch (filter) {
      case "crop":
        // filterData = countCrops(data);
        break;
      case "ejes":
        // filterData = countEjes(data);
        break;
      case "city":
        // filterData = countCities(data);
        break;
      case "institution":
        // filterData = countInstitutions(data);
        break;
      default:
        return;
    }

    // Create treemap data
    const mappedData = Object.keys(filterData).map((key) => ({
      name: key,
      value: filterData[key],
    }));
    setTreemapData(mappedData);
  };

  // const initializeTreemapData = (data: Assistance[]) => {
  //   let filterData = countCrops(data);
  //   const mappedData = Object.keys(filterData).map((key) => ({
  //     name: key,
  //     value: filterData[key],
  //   }));
  //   setTreemapData(mappedData);
  // };

  const occupationBackgroundColors = Object.keys(occupationStats).map(
    (_, index) => colors[index % colors.length]
  );

  const occupationBorderColors = Object.keys(occupationStats).map(
    (_, index) => borderColors[index % borderColors.length]
  );

  const treeData = {
    datasets: [
      {
        // Se requiere la propiedad `data` aunque esté vacía
        data: treemapData, // Obligatorio para Chart.js
        key: "value",
        groups: ["name"],
        backgroundColor: (ctx: { dataIndex: number }) => {
          return colors[ctx.dataIndex % colors.length]; // Reuse colors array
        },
        borderColor: "rgba(0,0,0,0.1)",
      },
    ],
  };

  const ageChartData = {
    labels: ["20-25", "26-30", "31-40", "41-50", "51+", "N/N"],
    datasets: [
      {
        label: "Distribución de Edad",
        data: Object.values(ageStats), // Use age group counts
        backgroundColor: occupationBackgroundColors,
        borderColor: occupationBorderColors,
      },
    ],
  };

  const occupationChartData = {
    labels: Object.keys(occupationStats), // Use occupation types as labels
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
          <CardComponent title="Ocupacion" styles={styleTechnical}>
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
            title="TreeMap"
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
            {/* <ReactChart type="treemap" data={treeData} options={options} /> */}
            <LoadingAnimation/>
          </ChartCardComponent>
        </div>

        <div className={styles.width}>
          <ChartCardComponent title="Mapa Colombia" header={<></>}>
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
