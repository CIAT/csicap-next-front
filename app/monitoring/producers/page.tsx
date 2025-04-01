"use client";

import { NextPage } from "next";
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
import React, { useEffect, useState } from "react";
import ProducersRepository from "@/helpers/Component/Repository/ProducersRepository";
import { DataFormat } from "@/interfaces/Components/BeneficiariesComponent";
import ProducersController from "@/helpers/Component/Controller/ProducersController";
import CardComponent from "@/components/ui/card/Card";
import MapComponent from "@/components/data/Map/MapComponent";
import MapController from "@/helpers/Component/Controller/MapController";
import {NestedDictionary} from "@/interfaces/Map/NestedDictionary";
import LoadingAnimation from "@/components/loadingAnimation";
import ChartCardComponent from "@/components/events/chartCard";
import RegisteredController from "@/helpers/Component/Controller/RegisteredController";
import {PageCustomProps} from "@/interfaces/Components/PageCustomProps";
import ExportDropdown from "@/components/download/DowloadDropDown/ExportDropdown";
import CustomTooltip from "@/components/CustomTooltip/CustomTooltip";
import {handleOnClick, handleReset, handleTooltipChange} from "@/helpers/Component/CustomTooltip/CustomTooltipHandler";
import {
  filterFunctions,
  filterFunctionsProducers,
  getUniqueValuesFunctionsProducers
} from "@/interfaces/Components/CustomTooltipHandler";
import {CustomTooltipData} from "@/interfaces/Components/CustomTooltip";
import EventsController from "@/helpers/Component/Controller/EventsController";

Chart.register(
  ArcElement,
  Legend,
  LinearScale,
  CategoryScale,
  BarElement,
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
function countTotalRegistered(data: DataFormat[]): number {
  let quantity = 0;
  data.forEach((item) => {
    const calQty = parseFloat(item.cal_qty);
    if (!isNaN(calQty)) {
      quantity += calQty;
    }
  });
  return Math.round(quantity);
}

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
    let house = item.type_property;

    if (!house) {
      house = "No disponible";
    }

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

function countPrimaryCrop(data: DataFormat[]): { [key: string]: number } {
  const primaryCropCount: { [key: string]: number } = {};

  data.forEach(item => {
    const primaryCrop = item.pr_primary_crop;
    primaryCropCount[primaryCrop] = (primaryCropCount[primaryCrop] || 0) + 1;
  });

  return primaryCropCount;
}

const ProducersPage: NextPage<PageCustomProps> = ({customStyles}) => {
  const styles = customStyles || require("./producers.module.css");

  const treemapChartProducersCountId: string = "treemap_chart_producers_count";
  const doughnutProducersGenreId: string = "doughnut_chart_producers_genre";
  const doughnutProducersPropertyTypeId: string = "doughnut_chart_producers_property_type";
  const doughnutProducersEthnicity: string = "doughnut_chart_producers_ethnicity";

  const [events, setEvents] = useState<DataFormat[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<DataFormat[]>(
    events
  );

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [shouldApplyDateFilter, setShouldApplyDateFilter] = useState(false);
  const [counts, setCounts] = useState<NestedDictionary>({});

  const [selectedFilter, setSelectedFilter] = useState<string>("crop");
  const [allEventsData, setAllEventsData] = useState<DataFormat[]>([]);

  const [totalData, setTotalData] = useState<number>(0);
  const [totalProducersData, setTotalProducersData] = useState<number>(0);
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

  const [genderState, setGenderState] = useState<CustomTooltipData[]>([]);
  const [propertyState, setPropertyState] = useState<CustomTooltipData[]>([]);
  const [ethnicState, setEthnicState] = useState<CustomTooltipData[]>([]);
  const [primaryCropState, setPrimaryCropState] = useState<CustomTooltipData[]>([]);
  const [guildState, setGuildState] = useState<CustomTooltipData[]>([]);
  const [departmentState, setDepartmentState] = useState<CustomTooltipData[]>([]);
  const [cityState, setCityState] = useState<CustomTooltipData[]>([]);
  const [tooltipValues, setTooltipValues] = useState<
      Array<CustomTooltipData>
  >([
    {
      value: "",
      label: "Género del registrante"
    },
    {
      value: "",
      label: "Tipo de propiedad"
    },
    {
      value: "",
      label: "Etnia del registrante"
    },
    {
      value: "",
      label: "Sistema productivo"
    },
    {
      value: "",
      label: "Gremio"
    },
    {
      value: "",
      label: "Departamento"
    },
    {
      value: "",
      label: "Municipio"
    }
  ]);
  const tooltipOptions: Array<CustomTooltipData[]> = [genderState, propertyState, ethnicState, primaryCropState, guildState, departmentState, cityState];
  const setTooltipOptions: Array<React.Dispatch<React.SetStateAction<CustomTooltipData[]>>> = [setGenderState, setPropertyState, setEthnicState, setPrimaryCropState, setGuildState, setDepartmentState, setCityState];
  const filterTypes = ["gender", "property", "ethnic", "primaryCrop", "guild", "department", "city"];
  const placeHolders = ["Género del registrante", "Tipo de propiedad", "Etnia del registrante", "Sistema productivo", "Gremio", "Departamento", "Municipio"];

  useEffect(() => {
    ProducersRepository.fetchEvents()
      .then((data: DataFormat[]) => {

        const formattedEvents = ProducersController.formatEvents(data);

        const uniqueGender = EventsController.getUniqueValues(formattedEvents, "gen_name");
        const uniqueProperty = EventsController.getUniqueValues(formattedEvents, "type_property");
        const uniqueEthnic = EventsController.getUniqueValues(formattedEvents, "pr_ethnic_group");
        const uniquePrimaryCrop = EventsController.getUniqueValues(formattedEvents, "pr_primary_crop");
        const uniqueGuild = EventsController.getInstitutionCategories(formattedEvents, "gremio", false);
        const uniqueDepartments = EventsController.getUniqueValues(formattedEvents, "pr_dpto_farm");
        const uniqueCities = EventsController.getUniqueValues(formattedEvents, "pr_muni_farm");

        setEvents(formattedEvents);
        setFilteredEvents(formattedEvents);
        setGenderState([...uniqueGender]);
        setPropertyState([...uniqueProperty]);
        setEthnicState([...uniqueEthnic]);
        setPrimaryCropState([...uniquePrimaryCrop]);
        setGuildState([...uniqueGuild]);
        setDepartmentState([...uniqueDepartments]);
        setCityState([...uniqueCities]);

        processChartData(data);
      })
      .catch(error => {
        console.error("Error fetching events:", error);
      });
  }, []);

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
        label: "Etnia del registrante",
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
        tree: treemapData,
        key: 'value',
        groups: ['name'],
        backgroundColor: (ctx: { dataIndex: number }) => {
          return colores[ctx.dataIndex % colores.length];
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

  useEffect(() => {
    processChartData(filteredEvents);
  }, [filteredEvents]);

  const processChartData = (data: DataFormat[]) => {
    setAllEventsData(data);
    RegisteredController.countCrops(data);
    RegisteredController.countOrganizations(data);
    setCounts(MapController.updateCountBeneficiariesByCity(data));
    const totalDataRecord = countTotalRecords(data);
    setTotalData(totalDataRecord);
    const totalRegistered = countTotalRegistered(data)+countTotalRecords(data);
    setTotalProducersData(totalRegistered);
    const genderCount = countGenders(data);
    setGenderLabel(Object.keys(genderCount));
    setGenderNumber(Object.values(genderCount));

    const housingCount = countTypeOfHousing(data)
    setTypeHouseLabel(Object.keys(housingCount));
    setTypeHouseNumber(Object.values(housingCount));

    const ethnicityCount = countEthnicity(data);
    setEthnicityLabel(Object.keys(ethnicityCount));
    setEthnicityNumber(Object.values(ethnicityCount));

    setTreemapData(RegisteredController.processTreemapData(selectedFilter));
  }

  const handleOnApply = () => {
    handleOnClick(
        tooltipValues,
        filteredEvents,
        setFilteredEvents,
        filterFunctionsProducers,
        filterTypes
    );

    setShouldApplyDateFilter(true);
  };

  const handleOnReset = () => {
    handleReset(
        events,
        setTooltipOptions,
        setTooltipValues,
        setFilteredEvents,
        getUniqueValuesFunctionsProducers(),
        placeHolders
    )

    setDateRange([null, null]);
  }

  useEffect(() => {
    if (shouldApplyDateFilter && dateRange[0] !== null && dateRange[1] !== null) {
      setFilteredEvents(prevData => filterFunctions["date"](prevData, dateRange));
      setShouldApplyDateFilter(false);
    }
  }, [filteredEvents, shouldApplyDateFilter, dateRange]);

  return (
    <div className={styles.producers}>
      <CustomTooltip
          useDate={true}
          dateRange={dateRange}
          setDateRange={setDateRange}
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
                  filterFunctionsProducers,
                  getUniqueValuesFunctionsProducers(),
                  filterTypes,
              )}
          onClick={handleOnApply}
          onReset={handleOnReset}
          placeholders={placeHolders}
          filterTypes={filterTypes}
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => String(option.value)}
      />
      <div className="w-full h-full flex flex-wrap">
        {/* Card superior */}
        <div className={styles.top_div}>
          <CardComponent styles={styleBeneficiaries} title={"Total familias registradas"}>
            {treemapData.length > 0 ? (
                <div className={styles.top_div_division}>
                  <label className={styles.top_card_label}>{EventsController.formatNumber(totalData)}</label>
                  <label className={styles.title_card_label}>Total de personas, incluyendo núcleo familiar:</label>
                  <label className={styles.other_card_label}>{EventsController.formatNumber(totalProducersData)}</label>
                </div>
            ) : (
                <LoadingAnimation/>
            )}
          </CardComponent>
          {/* Doughnut: Género */}
          <CardComponent
              id={doughnutProducersGenreId}
              data={sex}
              title="Género del registrante"
              styles={styleBeneficiaries}
          >
            {treemapData.length > 0 ? (
                <div className={styles.doughnut_chart}>
                  <Doughnut
                      id={doughnutProducersGenreId}
                      data={sex}
                      options={config}
                  />
                </div>
            ) : (
                <LoadingAnimation/>
            )}
          </CardComponent>

          {/* Doughnut: Tipo de propiedad */}
          <CardComponent
              id={doughnutProducersPropertyTypeId}
              data={typeOfHousing}
              title="Tipo de propiedad"
              styles={styleBeneficiaries}
          >
            {treemapData.length > 0 ? (
                <div className={styles.doughnut_chart}>
                  <Doughnut
                      id={doughnutProducersPropertyTypeId}
                      data={typeOfHousing}
                      options={config}
                  />
                </div>
            ) : (
                <LoadingAnimation/>
            )}
          </CardComponent>

          {/* Doughnut: Etnia */}
          <CardComponent
              id={doughnutProducersEthnicity}
              data={etnia}
              title="Etnia del registrante"
              styles={styleBeneficiaries}
          >
            {treemapData.length > 0 ? (
                <div className={styles.doughnut_chart}>
                  <Doughnut
                      id={doughnutProducersEthnicity}
                      data={etnia}
                      options={config}
                  />
                </div>
            ) : (
                <LoadingAnimation/>
            )}
          </CardComponent>
        </div>
        <div className={styles.bottom_div}>
          <div className={styles.flex_container}>
            <div className={styles.width}>
              <ChartCardComponent title="Familias registradas por sistema productivo" header={
                <div className={styles.header_container}>
                  <ExportDropdown
                      chartId={treemapChartProducersCountId}
                      chartData={data}
                  />
                </div>
              }>
                {treemapData.length > 0 ? (
                    <ReactChart
                        id={treemapChartProducersCountId}
                        type="treemap"
                        data={data}
                        options={options}
                    />
                ) : (
                    <LoadingAnimation/>
                )}
              </ChartCardComponent>
            </div>
            <div className={styles.width}>
              <ChartCardComponent
                  title="Familias registradas por municipio"
                  header={
                    <div className={styles.header_container}>
                      <div className={styles.text_header}>
                        <div className={styles.red_point}>*</div>
                        {EventsController.formatNumber(filteredEvents.length)} eventos distribuídos
                        en {MapController.getDepartmentCount(filteredEvents.map(event => event.id_farm_muni))} departamentos
                        y {MapController.getMunicipalitiesCount(filteredEvents.map(event => event.id_farm_muni))} municipios
                      </div>
                      <ExportDropdown
                          mapImageName={"productores_map.png"}/>
                    </div>
                  }
              >
                <div className="w-full h-full">
                  {treemapData.length > 0 ? (
                      <MapComponent
                          polygons={ProducersController.extractProvincesAndCities(filteredEvents)}
                          data={counts}
                          useQuintile={true}
                          quintileType={"Familias registradas"}
                      />
                  ) : (
                      <LoadingAnimation/>
                  )}
                </div>
              </ChartCardComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProducersPage;