"use client";

import { NextPage } from "next";
import styles from "./reports.module.css";
import Filter from "@/components/reports/Filter";
import PreviewCard from "@/components/reports/PreviewCard";
import ColombiaHeat from "@/components/maps/ColombiaHeat";
import PDFFile from "@/components/PDF/pdf";
import { PDFViewer } from "@react-pdf/renderer";
import MapComponent from "@/components/data/Map/MapComponent";
import {useEffect, useState} from "react";
import AssistanceRepository from "@/helpers/Component/Repository/AssistanceRepository";
import {DataFormat, EventsData} from "@/interfaces";
import CalendarController from "@/helpers/Component/Controller/CalendarController";
import CalendarRepository from "@/helpers/Component/Repository/CalendarRepository";
import MapController from "@/helpers/Component/Controller/MapController";
import {NestedDictionary} from "@/interfaces/Map/NestedDictionary";



const data = {
  main_event_objective: "Aumentar la conciencia sobre la sostenibilidad",
  event_type: "Taller",
  event_justification: "Necesidad de educar a la comunidad",
  guest_type: "Expertos en sostenibilidad",
  invited_participants_number: 50,
  main_occupation_without_other: "Estudiantes y profesionales",
  participant_count: 45,
  female_participants: 20,
  male_participants: 25,
  other_participants: 0,
  organizing_institutions: "Universidad XYZ",
  component: "Educación",
  axis: "Sostenibilidad",
  gcf_activities: "Actividad de concienciación",
  event_agenda: "Agenda detallada del evento",
  event_invitation: "Invitación enviada por correo",
  attendance_list: "Lista de asistencia firmada",
  conclusion: "Conclusiones y próximos pasos",
  photo_register: "Fotos del evento",
  link: "Enlace a los recursos",
};

const ReportsPage: NextPage = () => {
  const [events, setEvents] = useState<EventsData[]>([]);
  const [counts, setCounts] = useState<NestedDictionary>({});

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

  return (
    <div className="h-screen flex flex-row">
      <div className={styles.first_div}>
        <div className={styles.filter_div}>
          <Filter />
        </div>
        <div className={styles.preview_div}>
        </div>
      </div>

      <div className={styles.second_div}>
        <MapComponent
          data={counts}
          polygons={CalendarController.extractProvincesAndCities(events)}
          useQuintile={true}
        >
        </MapComponent>
      </div>
    </div>
  );
};

export default ReportsPage;