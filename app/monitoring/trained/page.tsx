"use client";

import {NextPage} from "next";
import styleTechnical from "./trained.module.css";
import CardComponent from "@/components/ui/card/Card";
import {Chart as ReactChart, Doughnut} from "react-chartjs-2";
import {ArcElement, BarElement, CategoryScale, Chart, Legend, LinearScale, Tooltip,} from "chart.js";
import {TreemapController, TreemapElement} from "chartjs-chart-treemap";
import ChartCardComponent from "@/components/events/chartCard";
import MapComponent from "@/components/data/Map/MapComponent";
import React, {useEffect, useState} from "react";
import LoadingAnimation from "@/components/loadingAnimation";
import TrainedController from "@/helpers/Component/Controller/TrainedController"
import MapController from "@/helpers/Component/Controller/MapController";
import {NestedDictionary} from "@/interfaces/Map/NestedDictionary";
import AssistanceRepository from "@/helpers/Component/Repository/AssistanceRepository";
import {PageCustomProps} from "@/interfaces/Components/PageCustomProps";
import ExportDropdown from "@/components/download/DowloadDropDown/ExportDropdown";
import {handleOnClick, handleReset, handleTooltipChange} from "@/helpers/Component/CustomTooltip/CustomTooltipHandler";
import {filterFunctionsTrained, getUniqueValuesFunctionsTrained,} from "@/interfaces/Components/CustomTooltipHandler";
import CustomTooltip from "@/components/CustomTooltip/CustomTooltip";
import {CustomTooltipData} from "@/interfaces/Components/CustomTooltip";
import EventsController from "@/helpers/Component/Controller/EventsController";
import EventController from "@/helpers/Component/Controller/EventsController";
import {Trained} from "@/interfaces/Components/AssistanceComponent";
import { Info } from 'lucide-react';

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
        font: (context: any) => {
          const width = context.chart.width;
          let size = Math.round(width / 30);
          size = size > 16 ? 16 : size;
          size = size < 10 ? 10 : size;
          return {
            size
          };
        },
        boxWidth: 10,
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
          const rawValue = tooltipItem.raw;
          const total = tooltipItem.dataset.data.reduce(
              (acc: number, val: number) => acc + val,
              0
          );
          const percentage = ((rawValue / total) * 100).toFixed(2);
          return `${tooltipItem.label}: ${rawValue} (${percentage}%)`;
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
        label: (tooltipItem: any) => {
          const data = tooltipItem.raw;
          const total = tooltipItem.dataset.tree.reduce(
              (sum: number, node: any) => sum + node.value,
              0
          );
          const percentage = ((data.v / total) * 100).toFixed(2);
          return `${data.g}: ${data.v} (${percentage}%)`;
        },
      },
    },
  },
};

const countCrops = (trainedPeople: Trained[]) => {
  const cropCount: { [key: string]: number } = {};
  trainedPeople.forEach((trained) => {
    const crop = trained.pr_primary_crop;

    if (crop === "nan") return;
    if (crop === null) return;

    if (cropCount[crop]) {
      cropCount[crop]++;
      return;
    }

    cropCount[crop] = 1;
  });

  return cropCount;
};

const AssistancePage: NextPage<PageCustomProps> = ({customStyles}) => {
  const styles = customStyles || require("./trained.module.css");

  const doughnutChartAssistantsGenreId: string = "doughnut_chart_assistants_genre";
  const doughnutChartAssistantsAgeId: string = "doughnut_chart_assistants_age";
  const doughnutChartAssistantsOccupationId: string = "doughnut_chart_assistants_occupation";
  const treemapChartAssistantsCountId: string = "treemap_chart_assistants_count";

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
  const [allTrainedData, setAllTrainedData] = useState<Trained[]>([]);
  const [tempTrainedData, setTempTrainedData] = useState<Trained[]>([]);

  const [genderState, setGenderState] = useState<CustomTooltipData[]>([]);
  const [ageState, setAgeState] = useState<CustomTooltipData[]>([]);
  const [occupationState, setOccupationState] = useState<CustomTooltipData[]>([]);
  const [cropState, setCropState] = useState<CustomTooltipData[]>([]);
  const [departmentState, setDepartmentState] = useState<CustomTooltipData[]>([]);
  const [cityState, setCityState] = useState<CustomTooltipData[]>([]);
  const [noInformationCrop, setNoInformationCrop] = useState<number>(0);
  const [noInformationMunicipality, setNoInformationMunicipality] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [tooltipValues, setTooltipValues] = useState<Array<CustomTooltipData>>([
    {
      value: "",
      label: "Género",
    },
    {
      value: "",
      label: "Edad",
    },
    {
      value: "",
      label: "Cadena productiva",
    },
    {
      value: "",
      label: "Ocupación",
    },
    {
      value: "",
      label: "Departamento",
    },
    {
      value: "",
      label: "Municipio",
    },
  ]);

  const tooltipOptions: Array<CustomTooltipData[]> = [
    genderState,
    ageState,
    cropState,
    occupationState,
    departmentState,
    cityState
  ];

  const setTooltipOptions: Array<
      React.Dispatch<React.SetStateAction<CustomTooltipData[]>>
  > = [
    setGenderState,
    setAgeState,
    setCropState,
    setOccupationState,
    setDepartmentState,
    setCityState
  ];

  const filterTypes = [
    "gender",
    "age",
    "crop",
    "occupation",
    "department",
    "city"
  ];

  const placeHolders = [
    "Género",
    "Edad",
    "Cadena productiva",
    "Ocupación",
    "Departamento",
    "Municipio"
  ];

  useEffect(() => {
    AssistanceRepository.getAssistanceData().then((data: Trained[]) => {
      setCounts(MapController.updateCountTrainedByCityCodes(data));
      setNoInformationCrop(TrainedController.countDataWithoutInformation(data, "pr_primary_crop"));
      setNoInformationMunicipality(TrainedController.countDataWithoutInformation(data, "muni_res_complete_code"));

      const uniqueGender = EventsController.getUniqueValues(
          data,
          "sex_complete"
      );
      const uniqueAge = EventsController.getAgeRanges(data, "age");
      const uniqueCrop = EventController.getUniqueValues(
          data,
          "pr_primary_crop"
      );
      const uniqueOccupation = EventController.getUniqueValues(
          data,
          "group_ocupations"
      );
      const uniqueDepartments = EventsController.getUniqueValues(
          data,
          "dep_res_complete_label"
      )
      const uniqueCities = EventsController.getUniqueValues(
          data,
          "muni_res_complete_label"
      )

      setAllTrainedData(data);
      setTempTrainedData(data);
      setGenderState([...uniqueGender]);
      setAgeState([...uniqueAge]);
      setCropState([...uniqueCrop]);
      setOccupationState([...uniqueOccupation]);
      setDepartmentState([...uniqueDepartments]);
      setCityState([...uniqueCities]);

      initializeTreemapData(data);
    })
  }, []);

  useEffect(() => {
    processData();
  }, [tempTrainedData]);

  function processData() {
    initializeTreemapData(tempTrainedData);

    let ageCount: { [key: string]: number } = {
      "18-28": 0,
      "29-59": 0,
      "60+": 0,
      "No disponible": 0,
    };

    let occupationCount: { [key: string]: number } = {
      "Productor(a) agropecuario(a)": 0,
      "Técnicos/profesionales": 0,
      "Investigador(a)": 0,
      "Otro": 0,
    };

    let menCount = 0;
    let womenCount = 0;
    let otherCount = 0;
    tempTrainedData.forEach((item) => {
      const gender = item.sex_complete?.toLowerCase();
      const occupation = item?.group_ocupations;
      const age = Number(item.age) || null;

      // Count gender
      if (gender === "hombre") {
        menCount++;
      } else if (gender === "mujer") {
        womenCount++;
      } else {
        otherCount++;
      }

      // Count occupation
      if(occupation in occupationCount){
        occupationCount[occupation]++;
      } else {
        occupationCount["Otro"]++;
      }

      // Count age
      if (age !== null && age !== 0) {
        if (age >= 18 && age <= 28) {
          ageCount["18-28"]++;
        } else if (age >= 29 && age <= 59) {
          ageCount["29-59"]++;
        } else if (age >= 60) {
          ageCount["60+"]++;
        }
      } else {
        ageCount["No disponible"]++;
      }
    });

    // Update state with the counts
    setGenderStats({ men: menCount, women: womenCount, other: otherCount });
    setAgeStats(ageCount);
    setOccupationStats(occupationCount);
  }

  const initializeTreemapData = (data: Trained[]) => {
    const filterData = countCrops(data);
    const mappedData = Object.keys(filterData).map(key => ({
      name: key,
      value: filterData[key]
    }));
    setTreemapData(mappedData);
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
          align: "center" as const,
          position: "top" as const,
          color: "white",
          wrap: true,
          formatter: (ctx: any) => {
            const data = ctx.raw;
            const label = data.g ? shortenedLabels.find((label) => label.startsWith(data.g.slice(0, 1))) || data.g : "No disponible";
            return `${label}: ${data.v}`;
          },
        },
      }
    ]
  };
  

  const ageChartData = {
    labels: ["18-28", "29-59", "60+", "No disponible"],
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
    labels: ["Hombre", "Mujer", "No disponible"],
    datasets: [
      {
        label: "Distribución de Género",
        data: [genderStats.men, genderStats.women, genderStats.other],
        backgroundColor: occupationBackgroundColors,
        borderColor: occupationBorderColors,
      },
    ],
  };

  useEffect(() => {
    initializeTreemapData(tempTrainedData);
  }, [tempTrainedData]);

  return (
    <div className={styles.div}>
      <CustomTooltip
          options={tooltipOptions}
          values={tooltipValues}
          onChange={(selectedValue, filterType) =>
              handleTooltipChange(
                  selectedValue,
                  filterType,
                  tempTrainedData,
                  setTooltipOptions,
                  tooltipValues,
                  setTooltipValues,
                  filterFunctionsTrained,
                  getUniqueValuesFunctionsTrained(),
                  filterTypes
              )
          }
          onClick={() =>
              handleOnClick(
                  tooltipValues,
                  tempTrainedData,
                  setTempTrainedData,
                  filterFunctionsTrained,
                  filterTypes
              )
          }
          onReset={() =>
              handleReset(
                  allTrainedData,
                  setTooltipOptions,
                  setTooltipValues,
                  setTempTrainedData,
                  getUniqueValuesFunctionsTrained(),
                  placeHolders
              )
          }
          placeholders={placeHolders}
          filterTypes={filterTypes}
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => String(option.value)}
      />
      <div className={styles.top_div}>
        {/* Card: Total capacitados */}
        <CardComponent
            title="Total capacitados"
            styles={styleTechnical}
        >
          <label className={styles.top_card_label}>
            {tempTrainedData.length > 0 ? (
                tempTrainedData.length
            ) : (
              <LoadingAnimation />
            )}
          </label>
        </CardComponent>

        {/* Card: Género */}
        <CardComponent
            id={doughnutChartAssistantsGenreId}
            data={genderChartData}
            title="Género"
            styles={styleTechnical}
        >
          {allTrainedData.length > 0 ? (
            <Doughnut
                id={doughnutChartAssistantsGenreId}
                data={genderChartData}
                options={config}
            />
          ) : (
            <LoadingAnimation />
          )}
        </CardComponent>

        {/* Card: Edad */}
        <CardComponent
            id={doughnutChartAssistantsAgeId}
            data={ageChartData}
            title="Edad"
            styles={styleTechnical}
        >
          {allTrainedData.length > 0 ? (
            <Doughnut
                id={doughnutChartAssistantsAgeId}
                data={ageChartData}
                options={config}
            />
          ) : (
            <LoadingAnimation />
          )}
        </CardComponent>

        {/* Card: Ocupacion */}
        <CardComponent
            id={doughnutChartAssistantsOccupationId}
            data={occupationChartData}
            title="Ocupación"
            styles={styleTechnical}
        >
          {allTrainedData.length > 0 ? (
            <Doughnut
                id={doughnutChartAssistantsOccupationId}
                data={occupationChartData}
                options={config}
            />
          ) : (
            <LoadingAnimation />
          )}
        </CardComponent>
      </div>

      <div className={styles.bottom_div}>
        <div className={styles.width}>
          <ChartCardComponent
            title="Capacitados por cadena productiva de interés"
            header={
              <div className={styles.header_container}>
                {noInformationCrop > 0 && (
                    <div className={styles.important_text}>
                      <div className={styles.important}>*</div>No se tiene información para el {Math.round((noInformationCrop / allTrainedData.length) * 100)}% de los capacitados.
                    </div>
                )}
                <ExportDropdown
                    chartId={treemapChartAssistantsCountId}
                    chartData={treeData}
                />
              </div>
            }
          >
            {treemapData.length > 0 ? (
                <div className={styles.treemap_container}>
                  <ReactChart
                      id={treemapChartAssistantsCountId}
                      type="treemap"
                      data={treeData}
                      options={options}
                  />
                  <div className={styles.more_info_container}>
                    <button className={styles.more_info} onClick={() => setIsOpen(prevState => !prevState)}>
                      <Info/>
                    </button>
                    {isOpen && (
                        <div className={`${styles.more_info_text} ${styles.shadow}`}>
                          Este gráfico refleja el cultivo reportado en el caso de los agricultores, y el cultivo de trabajo en el caso de los técnicos
                        </div>
                    )}
                  </div>
                </div>
            ) : (<div className="flex w-full h-full items-center justify-center"><LoadingAnimation/></div>)}
          </ChartCardComponent>
        </div>

        <div className={styles.width}>
          <ChartCardComponent
              title="Capacitados por municipio de residencia"
              header={
                <div className={styles.header_container}>
                  {noInformationMunicipality > 0 && (
                      <div className={styles.important_text}>
                        <div className={styles.important}>*</div> No se tiene información para el {Math.round((noInformationMunicipality / allTrainedData.length) * 100)}% de los capacitados.
                      </div>
                  )}
                  <ExportDropdown
                      mapImageName={"capacitados_map.png"}/>
                </div>
              }
          >
            <div className="w-full h-full">
              <MapComponent
                  polygons={TrainedController.extractProvincesCode(tempTrainedData)}
                  data={counts}
                  useQuintile={true}
                  quintileType={"Capacitados"}
              />
            </div>
          </ChartCardComponent>
        </div>
      </div>
    </div>
  );
};

export default AssistancePage;