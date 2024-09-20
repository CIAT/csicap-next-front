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
import { wrap } from "module";

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
];

async function getEventData(): Promise<{ data: Event[] }> {
  const response = await fetch(
    "https://qhl00jvv1b.execute-api.us-east-1.amazonaws.com/dev/get-events"
  );
  const data = await response.json();
  return data;
}

// Calculate finished and in-progress events based on their dates
function calculateEventStatus(events: Event[]) {
  let finishedEvents = 0;
  let inProgressEvents = 0;
  const currentDate = new Date();

  events.forEach((event) => {
    const eventEndDate = new Date(event.datesEnd);
    if (eventEndDate < currentDate) {
      finishedEvents += 1;
    } else {
      inProgressEvents += 1;
    }
  });

  return { finishedEvents, inProgressEvents };
}

// Count occurrences of each "eje"
function countEjes(events: Event[]) {
  const ejeCount: { [key: string]: number } = {};

  events.forEach((event) => {
    event.eje.forEach((eje) => {
      ejeCount[eje] = (ejeCount[eje] || 0) + 1;
    });
  });

  return ejeCount;
}

// Count occurrences of each "institution"
function countInstitutions(events: Event[]) {
  const institutionCount: { [key: string]: number } = {};

  events.forEach((event) => {
    event.institution.forEach((institution) => {
      institutionCount[institution] = (institutionCount[institution] || 0) + 1;
    });
  });

  return institutionCount;
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

// Count occurrences for cities
function countCities(events: Event[]) {
  const cityCount: { [key: string]: number } = {};

  events.forEach((event) => {
    cityCount[event.city] = (cityCount[event.city] || 0) + 1;
  });

  return cityCount;
}

// Count occurrences for crops
function countCrops(events: Event[]) {
  const cropCount: { [key: string]: number } = {};

  events.forEach((event) => {
    event.crop.forEach((crop) => {
      cropCount[crop] = (cropCount[crop] || 0) + 1;
    });
  });

  return cropCount;
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


  const handleFilterChange = (event: SelectChangeEvent) => {
    const newFilter = event.target.value;
    setSelectedFilter(newFilter);
    processTreemapData(newFilter, allEventData); // Use the stored event data
  };

  useEffect(() => {
    async function fetchAndProcessData() {
      const dataset = await getEventData();

      // Calculate finished/in-progress events
      const { finishedEvents, inProgressEvents } = calculateEventStatus(
        dataset.data
      );
      setEventStatusData([finishedEvents, inProgressEvents]);

      // Calculate eje counts
      const ejeCount = countEjes(dataset.data);
      setEjeData(Object.values(ejeCount));

      // Calculate institution counts
      const institutionCount = countInstitutions(dataset.data);
      setInstitutionLabels(Object.keys(institutionCount));
      setInstitutionData(Object.values(institutionCount));

      // Calculate guest type counts
      const guestTypeCount = countGuestTypes(dataset.data);
      setGuestTypeLabels(Object.keys(guestTypeCount));
      setGuestTypeData(Object.values(guestTypeCount));
    }

    fetchAndProcessData();
  }, []);

  
  useEffect(() => {
    async function fetchData() {
      const dataset = await getEventData();
      setAllEventData(dataset.data); // Store all data for reuse
      initializeTreemapData(dataset.data); // Initialize treemap with default "crop" data
    }

    fetchData();
  }, []);


  const initializeTreemapData = (data: Event[]) => {
    let filterData = countCrops(data); // Using "crop" as the default filter
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
        filterData = countCrops(data);
        break;
      case "ejes":
        filterData = countEjes(data);
        break;
      case "city":
        filterData = countCities(data);
        break;
      case "institution":
        filterData = countInstitutions(data);
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

  const treemapChartData = {
    datasets: [
      {
        data: [],
        tree: treemapData,
        key: "value",
        groups: ["name"],
        backgroundColor: (ctx: { dataIndex: number }) => {
          const colors = [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
          ];
          return colors[ctx.dataIndex % colors.length];
        },
        borderColor: "rgba(0,0,0,0.1)",
      },
    ],
  };

  const institutionsChartData = {
    labels: institutionLabels,
    datasets: [
      {
        label: "Instituciones participantes",
        data: institutionData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const eventsTotal = {
    labels: ["Completado", "En progreso"],
    datasets: [
      {
        label: "Event Status",
        data: eventStatusData, // Dynamically set the data here
        backgroundColor: ["#4CAF50", "#FFCE56"],
        hoverBackgroundColor: ["#45a049", "#FFC107"],
      },
    ],
  };

  const ejesChartData = {
    labels: shortenedLabels, // Use shortened labels for both display and tooltips
    datasets: [
      {
        label: "Eje Count",
        data: ejeData, 
        backgroundColor: [
          "#4CAF50",
          "#FFCE56",
          "#36A2EB",
          "#FF6384",
          "#9966FF",
          "#FF9F40",
          "#FF6384",
          "#36A2EB",
          "#4BC0C0",
        ],
        hoverBackgroundColor: [
          "#45a049",
          "#FFC107",
          "#36A2EB",
          "#FF6384",
          "#9966FF",
          "#FF9F40",
          "#FF6384",
          "#36A2EB",
          "#4BC0C0",
        ],
      },
    ],
  };

  const guestTypesChartData = {
    labels: guestTypeLabels, 
    datasets: [
      {
        label: "Tipo de participantes",
        data: guestTypeData, 
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const config = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          boxWidth: 10,
          padding: 3,
          font: {
            size: 10,
          },
          usePointStyle: true,
        },
        position: "bottom" as const,
      },
    },
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
            size: 7.5,
          },
          usePointStyle: true,
        },
        position: "bottom" as const,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            const index = tooltipItem.dataIndex;
            return `${shortenedLabels[index]}: ${tooltipItem.raw}`; // Show shortened label in the tooltip
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
          label: (context: any) => {
            const data = context.dataset.tree[context.dataIndex];
            return `${data.name}: ${data.value}`;
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
    },
    plugins: {
      legend: {
        display: false, // Asegúrate de usar un valor válido
      },
    },
  };

  return (
    <div className={styles.event_page}>
      <div className={styles.div}>
        <ChartCardComponent
          title="Numero de eventos por cultivos"
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
            <ReactChart type="treemap" data={treemapChartData} options={options} />
          ) : (
            <div className="flex justify-center items-center h-full">Seleccione un filtro para ver los datos</div>
          )}
        </ChartCardComponent>
      </div>

      <div className={styles.card_container}>
        <CardComponent title="Total Eventos">
          <div className="w-full h-full">
            <Doughnut data={eventsTotal} options={config} />
          </div>
        </CardComponent>
        <CardComponent title="Ejes por evento">
          <div className="w-full h-full">
            <Doughnut data={ejesChartData} options={config2} />
          </div>
        </CardComponent>
        <CardComponent title="Tipo de Participantes por evento">
          <div className="w-full h-full">
            <Doughnut data={guestTypesChartData} options={config} />
          </div>
        </CardComponent>
        <CardComponent title="Instituciones participantes">
          <div className="w-full h-full">
            <Bar data={institutionsChartData} options={barChartOptions} />
          </div>
        </CardComponent>
      </div>
    </div>
  );
};

export default EventPage;
