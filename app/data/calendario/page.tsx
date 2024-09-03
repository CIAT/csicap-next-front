"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "dayjs/locale/es";
import updateLocale from "dayjs/plugin/updateLocale";
import style from "./calendar.module.css";
import CalendarModal from "@/components/Modals/CalendarModal/CalendarModal";
import MapComponent from "@/components/data/Map/MapComponent";
import { EventsData, DataFormat, sectionStateData } from "@/interfaces";
import CalendarRepository from "@/helpers/Component/Repository/CalendarRepository";
import CalendarController from "@/helpers/Component/Controller/CalendarController";
import { Card, Container } from "@mui/material";
import ChartCardComponent from "@/components/events/chartCard";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"


dayjs.extend(updateLocale);
dayjs.locale("es");
dayjs.updateLocale("es", {
  weekdays: [
    "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"
  ],
  months: [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ]
});

const localizer = dayjsLocalizer(dayjs);

export default function DataCalendarResults() {
  const [events, setEvents] = useState<EventsData[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventsData[]>(
    events
  );
  const [dataCalendarResp, setDataCalendarResp] = useState<number>(0);
  const [selectedEvent, setSelectedEvent] = useState<EventsData | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sectionState, setSectionState] = useState<sectionStateData>({
    axe: "",
    crop: "",
    province: ""
  });
  const [cropState, setCropState] = useState<string[]>([]);
  const [axesState, setAxesState] = useState<string[]>([]);
  const [provinceState, setProvinceState] = useState<string[]>([]);

  useEffect(() => {
    CalendarRepository.fetchEvents()
      .then((data: DataFormat) => {
        const formattedEvents = CalendarController.formatEvents(data);
        const uniqueAxes = CalendarController.getUniqueAxes(formattedEvents);
        const uniqueCrop = CalendarController.getUniqueCrops(formattedEvents);
        const uniqueProvinces = CalendarController.extractProvinces(formattedEvents);
        setEvents(formattedEvents);
        setFilteredEvents(formattedEvents);
        setAxesState([...uniqueAxes]);
        setCropState([...uniqueCrop]);
        setProvinceState([...uniqueProvinces]);
        setDataCalendarResp(200);
      })
      .catch(error => {
        console.error("Error fetching events:", error);
        setDataCalendarResp(-1); // Set error state
      });
  }, []);

  useEffect(() => {
    setSectionState(sectionState);
  }, [sectionState]);

  const filterEvents = (state: sectionStateData) => {
    let tempEvens: EventsData[] = [];
    tempEvens = CalendarController.filterEventsByCrop(events, state.crop);
    tempEvens = CalendarController.filterEventsByProvince(tempEvens, state.province);
    tempEvens = CalendarController.filterEventsByAxe(tempEvens, state.axe);

    setFilteredEvents(tempEvens);
  };

  const handleSelectedEvent = (event: EventsData) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };

  const messages = {
    date: "Fecha",
    time: "Hora",
    event: "Evento",
    allDay: "Todo el día",
    week: "Semana",
    work_week: "Semana laboral",
    day: "Día",
    month: "Mes",
    previous: "Anterior",
    next: "Siguiente",
    yesterday: "Ayer",
    tomorrow: "Mañana",
    today: "Hoy",
    agenda: "Agenda",
    noEventsInRange: "No hay eventos en este rango",
    showMore: (total: number) => `+ Ver más (${total})`
  };

  return (
    <ChartCardComponent title="esto" header={<></>}>
      <FullCalendar
        plugins={[
          dayGridPlugin
        ]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth'
        }}
        events={filteredEvents.map(event => {
          const today = new Date();
          const eventEndDate = new Date(event.datesEnd);

          let backgroundColor;
          let borderColor;

          if (event.form_state === '1' && eventEndDate < today) {
            backgroundColor = '#ff0000';
            borderColor = '#ff0000';
          } else if (event.form_state === '0') {
            backgroundColor = '#80c41c';
            borderColor = '#80c41c';
          } else {
            backgroundColor = '#0e6e8c';
            borderColor = '#0e6e8c';
          }

          return {
            ...event,
            backgroundColor,
            borderColor
          };
        })}
      />
    </ChartCardComponent>
  );
}