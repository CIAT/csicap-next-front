"use client";

import { NextPage } from "next";
import styles from "./reports.module.css";
import MapComponent from "@/components/data/Map/MapComponent";
import CalendarController from "@/helpers/Component/Controller/CalendarController";
import CalendarRepository from "@/helpers/Component/Repository/CalendarRepository";
import MapController from "@/helpers/Component/Controller/MapController";
import { NestedDictionary } from "@/interfaces/Map/NestedDictionary";

import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { DataFormat, EventsData } from "@/interfaces";
import LoadingAnimation from "@/components/loadingAnimation";
import ReportsRepository from "@/helpers/Component/Repository/ReportsRepository";
import ReportsController from "@/helpers/Component/Controller/ReportsController";
import { Report, ReportNames } from "@/interfaces/Components/ReportsComponent";

const ReportsPage: NextPage = () => {
  const [events, setEvents] = useState<EventsData[]>([]);
  const [counts, setCounts] = useState<NestedDictionary>({});
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [reportId, setReportId] = useState<string | null>(null);
  const [allEventData, setAllEventData] = useState<ReportNames[]>([]); // Store all event data once fetched

  useEffect(() => {
    async function fetchReports() {
      const dataset = await ReportsRepository.fetchEvents();
      console.log("Fetched reports:", dataset);
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
      const response = await fetch(`/api/generate-pdf?reportId=${selectedReportId}`);
      console.log("Response", response);
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
      link.download = `generated_report_${reportId}.pdf`; // Use the reportId in the filename
      link.click();
    }
  };

  const handleDownloadDocx = async () => {
    if (!reportId) {
      alert("Please select a report to download.");
      return;
    }

    try {
      // Make the request to the API to generate and download the docx file
      const response = await fetch(`/api/generate-docx?reportId=${reportId}`);
      if (!response.ok) {
        throw new Error("Failed to generate the document");
      }

      // Get the blob from the response and create a download link
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      // Create a temporary link and trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.download = `report_${reportId}.docx`; // Use the report ID in the filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading document:", error);
      alert("There was an error generating the document.");
    }
  };

  // Handle report selection and trigger PDF fetch
  const handleReportSelection = (event: SelectChangeEvent<string | null>) => {
    const selectedId = event.target.value as string;
    setReportId(selectedId);
    console.log("Selected report:", selectedId);
    fetchPdf(selectedId);
  };

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <div className={styles.reports}>
      <div className={styles.first_div}>
        <div className={styles.filter_div}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Filtrar</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={reportId}
              onChange={handleReportSelection}
              label="Filtrar"
            >
              {allEventData.map((report) => {
                if (
                  report.is_reported === "1" &&
                  report.not_assistant === "0"
                ) {
                  return (
                    <MenuItem key={report.name} value={report.event_id}>
                      {capitalizeFirstLetter(report.name)}
                    </MenuItem>
                  );
                } else {
                  return null; // Don't render anything if the conditions are not met
                }
              })}
            </Select>
          </FormControl>
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
              onClick={handleDownloadDocx}
              disabled={!reportId}
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
            <p>Loading PDF...</p>
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
