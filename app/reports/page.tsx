"use client";

import { NextPage } from "next";
import styles from "./reports.module.css";
import MapComponent from "@/components/data/Map/MapComponent";
import CalendarController from "@/helpers/Component/Controller/CalendarController";
import CalendarRepository from "@/helpers/Component/Repository/CalendarRepository";
import MapController from "@/helpers/Component/Controller/MapController";
import { NestedDictionary } from "@/interfaces/Map/NestedDictionary";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { DataFormat, EventsData } from "@/interfaces";
import LoadingAnimation from "@/components/loadingAnimation";
import ReportsRepository from "@/helpers/Component/Repository/ReportsRepository";
import ReportsController from "@/helpers/Component/Controller/ReportsController";
import { ReportNames } from "@/interfaces/Components/ReportsComponent";
import { Console } from "console";

const ReportsPage: NextPage = () => {
  const [events, setEvents] = useState<EventsData[]>([]);
  const [counts, setCounts] = useState<NestedDictionary>({});
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [reportId, setReportId] = useState<string | null>(null);
  const [allEventData, setAllEventData] = useState<ReportNames[]>([]); // Store all event data once fetched
  const [selectedReport, setSelectedReport] = useState<{
    value: string;
    label: string;
  } | null>(null);

  useEffect(() => {
    async function fetchReports() {
      const dataset = await ReportsRepository.fetchEvents();
      setAllEventData(ReportsController.formatHeaders(dataset));
    }

    CalendarRepository.fetchEvents()
      .then((data: DataFormat) => {
        const formattedEvents = CalendarController.formatEvents(data).map(
          (event) => ({
            ...event,
            city: event.city.toLowerCase(),
          })
        );

        setCounts(MapController.updateCountAssistants(formattedEvents));
        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });

    fetchReports();
  }, []);

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
    ) // Sort by descending date
    .map((report) => ({
      value: report.event_id,
      label: capitalizeFirstLetter(report.name),
      date: report.datesEnd, // Include date for debugging
    }));

  console.log("Final Sorted Report Options:", reportOptions);

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <div className={styles.reports}>
      <div className={styles.first_div}>
        <div className={styles.filter_div}>
          <div style={{ width: "300px" }}>
            <Select
              options={reportOptions}
              value={selectedReport}
              onChange={handleReportSelection}
              placeholder="Filtrar"
              isSearchable
            />
          </div>
          <div className="gap-2 flex flex-row">
            <Button
              variant="contained"
              onClick={downloadPdf}
              disabled={!pdfUrl}
            >
              PDF
            </Button>
            <Button
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
            <iframe
              src={pdfUrl}
              width="100%"
              height="600"
              style={{ border: "none" }}
            />
          ) : (
            <p>Seleciona un Reporte</p>
          )}
        </div>
      </div>

      <div className={styles.second_div}>
        {events.length > 0 ? (
          <MapComponent
            data={counts}
            polygons={CalendarController.extractProvincesAndCities(events)}
            useQuintile={true}
          />
        ) : (
          <LoadingAnimation />
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
