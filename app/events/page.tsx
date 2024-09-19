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
  const [ejeLabels, setEjeLabels] = useState<string[]>([]);
  const [eventStatusData, setEventStatusData] = useState([0, 0]);
  const [guestTypeData, setGuestTypeData] = useState<number[]>([]);
  const [guestTypeLabels, setGuestTypeLabels] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("crop");
  const [treemapData, setTreemapData] = useState<
    { name: string; value: number }[]
  >([]);
  const [allEventData, setAllEventData] = useState<Event[]>([]); // Store all event data once fetched

  // // Initialize treemap data with crop data on component mount and on filter change
  // useEffect(() => {
  //   async function fetchTreemapData() {
  //     let filterData: { [key: string]: number } = {};

  //     // Count based on the selected filter
  //     if (selectedFilter === "crop") {
  //       filterData = countCrops(dataset.data);
  //     } else if (selectedFilter === "ejes") {
  //       filterData = countEjes(dataset.data);
  //     } else if (selectedFilter === "city") {
  //       filterData = countCities(dataset.data);
  //     } else if (selectedFilter === "institution") {
  //       filterData = countInstitutions(dataset.data);
  //     }

  //     // Map the filter data to the treemap structure
  //     const mappedData = Object.keys(filterData).map((key) => ({
  //       name: key,
  //       value: filterData[key],
  //     }));

  //     setTreemapData(mappedData);
  //     console.log(mappedData)
  //   }
  //   fetchTreemapData();
  //   console.log("holi");
  // }, [selectedFilter]); // Trigger when selectedFilter changes

  // Handle filter change
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
      setEjeLabels(Object.keys(ejeCount));
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
    labels: ejeLabels, // Names of the ejes
    datasets: [
      {
        label: "Eje Count",
        data: ejeData, // Number of occurrences
        backgroundColor: [
          "#4CAF50",
          "#FFCE56",
          "#36A2EB",
          "#FF6384",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#45a049",
          "#FFC107",
          "#36A2EB",
          "#FF6384",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  // Doughnut chart for guest type count
  const guestTypesChartData = {
    labels: guestTypeLabels, // Names of guest types
    datasets: [
      {
        label: "Tipo de participantes",
        data: guestTypeData, // Number of occurrences
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
          usePointStyle: true, // Use point style but without the outline
          generateLabels: function (chart: any) {
            // Get the labels dynamically from the datasets (like "ejes", "institutions")
            const labels = chart.data.labels.map(
              (label: string, index: number) => {
                return {
                  text: label, // No wrapping, just use the label as is
                  fillStyle: chart.data.datasets[0].backgroundColor[index], // Use the correct color
                  strokeStyle: "", // Remove any outline by setting no stroke color
                  lineWidth: 0, // Ensure no border width is applied
                  hidden: chart.getDatasetMeta(0).data[index].hidden, // Handle hidden states
                  datasetIndex: index,
                };
              }
            );

            // Sort labels alphabetically by 'text'
            labels.sort((a: { text: string }, b: { text: string }) =>
              a.text.localeCompare(b.text)
            );

            return labels;
          },
        },
        position: "bottom" as const,
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
