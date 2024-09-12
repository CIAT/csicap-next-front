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
import { MainBar } from "@/components/mainbar/MainBar";
import CustomToolbar from "@/components/CustomToolbar/CustomToolbar";
import ToolbarFilter from "@/components/ToolbarFilter/ToolbarFilter";
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

  const handleEventClick = (clickInfo: any) => {
    setSelectedEvent(clickInfo.event.extendedProps); // Use event's extendedProps to pass custom data
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };

  return (
    <>
      <div className={style["tableContainer"]}>
        {dataCalendarResp === 200 ? (
          <>
            <MainBar section="Calendario de eventos" />
            <div className={style["containerCaledar"]}>
              <div className={style["calendar"]}>
                <ChartCardComponent title="Calendario" header={
                    <ToolbarFilter
                        filterEvents={(newState: sectionStateData) => filterEvents(newState)}
                        axesState={axesState}
                        cropState={cropState}
                        provinceState={provinceState}
                        sectionState={sectionState}
                        setSectionState={setSectionState}
                    />
                }>
                  <FullCalendar
                    plugins={[dayGridPlugin]}
                    headerToolbar={{
                      left: 'prev,next today',
                      center: 'title',
                      right: 'dayGridMonth'
                    }}
                    fixedWeekCount={false}
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
                    eventClick={handleEventClick} // Handle event click to open the modal
                  />
                </ChartCardComponent>
                <ChartCardComponent title="Vision General" header={<></>}>
                  <></>
                </ChartCardComponent>
              </div>
              <div className={style["mapContainer"]}>
                <MapComponent provinces={CalendarController.extractProvinces(filteredEvents)} />
              </div>
            </div>
          </>
        ) : dataCalendarResp === 0 ? (
          "Loading..."
        ) : (
          "Ups! something went wrong, try later"
        )}
      </div>
      {selectedEvent && (
        <CalendarModal
          title={selectedEvent.name}
          show={modalIsOpen}
          handleClose={closeModal}
          eventDate={dayjs(selectedEvent.date).format("YYYY-MM-DD")}
          eventDatend={dayjs(selectedEvent.datesEnd).format("YYYY-MM-DD")}
          province={selectedEvent.province}
          axis={selectedEvent.eje}
          organizer={selectedEvent.responsable || "N/A"}
          objetive={selectedEvent.event_objective}
          city={selectedEvent.city}
          crop={selectedEvent.crop}
          institution={selectedEvent.institution}
          guesType={selectedEvent.guess_type}
          email={selectedEvent.email}
        />
      )}
    </>
  );
}