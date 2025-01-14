"use client";

import CalendarController from "@/helpers/Component/Controller/CalendarController";
import CalendarRepository from "@/helpers/Component/Repository/CalendarRepository";
import Select from "react-select";
import React, { FC, useEffect, useState } from "react";
import { Button } from "@mui/material";
import LoadingAnimation from "@/components/loadingAnimation";
import ReportsRepository from "@/helpers/Component/Repository/ReportsRepository";
import ReportsController from "@/helpers/Component/Controller/ReportsController";
import {
  ReportNames,
} from "@/interfaces/Components/ReportsComponent";
import { PageCustomProps } from "@/interfaces/Components/PageCustomProps";
import { CustomTooltipData } from "@/interfaces/Components/CustomTooltip";
import {
  filterFunctionsEvents,
  getUniqueValuesFunctionsEvents,
} from "@/interfaces/Components/CustomTooltipHandler";
import { EventFormat } from "@/interfaces/Components/Events";
import {
  handleOnClick,
  handleReset,
  handleTooltipChange,
} from "@/helpers/Component/CustomTooltip/CustomTooltipHandler";
import CustomTooltip from "@/components/CustomTooltip/CustomTooltip";
import EventsController from "@/helpers/Component/Controller/EventsController";

const ReportsPage: FC<PageCustomProps> = ({ customStyles }) => {
  const [allData, setAllData] = useState<EventFormat[]>([]);
  const [tempEventData, setTempEventData] = useState<EventFormat[]>([]);
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
  const styles = customStyles || require("./reports.module.css");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [reportId, setReportId] = useState<string | null>(null);
  const [allEventData, setAllEventData] = useState<ReportNames[]>([]); // Store all event data once fetched
  const [selectedReport, setSelectedReport] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const tooltipOptions: Array<CustomTooltipData[]> = [
    componentState,
    axisState,
    institutionState,
    cropState,
    departmentState,
    cityState,
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
  ];

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
      label: "Cadena productiva",
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

  const filterTypes = [
    "component",
    "axis",
    "institution",
    "crop",
    "department",
    "city",
  ];

  const placeHolders = [
    "Componente",
    "Eje",
    "Instituciones",
    "Cadena productiva",
    "Departamento",
    "Municipio",
  ];

  useEffect(() => {
    async function initializePage() {
      // Fetch all reports initially
      await fetchReports();

      // Fetch and process custom event data
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
        const uniqueInstitutions = EventsController.getInstitutionCategories(
          formattedEvents,
          "institution",
            EventsController.predefinedInstitutions,
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

        setAllData(formattedEvents);
        setTempEventData(formattedEvents);
        setComponentState([...uniqueComponents]);
        setAxisState([...uniqueAxis]);
        setInstitutionState([...uniqueInstitutions]);
        setCropState([...uniqueCrops]);
        setDepartmentState([...uniqueDepartments]);
        setCityState([...uniqueCities]);
      }

      fetchAndProcessData();
    }

    initializePage();
  }, []);

  const fetchReports = async (filters?: { [key: string]: string | null }) => {
    try {
      const data = filters
        ? await ReportsRepository.fetchFilteredReports(filters)
        : await ReportsRepository.fetchEvents();

      const formattedReports = ReportsController.formatHeaders(data);

      setAllEventData(formattedReports);
    } catch (error) {
      console.error("Error in fetchReports:", error);
    }
  };

  const fetchPdf = async (selectedReportId: string) => {
    try {
      const encodedReportId = encodeURIComponent(selectedReportId);
      const response = await fetch(
        `/api/generate-pdf?reportId=${encodedReportId}`
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to generate PDF: ${errorText}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };

  const downloadPdf = () => {
    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = `generated_report_${reportId}.pdf`;
      link.click();
    }
  };

  const handleDownloadDocx = async (selectedReportId: string) => {
    const encodedReportId = encodeURIComponent(selectedReportId);
    if (!reportId) {
      alert("Please select a report to download.");
      return;
    }

    try {
      const response = await fetch(
        `/api/generate-docx?reportId=${encodedReportId}`
      );
      if (!response.ok) {
        throw new Error("Failed to generate the document");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `report_${reportId}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading document:", error);
      alert("There was an error generating the document.");
    }
  };

  const handleApplyFilters = async () => {
    // Apply filters to the main data
    handleOnClick(
      tooltipValues,
      allData,
      setTempEventData,
      filterFunctionsEvents,
      filterTypes
    );

    // Generate filters for the reports API
    const filters = tooltipValues.reduce((acc, tooltip, index) => {
      if (tooltip.value) {
        acc[filterTypes[index]] = tooltip.value;
      }
      return acc;
    }, {} as { [key: string]: string });

    // Fetch filtered reports and update the dropdown
    await fetchReports(filters);

    // Ensure the dropdown updates (derived from allEventData)
    setSelectedReport(null);
  };

  const handleReportSelection = (
    selectedOption: { value: string; label: string } | null
  ) => {
    if (selectedOption) {
      setReportId(selectedOption.value);
      fetchPdf(selectedOption.value);
      setSelectedReport(selectedOption);
    } else {
      setReportId(null);
      setSelectedReport(null);
    }
  };

  const reportOptions = allEventData
    .filter(
      (report) => report.is_reported === "1" && report.not_assistant === "0"
    )
    .sort(
      (a, b) => new Date(b.datesEnd).getTime() - new Date(a.datesEnd).getTime()
    )
    .map((report) => ({
      value: report.event_id,
      label: capitalizeFirstLetter(report.name),
      date: report.datesEnd,
    }));

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <div className={styles.reports}>
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
        onClick={handleApplyFilters}
        onReset={() =>
          handleReset(
            allData,
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
      <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
        <div className={styles.first_div}>
          <div className={styles.filter_div}>
            <div style={{ width: "60%" }}>
              <Select
                options={reportOptions}
                value={selectedReport}
                onChange={handleReportSelection}
                placeholder="Elige un reporte"
                isSearchable
              />
            </div>
            <div className="gap-2 flex flex-row">
              <Button
                variant="contained"
                onClick={downloadPdf}
                disabled={!pdfUrl}
                style={{ fontSize: "1vw" }}
              >
                PDF
              </Button>
              <Button
                style={{ fontSize: "1vw" }}
                variant="contained"
                onClick={() =>
                  selectedReport && handleDownloadDocx(selectedReport.value)
                }
                disabled={!selectedReport}
              >
                Word
              </Button>
            </div>
          </div>
          <div className={styles.preview_div}>
            {pdfUrl ? (
              <iframe src={pdfUrl} className={styles.pdf} />
            ) : (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <p style={{ textAlign: "center" }}>
                  Por favor, selecciona un reporte para visualizar
                </p>
                <div
                  style={{
                    width: "50%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <LoadingAnimation />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
