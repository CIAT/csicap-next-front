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
import ChartCardComponent from "@/components/events/chartCard";
import CardComponent from "@/components/events/Card";
import LoadingAnimation from "@/components/loadingAnimation";
import { parseISO } from "date-fns";
import CalendarRepository from "@/helpers/Component/Repository/CalendarRepository";
import CalendarController from "@/helpers/Component/Controller/CalendarController";
import ExportDropdown from "@/components/download/DowloadDropDown/ExportDropdown";
import { PageCustomProps } from "@/interfaces/Components/PageCustomProps";
import { EventFormat } from "@/interfaces/Components/Events";
import EventsController from "@/helpers/Component/Controller/EventsController";
import CustomTooltip from "@/components/CustomTooltip/CustomTooltip";
import { CustomTooltipData } from "@/interfaces/Components/CustomTooltip";
import {
  filterFunctionsEvents,
  getUniqueValuesFunctionsEvents,
} from "@/interfaces/Components/CustomTooltipHandler";
import {
  handleOnClick,
  handleReset,
  handleTooltipChange,
} from "@/helpers/Component/CustomTooltip/CustomTooltipHandler";

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
function calculateEventStatus(events: EventFormat[]) {
  let finishedEvents = 0;
  let inProgressEvents = 0;
  let programmedEvents = 0;
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  events.forEach((EventFormat) => {
    // Validar si datesEnd es válido antes de parsearlo
    const eventEndDate = EventFormat.datesEnd
      ? parseISO(EventFormat.datesEnd)
      : null;

    if (EventFormat.form_state === "0") {
      // Si form_state es 0, cuenta como finalizado
      finishedEvents += 1;
    } else if (EventFormat.form_state === "1") {
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
function countEjes(events: EventFormat[]) {
  const ejeCount: { [key: string]: number } = {};
  let multiejeCount = 0;

  events.forEach((EventFormat) => {
    if (EventFormat.eje.length >= 2) {
      multiejeCount += 1;
    } else {
      EventFormat.eje.forEach((eje) => {
        ejeCount[eje] = (ejeCount[eje] || 0) + 1;
      });
    }
  });
  if (multiejeCount > 0) {
    ejeCount["Multi-Ejes"] = multiejeCount;
  }
  return ejeCount;
}

function countInstitutionsTreeMap(events: EventFormat[]) {
  const institutionCount: { [key: string]: number } = {};
  let multiInstitutionCount = 0;

  events.forEach((EventFormat) => {
    if (EventFormat.institution.length >= 2) {
      multiInstitutionCount += 1;
    } else {
      EventFormat.institution.forEach((institution) => {
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
function countInstitutions(events: EventFormat[]) {
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

  events.forEach((EventFormat) => {
    EventFormat.institution.forEach((institution) => {
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

function countCrop(events: EventFormat[]) {
  const cropCount: { [key: string]: number } = {};
  let multicultivoCount = 0;

  events.forEach((EventFormat) => {
    if (EventFormat.crop.length >= 2 || EventFormat.crop.includes("Todas")) {
      multicultivoCount += 1;
    } else {
      EventFormat.crop.forEach((crop) => {
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
function countCities(events: EventFormat[]) {
  const cityCount: { [key: string]: number } = {};

  events.forEach((EventFormat) => {
    cityCount[EventFormat.city] = (cityCount[EventFormat.city] || 0) + 1;
  });

  return cityCount;
}

// Count occurrences of each "guest_type"
function countGuestTypes(events: EventFormat[]) {
  const guestTypeCount: { [key: string]: number } = {};

  events.forEach((EventFormat) => {
    EventFormat.guess_type.forEach((guest) => {
      guestTypeCount[guest] = (guestTypeCount[guest] || 0) + 1;
    });
  });

  return guestTypeCount;
}

const EventPage: NextPage<PageCustomProps> = ({ customStyles }) => {
  const styles = customStyles || require("./events.module.css");

  const treemapChartTotalEventsId: string = "treemap_chart_total_events";
  const doughnutChartTotalEventsId: string = "doughnut_chart_total_events";
  const doughnutChartAxesByEventId: string = "doughnut_chart_axes_by_event";
  const doughnutChartGuestByEventId: string = "doughnut_chart_guest_by_event";
  const barChartInstitutionsId: string = "bar_chart_institutions";

  const [institutionData, setInstitutionData] = useState<number[]>([]);
  const [institutionLabels, setInstitutionLabels] = useState<string[]>([]);
  const [ejeData, setEjeData] = useState<number[]>([]);
  const [eventStatusData, setEventStatusData] = useState([0, 0]);
  const [guestTypeData, setGuestTypeData] = useState<number[]>([]);
  const [guestTypeLabels, setGuestTypeLabels] = useState<string[]>([]);
  const [treemapData, setTreemapData] = useState<
    { name: string; value: number }[]
  >([]);
  const [allEventData, setAllEventData] = useState<EventFormat[]>([]); // Store all EventFormat data once fetched
  const [tempEventData, setTempEventData] = useState<EventFormat[]>([]); // Store all EventFormat data once fetched
  const [fontSize, setFontSize] = useState(10); // Default font size

  const [componentState, setComponentState] = useState<CustomTooltipData[]>([]);
  const [axisState, setAxisState] = useState<CustomTooltipData[]>([]);
  const [institutionState, setInstitutionState] = useState<CustomTooltipData[]>(
    []
  );
  const [cropState, setCropState] = useState<CustomTooltipData[]>([]);
  const [departmentState, setDepartmentState] = useState<CustomTooltipData[]>(
    []
  );
  const [cityState, setCityState] = useState<CustomTooltipData[]>([]);
  const [gcfActivityState, setGCFActivityState] = useState<CustomTooltipData[]>(
    []
  );
  const [tooltipValues, setTooltipValues] = useState<Array<CustomTooltipData>>([
    {
      value: "",
      label: "Componente",
    },
    {
      value: "",
      label: "Eje",
    },
    {
      value: "",
      label: "Instituciones",
    },
    {
      value: "",
      label: "Cultivo",
    },
    {
      value: "",
      label: "Departamento",
    },
    {
      value: "",
      label: "Municipio",
    },
    {
      value: "",
      label: "Actividades GCF",
    },
  ]);
  const tooltipOptions: Array<CustomTooltipData[]> = [
    componentState,
    axisState,
    institutionState,
    cropState,
    departmentState,
    cityState,
    gcfActivityState,
  ];
  const setTooltipOptions: Array<
    React.Dispatch<React.SetStateAction<CustomTooltipData[]>>
  > = [
    setComponentState,
    setAxisState,
    setInstitutionState,
    setCropState,
    setDepartmentState,
    setCityState,
    setGCFActivityState,
  ];
  const filterTypes = [
    "component",
    "axis",
    "institution",
    "crop",
    "department",
    "city",
    "gcfActivity",
  ];
  const placeHolders = [
    "Componente",
    "Eje",
    "Instituciones",
    "Cultivo",
    "Departamento",
    "Municipio",
    "Actividades GCF",
  ];

  useEffect(() => {
    async function fetchAndProcessData() {
      const dataset = await CalendarRepository.fetchCustomEvent();
      const formattedEvents = CalendarController.formatEvent(dataset);

      const uniqueComponents = EventsController.getUniqueValues(
        formattedEvents,
        "component",
        true
      );
      const uniqueAxis = EventsController.getUniqueValues(
        formattedEvents,
        "eje",
        true
      );
      const uniqueInstitutions = EventsController.getUniqueValues(
        formattedEvents,
        "institution",
        true
      );
      const uniqueCrops = EventsController.getUniqueValues(
        formattedEvents,
        "crop",
        true
      );
      const uniqueDepartments = EventsController.getUniqueValues(
        formattedEvents,
        "province"
      );
      const uniqueCities = EventsController.getUniqueValues(
        formattedEvents,
        "city"
      );
      const uniqueGCFActivities = EventsController.getUniqueValues(
        formattedEvents,
        "gcf_activities",
        true
      );

      setAllEventData(formattedEvents);
      setTempEventData(formattedEvents);
      setComponentState([...uniqueComponents]);
      setAxisState([...uniqueAxis]);
      setInstitutionState([...uniqueInstitutions]);
      setCropState([...uniqueCrops]);
      setDepartmentState([...uniqueDepartments]);
      setCityState([...uniqueCities]);
      setGCFActivityState([...uniqueGCFActivities]);

      processChartData();
    }

    fetchAndProcessData();
  }, []);

  useEffect(() => {
    const getFontSize = () => {
      if (window.innerWidth > 2000) {
        return 20; // Larger font size for larger screens
      } else {
        return 10; // Default font size
      }
    };

    const handleResize = () => {
      setFontSize(getFontSize());
    };

    // Set initial font size
    setFontSize(getFontSize());

    // Add EventFormat listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup EventFormat listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const initializeTreemapData = (data: EventFormat[]) => {
    let filterData = countCrop(data); // Usar countCrop en lugar de countCrops
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
        label: "EventFormat Status",
        data: eventStatusData,
        backgroundColor: ["#80C41C", "#c84e42", "#FECF00"],
        hoverBackgroundColor: ["#80C41C", "#c84e42", "#FECF00"],
      },
    ],
  };

  const ejeCounts: { [key: string]: number } = {};
  tempEventData.forEach((EventFormat) => {
    if (EventFormat.eje && Array.isArray(EventFormat.eje)) {
      EventFormat.eje.forEach((eje) => {
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

  useEffect(() => {
    processChartData();
  }, [tempEventData]);

  const processChartData = () => {
    initializeTreemapData(tempEventData);

    // Calculate finished/in-progress events
    const { finishedEvents, inProgressEvents, programmedEvents } =
      calculateEventStatus(tempEventData);
    setEventStatusData([finishedEvents, inProgressEvents, programmedEvents]);

    // Calculate eje counts
    const ejeCount = countEjes(tempEventData);
    setEjeData(Object.values(ejeCount));

    // Calculate institution counts
    const institutionCount = countInstitutions(tempEventData);
    setInstitutionLabels(Object.keys(institutionCount));
    setInstitutionData(Object.values(institutionCount));
    const guestTypeCount = countGuestTypes(tempEventData);
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

  return (
    <div className={styles.event_page}>
      <CustomTooltip
        options={tooltipOptions}
        values={tooltipValues}
        onChange={(selectedValue, filterType) =>
          handleTooltipChange(
            selectedValue,
            filterType,
            tempEventData,
            setTooltipOptions,
            tooltipValues,
            setTooltipValues,
            filterFunctionsEvents,
            getUniqueValuesFunctionsEvents(),
            filterTypes
          )
        }
        onClick={() =>
          handleOnClick(
            tooltipValues,
            tempEventData,
            setTempEventData,
            filterFunctionsEvents,
            filterTypes
          )
        }
        onReset={() =>
          handleReset(
            allEventData,
            setTooltipOptions,
            setTooltipValues,
            setTempEventData,
            getUniqueValuesFunctionsEvents(),
            placeHolders
          )
        }
        placeholders={placeHolders}
        filterTypes={filterTypes}
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => String(option.value)}
      />
      <div style={{display:"flex", flexDirection:"row", height:"100vh"}}>
        <div className={styles.div}>
          <ChartCardComponent
            title="Número de eventos"
            header={
              <div className={styles.header_container}>
                <ExportDropdown chartId={treemapChartTotalEventsId} />
              </div>
            }
          >
            {treemapData.length > 0 ? (
              <ReactChart
                id={treemapChartTotalEventsId}
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
          <CardComponent title="Total Eventos" id={doughnutChartTotalEventsId}>
            <div className="w-full h-full">
              {tempEventData.length > 0 ? (
                <Doughnut
                  id={doughnutChartTotalEventsId}
                  data={eventsTotal}
                  options={config2}
                />
              ) : (
                <LoadingAnimation />
              )}
            </div>
          </CardComponent>
          <CardComponent
            title="Ejes por evento"
            id={doughnutChartAxesByEventId}
          >
            <div className="w-full h-full">
              {tempEventData.length > 0 ? (
                <Doughnut
                  id={doughnutChartAxesByEventId}
                  data={ejesChartData}
                  options={config2}
                />
              ) : (
                <LoadingAnimation />
              )}
            </div>
          </CardComponent>
          <CardComponent
            title="Tipo de invitados por evento"
            id={doughnutChartGuestByEventId}
          >
            <div className="w-full h-full">
              {tempEventData.length > 0 ? (
                <Doughnut
                  id={doughnutChartGuestByEventId}
                  data={guestTypesChartData}
                  options={config2}
                />
              ) : (
                <LoadingAnimation />
              )}
            </div>
          </CardComponent>
          <CardComponent
            title="Instituciones organizadoras"
            id={barChartInstitutionsId}
          >
            <div className="w-full h-full">
              {tempEventData.length > 0 ? (
                <Bar
                  id={barChartInstitutionsId}
                  data={institutionsChartData}
                  options={barChartOptions}
                />
              ) : (
                <LoadingAnimation />
              )}
            </div>
          </CardComponent>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
