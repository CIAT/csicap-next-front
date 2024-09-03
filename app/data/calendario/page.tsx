"use client";

import { useEffect, useState } from "react";
import style from "./calendar.module.css";
import { EventsData, DataFormat, sectionStateData } from "@/interfaces";
import CalendarRepository from "@/helpers/Component/Repository/CalendarRepository";
import CalendarController from "@/helpers/Component/Controller/CalendarController";
import ChartCardComponent from "@/components/events/chartCard";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"


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