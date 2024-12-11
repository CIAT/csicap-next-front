"use client";

import { NextPage } from "next";
import styles from "./professionals.module.css";
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
import React, { useEffect, useState } from "react";
import TechnicalRepository from "@/helpers/Component/Repository/TechnicalRepository";
import {DataFormat, FormattedBeneficiary, TechnicalBeneficiaries} from "@/interfaces/Components/TechnicalComponent";
import ProfessionalController from "@/helpers/Component/Controller/ProfessionalController";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import LoadingAnimation from "@/components/loadingAnimation";
import MapComponent from "@/components/data/Map/MapComponent";
import MapController from "@/helpers/Component/Controller/MapController";
import {NestedDictionary} from "@/interfaces/Map/NestedDictionary";
import {PageCustomProps} from "@/interfaces/Components/PageCustomProps";
import ExportDropdown from "@/components/download/DowloadDropDown/ExportDropdown";
import {handleOnClick, handleReset, handleTooltipChange} from "@/helpers/Component/CustomTooltip/CustomTooltipHandler";
import {
  filterFunctionsEvents, filterFunctionsProfessionals,
  getUniqueValuesFunctionsEvents,
  getUniqueValuesFunctionsProfessionals
} from "@/interfaces/Components/CustomTooltipHandler";
import CustomTooltip from "@/components/CustomTooltip/CustomTooltip";
import {CustomTooltipData} from "@/interfaces/Components/CustomTooltip";
import EventsController from "@/helpers/Component/Controller/EventsController";

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

function countTotalRecords(data: TechnicalBeneficiaries[]): number {
  return data.length;
}

function countGenders(data: TechnicalBeneficiaries[]) {
  const genderCount: { [key: string]: number } = {};

  data.forEach((item) => {
    const gender = item.gender_at_birth;
    genderCount[gender] = (genderCount[gender] || 0) + 1;
  });

  return genderCount;
}

function countEducationLevel(data: TechnicalBeneficiaries[]) {
  const educationLevelCount: { [key: string]: number } = {};

  data.forEach((item) => {
    const educationLevel = item.highest_educational_level;
    educationLevelCount[educationLevel] = (educationLevelCount[educationLevel] || 0) + 1;
  });

  return educationLevelCount;
}

function countEthnicity(data: TechnicalBeneficiaries[]) {
  const ethnicityCount: { [key: string]: number } = {};

  data.forEach((item) => {
    const ethnicity = item.ethnic_affiliation;
    ethnicityCount[ethnicity] = (ethnicityCount[ethnicity] || 0) + 1;
  });

  return ethnicityCount;
}

function countCrops(data: DataFormat): { [key: string]: number } {
  const cropCount: { [key: string]: number } = {};

  data.forEach(item => {
    const crops = item.data.crops_worked_last_12_months.split(', ').map(crop => crop.trim());

    crops.forEach(crop => {
      cropCount[crop] = (cropCount[crop] || 0) + 1;
    });
  });

  return cropCount;
}

function countOrganizations(events: TechnicalBeneficiaries[]) {
  const predefinedInstitutions = new Set([
    "AGROSAVIA",
    "AUGURA",
    "ASBAMA",
    "ASOHOFRUCOL",
    "CENICAFE",
    "CENICAÑA",
    "CIAT (Alianza Bioversity-CIAT)",
    "CIPAV",
    "CIMMYT",
    "FEDEARROZ",
    "FEDEGAN",
    "FEDEPANELA",
    "FEDEPAPA",
    "FENALCE",
    "FEDECAFE",
    "ASOCAÑA",
    "MADR",
    "ADR",
    "Todas"
  ]);

  const organizations: { [key: string]: number } = {
    Otras: 0,
  };

  events.forEach((event) => {
    event.affiliated_guild_or_organization.forEach((organization) => {
      if (predefinedInstitutions.has(organization)) {
        organizations[organization] = (organizations[organization] || 0) + 1;
      } else {
        organizations["Otras"] += 1;
      }
    });
  });

  return organizations;
}

const ProfessionalsPage: NextPage<PageCustomProps> = ({customStyles}) => {
  const styles = customStyles || require("./professionals.module.css");

  const treemapChartProfessionalCountId: string = "treemap_chart_professional_count";
  const doughnutChartProfessionalGenreId: string = "doughnut_chart_professional_genre";
  const doughnutChartProfessionalOccupationId: string = "doughnut_chart_professional_occupation";
  const doughnutProducersEthnicity: string = "doughnut_professional_ethnicity";


  const [events, setEvents] = useState<TechnicalBeneficiaries[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<TechnicalBeneficiaries[]>(
      events
  );

  const [genderNumber, setGenderNumber] = useState<number[]>([]);
  const [genderLabel, setGenderLabel] = useState<string[]>([]);
  const [educationaLevelNumber, setEducationalLevelNumber] = useState<number[]>([]);
  const [educationalLevelLabel, setEducationalLevelLabel] = useState<string[]>([]);
  const [ethnicityNumber, setEthnicityNumber] = useState<number[]>([]);
  const [ethnicityLabel, setEthnicityLabel] = useState<string[]>([]);
  const [totalData, setTotalData] = useState<number>(0);
  const [treemapTitle, setTreemapTitle] = useState("Número de profesionales");
  const [counts, setCounts] = useState<NestedDictionary>({});

  const [treemapData, setTreemapData] = useState<
    { name: string; value: number }[]
  >([]);
  const [treemapDataFiltered, setTreemapDataFiltered] = useState<
      { name: string; value: number }[]
  >([]);

  const [educationalLevelState, setEducationalLevelState] = useState<CustomTooltipData[]>([]);
  const [genderState, setGenderState] = useState<CustomTooltipData[]>([]);
  const [cropState, setCropState] = useState<CustomTooltipData[]>([]);
  const [departmentState, setDepartmentState] = useState<CustomTooltipData[]>([]);
  const [cityState, setCityState] = useState<CustomTooltipData[]>([]);
  const [institutionState, setInstitutionState] = useState<CustomTooltipData[]>([]);
  const [tooltipValues, setTooltipValues] = useState<
      Array<CustomTooltipData>
  >([
    {
      value: "",
      label: "Nivel educativo"
    },
    {
      value: "",
      label: "Género"
    },
    {
      value: "",
      label: "Cultivo"
    },
    {
      value: "",
      label: "Departamento"
    },
    {
      value: "",
      label: "Municipio"
    },
    {
      value: "",
      label: "Institución"
    },
  ]);
  const tooltipOptions: Array<CustomTooltipData[]> = [educationalLevelState, genderState, cropState, departmentState, cityState, institutionState];
  const setTooltipOptions: Array<React.Dispatch<React.SetStateAction<CustomTooltipData[]>>> = [setEducationalLevelState, setGenderState, setCropState, setDepartmentState, setCityState, setInstitutionState];
  const filterTypes = ["educationLevel", "gender", "crop", "department", "city", "institution"];
  const placeHolders = ["Nivel educativo", "Género", "Cultivo", "Departamento", "Municipio", "Institución"];

  useEffect(() => {
    TechnicalRepository.fetchEvents()
      .then((data: DataFormat) => {
        const formattedEvents = ProfessionalController.formatEvents(data);

        const uniqueEducationalLevel = EventsController.getUniqueValues(formattedEvents, "highest_educational_level");
        const uniqueGender = EventsController.getUniqueValues(formattedEvents, "gender_at_birth");
        //const uniqueCrop = EventsController.getUniqueValues(formattedEvents, "crops_worked_last_12_months", true);
        //const uniqueDepartments = EventsController.getUniqueValues(formattedEvents, "department_where_you_work");
        //const uniqueCities = EventsController.getUniqueValues(formattedEvents, "municipalities_where_you_work", true);
        const uniqueInstitutions = EventsController.getUniqueValues(formattedEvents, "affiliated_guild_or_organization", true);

        setEvents(formattedEvents);
        setFilteredEvents(formattedEvents);
        setEducationalLevelState([...uniqueEducationalLevel]);
        setGenderState([...uniqueGender]);
        //setCropState([...uniqueCrop]);
        //setDepartmentState([...uniqueDepartments]);
        //setCityState([...uniqueCities]);
        setInstitutionState([...uniqueInstitutions]);

        setEvents(formattedEvents);
        setFilteredEvents(formattedEvents);

        processChartData();
      })
      .catch(error => {
        console.error("Error fetching events:", error);
      });
  }, []);

  useEffect(() => {
    setTreemapDataFiltered(treemapData
        .sort((a, b) => b.value - a.value)
        .map(item => ({
          ...item,
          value: item.value
        })));
  }, [treemapData]);

  const initializeTreemapData = (data: TechnicalBeneficiaries[]) => {
    let filterData = countOrganizations(data);
    const mappedData = Object.keys(filterData).map((key) => ({
      name: key,
      value: filterData[key],
    }));
    setTreemapData(mappedData);
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

  const plugins = {
    legend: {
      labels: {
        usePointStyle: true,
        font: {
          size: (ctx: any) => {
            const width = ctx.chart.width;
            return Math.max(8, width / 50);
          },
        },
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
  }

  const config2 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: plugins,
    title: {
      display: true,
      text: educationalLevel.datasets[0].label,
    },
  };

  const config3 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: plugins,
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

  useEffect(() => {
    processChartData();
  }, [filteredEvents]);

  const processChartData = () => {
    setCounts(MapController.updateCountEventsByCityCodes(filteredEvents));

    initializeTreemapData(filteredEvents);

    const totalDataRecord = countTotalRecords(filteredEvents);
    setTotalData(totalDataRecord);

    const genderCount = countGenders(filteredEvents)
    setGenderLabel(Object.keys(genderCount))
    setGenderNumber(Object.values(genderCount));

    const educationLevelCount = countEducationLevel(filteredEvents)
    setEducationalLevelLabel(Object.keys(educationLevelCount))
    setEducationalLevelNumber(Object.values(educationLevelCount))

    const ethnicityCount = countEthnicity(filteredEvents)
    setEthnicityLabel(Object.keys(ethnicityCount))
    setEthnicityNumber(Object.values(ethnicityCount))
  }

  return (
      <div className="w-full h-full flex flex-wrap">
        <CustomTooltip
            options={tooltipOptions}
            values={tooltipValues}
            onChange={(selectedValue, filterType) =>
                handleTooltipChange(
                    selectedValue,
                    filterType,
                    filteredEvents,
                    setTooltipOptions,
                    tooltipValues,
                    setTooltipValues,
                    filterFunctionsProfessionals,
                    getUniqueValuesFunctionsProfessionals(),
                    filterTypes
                )
            }
            onClick={() =>
                handleOnClick(
                    tooltipValues,
                    filteredEvents,
                    setFilteredEvents,
                    filterFunctionsProfessionals,
                    filterTypes
                )
            }
            onReset={() =>
                handleReset(
                    events,
                    setTooltipOptions,
                    setTooltipValues,
                    setFilteredEvents,
                    getUniqueValuesFunctionsProfessionals(),
                    placeHolders
                )
            }
            placeholders={placeHolders}
            filterTypes={filterTypes}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => String(option.value)}
        />
        {/* Card superior */}
        <div className="w-full h-full flex flex-wrap">
          <div className={styles.top_div}>
            {/* Card: Total técnicos */}
            <CardComponent
                title="Total profesionales registrados"
                styles={styleTechnical}
            >
              {treemapData.length > 0 ? (
                  <div className={styles.top_div_division}>
                    <label className={styles.top_card_label}>{totalData}</label>
                  </div>
              ) : (
                  <LoadingAnimation/>
              )}
            </CardComponent>

            {/* Card: Género */}
            <CardComponent
                id={doughnutChartProfessionalGenreId}
                title="Género"
                styles={styleTechnical}
            >
              {treemapData.length > 0 ? (
                  <div className={styles.doughnut_chart}>
                    <Doughnut
                        id={doughnutChartProfessionalGenreId}
                        data={gender}
                        options={config}
                    />
                  </div>
              ) : (
                  <LoadingAnimation/>
              )}
            </CardComponent>

            {/* Card: Nivel Educativo */}
            <CardComponent
                id={doughnutChartProfessionalOccupationId}
                title="Nivel educativo"
                styles={styleTechnical}
            >
              {treemapData.length > 0 ? (
                  <div className={styles.doughnut_chart}>
                    <Doughnut
                        id={doughnutChartProfessionalOccupationId}
                        data={educationalLevel}
                        options={config2}
                    />
                  </div>
              ) : (
                  <LoadingAnimation/>
              )}
            </CardComponent>

            {/* Card: Etnia */}
            <CardComponent
                id={doughnutProducersEthnicity}
                title="Etnia"
                styles={styleTechnical}
            >
              {treemapData.length > 0 ? (
                  <div className={styles.doughnut_chart}>
                    <Doughnut
                        id={doughnutProducersEthnicity}
                        data={etnia}
                        options={config3}
                    />
                  </div>
              ) : (
                  <LoadingAnimation/>
              )}
            </CardComponent>
          </div>

          {/* Sección inferior con gráficos adicionales */}
          <div className={styles.bottom_div}>
            <div className={styles.flex_container}>
              <div className={styles.width}>
                {/* Gráfico de Treemap */}
                <ChartCardComponent title={treemapTitle} header={
                  <div className={styles.header_container}>
                    <ExportDropdown
                        chartId={treemapChartProfessionalCountId}
                    />
                  </div>
                }>
                  {treemapData.length > 0 ? (
                      <ReactChart
                          id={treemapChartProfessionalCountId}
                          type="treemap"
                          data={treeMap}
                          options={options}
                      />
                  ) : (
                      <LoadingAnimation/>
                  )}
                </ChartCardComponent>
              </div>
              <div className={styles.width}>
                {/* Mapa de Colombia */}
                <CardComponent title="Profesionales por municipio" styles={styleTechnical}>
                  {treemapData.length > 0 && filteredEvents && counts ? (
                      <div className="w-full h-full">
                        <MapComponent
                            polygons={ProfessionalController.extractMunicipalitiesCode(filteredEvents)}
                            data={counts}
                        />
                      </div>
                  ) : (
                      <LoadingAnimation/>
                  )}
                </CardComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ProfessionalsPage;
