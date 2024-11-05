"use client";

import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart as ReactChart } from "react-chartjs-2";
import {
  Chart,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  BarElement,
  LinearScale,
} from "chart.js";
import { TreemapController, TreemapElement } from "chartjs-chart-treemap";
import styles from "./events.module.css";
import ChartCardComponent from "@/components/events/chartCard";
import CardComponent from "@/components/events/Card";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import LoadingAnimation from "@/components/loadingAnimation";
import { parseISO } from "date-fns";
import CalendarRepository from "@/helpers/Component/Repository/CalendarRepository";
import {
  DataFormat,
  EventsData,
} from "@/interfaces/Components/CalendarComponent";
import CalendarController from "@/helpers/Component/Controller/CalendarController";

interface Event {
  date: string;
  eje: string[];
  responsable: string;
  city: string;
  guess_type: string[];
  institution: string[];
  event_type: string;
  province: string;
  form_state: string;
  name: string;
  datesEnd: string;
  crop: string[];
  email: string | null;
  event_objective: string;
  event_id: string;
}

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
  "Inclusión social y de género",
];

const LabelsParticipants = [
  "Productoras/es agropecuarios",
  "Trabajadoras/es de entidades públicas",
  "Estudiantes",
  "Profesoras/es",
  "Técnicos/Profesionales",
  "Investigadores",
  "Otro",
];

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

// Calculate finished, in-progress, and programmed events based on form_state and datesEnd
function calculateEventStatus(events: Event[]) {
  let finishedEvents = 0;
  let inProgressEvents = 0;
  let programmedEvents = 0;
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  events.forEach((event) => {
    // Validar si datesEnd es válido antes de parsearlo
    const eventEndDate = event.datesEnd ? parseISO(event.datesEnd) : null;

    if (event.form_state === "0") {
      // Si form_state es 0, cuenta como finalizado
      finishedEvents += 1;
    } else if (event.form_state === "1") {
      // Si form_state es 1, revisar la fecha si está presente
      if (eventEndDate && eventEndDate >= currentDate) {
        programmedEvents += 1;
      } else {
        // Eventos sin cerrar o sin fecha válida
        inProgressEvents += 1;
      }
    }
  });

  return { finishedEvents, inProgressEvents, programmedEvents };
}

// Count occurrences of each "eje"
function countEjes(events: Event[]) {
  const ejeCount: { [key: string]: number } = {};
  let multiejeCount = 0;

  events.forEach((event) => {
    if (event.eje.length >= 2) {
      multiejeCount += 1;
    } else {
      event.eje.forEach((eje) => {
        ejeCount[eje] = (ejeCount[eje] || 0) + 1;
      });
    }
  });
  if (multiejeCount > 0) {
    ejeCount["Multi-Ejes"] = multiejeCount;
  }
  return ejeCount;
}

function countInstitutionsTreeMap(events: Event[]) {
  const institutionCount: { [key: string]: number } = {};
  let multiInstitutionCount = 0;

  events.forEach((event) => {
    if (event.institution.length >= 2) {
      multiInstitutionCount += 1;
    } else {
      event.institution.forEach((institution) => {
        institutionCount[institution] =
          (institutionCount[institution] || 0) + 1;
      });
    }
  });
  if (multiInstitutionCount > 0) {
    institutionCount["Multi-Institucional"] = multiInstitutionCount;
  }
  return institutionCount;
}

// Count occurrences of each "institution"
function countInstitutions(events: Event[]) {
  const predefinedInstitutions = new Set([
    "CIMMYT",
    "CIAT (Alianza Bioversity-CIAT)",
    "AGROSAVIA",
    "FEDEARROZ",
    "FEDEPAPA",
    "AUGURA",
    "FEDEGAN",
    "FEDEPANELA",
    "CIPAV",
    "CENICAFE",
    "MADR",
    "FENALCE",
    "ASBAMA",
    "CENICAÑA",
    "FEDECAFE",
  ]);

  const institutionCount: { [key: string]: number } = {
    Otras: 0,
  };

  events.forEach((event) => {
    event.institution.forEach((institution) => {
      if (predefinedInstitutions.has(institution)) {
        institutionCount[institution] =
          (institutionCount[institution] || 0) + 1;
      } else {
        institutionCount["Otras"] += 1;
      }
    });
  });

  return institutionCount;
}

function countCrop(events: Event[]) {
  const cropCount: { [key: string]: number } = {};
  let multicultivoCount = 0;

  events.forEach((event) => {
    if (event.crop.length >= 2 || event.crop.includes("Todas")) {
      multicultivoCount += 1;
    } else {
      event.crop.forEach((crop) => {
        cropCount[crop] = (cropCount[crop] || 0) + 1;
      });
    }
  });
  // Añadir el conteo de multicultivos al objeto cropCount
  if (multicultivoCount > 0) {
    cropCount["Multi-Cultivos"] = multicultivoCount;
  }
  return cropCount;
}

// Count occurrences for cities
function countCities(events: Event[]) {
  const cityCount: { [key: string]: number } = {};

  events.forEach((event) => {
    cityCount[event.city] = (cityCount[event.city] || 0) + 1;
  });

  return cityCount;
}

// Count occurrences of each "guest_type"
function countGuestTypes(events: Event[]) {
  const guestTypeCount: { [key: string]: number } = {};

  events.forEach((event) => {
    event.guess_type.forEach((guest) => {
      guestTypeCount[guest] = (guestTypeCount[guest] || 0) + 1;
    });
  });

  return guestTypeCount;
}

const EventPage: NextPage = () => {
  const [institutionData, setInstitutionData] = useState<number[]>([]);
  const [institutionLabels, setInstitutionLabels] = useState<string[]>([]);
  const [ejeData, setEjeData] = useState<number[]>([]);
  const [eventStatusData, setEventStatusData] = useState([0, 0]);
  const [guestTypeData, setGuestTypeData] = useState<number[]>([]);
  const [guestTypeLabels, setGuestTypeLabels] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("crop");
  const [treemapData, setTreemapData] = useState<
    { name: string; value: number }[]
  >([]);
  const [allEventData, setAllEventData] = useState<Event[]>([]); // Store all event data once fetched
  const [fontSize, setFontSize] = useState(10); // Default font size

  const handleFilterChange = (event: SelectChangeEvent) => {
    const newFilter = event.target.value;
    setSelectedFilter(newFilter);
    processTreemapData(newFilter, allEventData); // Use the stored event data
  };

  useEffect(() => {
    async function fetchAndProcessData() {
      const dataset = await CalendarRepository.fetchCustomEvent();
      setAllEventData(CalendarController.formatEvent(dataset));

      initializeTreemapData(dataset.data);

      // Calculate finished/in-progress events
      const { finishedEvents, inProgressEvents, programmedEvents } = calculateEventStatus(dataset.data);
      setEventStatusData([finishedEvents, inProgressEvents, programmedEvents]);

      // Calculate eje counts
      const ejeCount = countEjes(dataset.data);
      setEjeData(Object.values(ejeCount));

      // Calculate institution counts
      const institutionCount = countInstitutions(dataset.data);
      setInstitutionLabels(Object.keys(institutionCount));
      setInstitutionData(Object.values(institutionCount));
      const guestTypeCount = countGuestTypes(dataset.data);
      let guestTypeLabels = Object.keys(guestTypeCount);
      let guestTypeData = Object.values(guestTypeCount);
      guestTypeLabels.push("Otro");
      guestTypeData.push(0);
      if (guestTypeData[guestTypeData.length - 1] === undefined) {
        guestTypeData.push(0);
      }

      for (let i = guestTypeLabels.length - 1; i >= 0; i--) {
        const label = guestTypeLabels[i];

        if (!LabelsParticipants.includes(label)) {
          guestTypeData[guestTypeData.length - 1] += guestTypeData[i];
          guestTypeLabels.splice(i, 1);
          guestTypeData.splice(i, 1);
        }
      }

      setGuestTypeLabels(guestTypeLabels);
      setGuestTypeData(guestTypeData);
    }

    fetchAndProcessData();
  }, []);

  useEffect(() => {
    const getFontSize = () => {
      if (window.innerWidth > 2000) {
        return 12; // Larger font size for larger screens
      } else {
        return 10; // Default font size
      }
    };

    const handleResize = () => {
      setFontSize(getFontSize());
    };

    // Set initial font size
    setFontSize(getFontSize());

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const initializeTreemapData = (data: Event[]) => {
    let filterData = countCrop(data); // Usar countCrop en lugar de countCrops
    const mappedData = Object.keys(filterData).map((key) => ({
      name: key,
      value: filterData[key],
    }));
    setTreemapData(mappedData);
  };

  const processTreemapData = (filter: string, data: Event[]) => {
    let filterData: { [key: string]: number } = {};

    switch (filter) {
      case "crop":
        filterData = countCrop(data); // Usar countCrop en lugar de countCrops
        break;
      case "ejes":
        filterData = countEjes(data);
        break;
      case "city":
        filterData = countCities(data);
        break;
      case "institution":
        filterData = countInstitutionsTreeMap(data);
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

  const treemapChartData = {
    datasets: [
      {
        data: [],
        tree: treemapData,
        key: "value",
        groups: ["name"],
        backgroundColor: (ctx: { dataIndex: number }) => {
          return colors[ctx.dataIndex % colors.length]; // Reuse colors array
        },
        borderColor: "rgba(0,0,0,0.1)",
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
            const label =
              shortenedLabels.find((label) =>
                label.startsWith(data.g.slice(0, 1))
              ) || data.g;
            return `${label}: ${data.v}`;
          },
        },
      },
    ],
  };

  const institutionsChartData = {
    labels: institutionLabels,
    datasets: [
      {
        label: "Instituciones participantes",
        data: institutionData,
        backgroundColor: colors.slice(0, institutionLabels.length), // Use colors array
        borderColor: colors.slice(0, institutionLabels.length),
        borderWidth: 1,
      },
    ],
  };

  const eventsTotal = {
    labels: [
      "Eventos Finalizados",
      "Eventos sin Cerrar",
      "Eventos Programados",
    ],
    datasets: [
      {
        label: "Event Status",
        data: eventStatusData, // Dynamically set the data here
        backgroundColor: ["#80C41C", "#c84e42", "#FECF00"],
        hoverBackgroundColor: ["#80C41C", "#c84e42", "#FECF00"],
      },
    ],
  };
  const ejeCounts: { [key: string]: number } = {};
  allEventData.forEach((event) => {
    if (event.eje && Array.isArray(event.eje)) {
      event.eje.forEach((eje) => {
        ejeCounts[eje] = (ejeCounts[eje] || 0) + 1;
      });
    }
  });

  let labelsDoughnutEvent = [];
  let dataDoughnutEvent = [];
  let replacedEjeCounts: { [key: string]: number } = {};

  for (let key in ejeCounts) {
    let matchedLabel = shortenedLabels.find((label) =>
      key.toLowerCase().startsWith(label.split("-")[0].toLowerCase())
    );

    if (matchedLabel) {
      replacedEjeCounts[matchedLabel] = ejeCounts[key];
    } else {
      replacedEjeCounts[key] = ejeCounts[key];
    }
  }

  for (let key in replacedEjeCounts) {
    if (replacedEjeCounts.hasOwnProperty(key)) {
      labelsDoughnutEvent.push(key);
      dataDoughnutEvent.push(replacedEjeCounts[key]);
    }
  }

  const ejesChartData = {
    labels: labelsDoughnutEvent, // Use shortened labels for both display and tooltips
    datasets: [
      {
        label: "Eje Count",
        data: dataDoughnutEvent,
        backgroundColor: colors.slice(0, dataDoughnutEvent.length), // Reuse colors for background
        hoverBackgroundColor: colors.slice(0, dataDoughnutEvent.length), // Reuse colors for hover
      },
    ],
  };

  const guestTypesChartData = {
    labels: guestTypeLabels,
    datasets: [
      {
        label: "Tipo de participantes",
        data: guestTypeData,
        backgroundColor: colors.slice(0, guestTypeLabels.length),
        hoverBackgroundColor: colors.slice(0, guestTypeLabels.length),
      },
    ],
  };

  const config2 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          boxWidth: 10,
          padding: 3,
          font: {
            size: fontSize,
          },
          usePointStyle: true,
        },
        position: "bottom" as const,
      },
      tooltip: {
        callbacks: {
          title: function () {
            return "";
          },
          label: function (tooltipItem: any) {
            const index = tooltipItem.dataIndex;
            return `${tooltipItem.label}: ${tooltipItem.raw}`; // Show the label from the data
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
            const label =
              shortenedLabels.find((label) =>
                label.startsWith(data.g.slice(0, 1))
              ) || data.g;
            return `${label}: ${data.v}`;
          },
        },
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        ticks: {
          // Cambia el tamaño de la fuente
          font: {
            size: 10, 
          },
          // Aplica rotación a las etiquetas
          maxRotation: 90, 
          minRotation: 90,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
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

  return (
    <div className={styles.event_page}>
      <div className={styles.div}>
        <ChartCardComponent
          title="Número de eventos"
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
            <ReactChart
              type="treemap"
              data={treemapChartData}
              options={options}
            />
          ) : (
            <LoadingAnimation />
          )}
        </ChartCardComponent>
      </div>

      <div className={styles.card_container}>
        <CardComponent title="Total Eventos">
          <div className="w-full h-full">
            {allEventData.length > 0 ? (
              <Doughnut data={eventsTotal} options={config2} />
            ) : (
              <LoadingAnimation />
            )}
          </div>
        </CardComponent>
        <CardComponent title="Ejes por evento">
          <div className="w-full h-full">
            {allEventData.length > 0 ? (
              <Doughnut data={ejesChartData} options={config2} />
            ) : (
              <LoadingAnimation />
            )}
          </div>
        </CardComponent>
        <CardComponent title="Tipo de invitados por evento">
          <div className="w-full h-full">
            {allEventData.length > 0 ? (
              <Doughnut data={guestTypesChartData} options={config2} />
            ) : (
              <LoadingAnimation />
            )}
          </div>
        </CardComponent>
        <CardComponent title="Instituciones organizadoras">
          <div className="w-full h-full">
            {allEventData.length > 0 ? (
              <Bar data={institutionsChartData} options={barChartOptions} />
            ) : (
              <LoadingAnimation />
            )}
          </div>
        </CardComponent>
      </div>
    </div>
  );
};

export default EventPage;
