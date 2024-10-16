"use client";

import { NextPage } from "next";
import styles from "./reports.module.css";
import MapComponent from "@/components/data/Map/MapComponent";
import CalendarController from "@/helpers/Component/Controller/CalendarController";
import CalendarRepository from "@/helpers/Component/Repository/CalendarRepository";
import MapController from "@/helpers/Component/Controller/MapController";
import {NestedDictionary} from "@/interfaces/Map/NestedDictionary";

import React, { useEffect, useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import {DataFormat, EventsData} from "@/interfaces";
import LoadingAnimation from "@/components/loadingAnimation";

const data = [
  {
    key: "main_event_objective",
    label: "Objetivo",
    value: "Aumentar la conciencia sobre la sostenibilidad",
  },
  {
    key: "event_type",
    label: "Tipo de taller o capacitación",
    value: "Taller",
  },
  {
    key: "event_justification",
    label: "Justificación",
    value: "Necesidad de educar a la comunidad",
  },
  {
    key: "guest_type",
    label: "Tipo de invitados",
    value: "Expertos en sostenibilidad",
  },
  { key: "invited_participants_number", label: "No. Invitados", value: 50 },
  {
    key: "main_occupation_without_other",
    label: "Tipo de asistentes",
    value: "Estudiantes y profesionales",
  },
  { key: "participant_count", label: "No. Asistentes", value: 45 },
  { key: "female_participants", label: "No. Hombres", value: 20 },
  { key: "male_participants", label: "No. Mujeres", value: 25 },
  { key: "other_participants", label: "No. Otros", value: 0 },
  {
    key: "organizing_institutions",
    label: "Actores involucrados",
    value: "Universidad XYZ",
  },
  { key: "component", label: "Componente", value: "Educación" },
  { key: "axis", label: "Eje", value: "Sostenibilidad" },
  {
    key: "gcf_activities",
    label: "Actividad GCF",
    value: "Actividad de concienciación",
  },
  {
    key: "event_agenda",
    label: "Agenda",
    value: "Agenda detallada del evento",
  },
  {
    key: "event_invitation",
    label: "Convocatoria: Evidencia",
    value: "Invitación enviada por correo",
  },
  {
    key: "attendance_list",
    label: "Lista de asistencia",
    value: "Lista de asistencia firmada",
  },
  {
    key: "conclusion",
    label: "Resultados: Recomendaciones - Pasos a seguir",
    value: "Conclusiones y próximos pasos",
  },
  {
    key: "photo_register",
    label: "Registro fotográfico",
    value: "Fotos del evento",
  },
  { key: "link", label: "Evidencias", value: "Enlace a los recursos" },
];

const ReportsPage: NextPage = () => {
  const [events, setEvents] = useState<EventsData[]>([]);
  const [counts, setCounts] = useState<NestedDictionary>({});
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [reportId, setReportId] = useState<string | null>(null);

  useEffect(() => {
    CalendarRepository.fetchEvents()
        .then((data: DataFormat) => {
          const formattedEvents = CalendarController.formatEvents(data).map(event => ({
            ...event,
            city: event.city.toLowerCase()
          }))

          setCounts(MapController.updateCountAssistants(formattedEvents));
          setEvents(formattedEvents);
        })
        .catch(error => {
          console.error("Error fetching events:", error);
        })
  }, []);

  const fetchPdf = async (selectedReportId: string) => {
    try {
      const response = await fetch(`/api/generate-pdf?reportId=${selectedReportId}`);
      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url); // Set the generated URL for the PDF
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
    fetchPdf(selectedId);
  };

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
                <MenuItem value="1">Evento 12312431</MenuItem>
                <MenuItem value="2">Evento 232342</MenuItem>
                <MenuItem value="3">Evento 12312431</MenuItem>
                <MenuItem value="4">Evento 232342</MenuItem>
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
              <LoadingAnimation/>
          )}
        </div>
      </div>
  );
};

export default ReportsPage;