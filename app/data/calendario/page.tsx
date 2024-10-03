"use client";

import { useEffect, useState } from "react";
import styles from "./calendar.module.css";
import cardStyle from "@/components/calendar/Card/cardComponent.module.css";
import { EventsData, DataFormat, sectionStateData } from "@/interfaces";
import CalendarRepository from "@/helpers/Component/Repository/CalendarRepository";
import CalendarController from "@/helpers/Component/Controller/CalendarController";
import ChartCardComponent from "@/components/events/chartCard";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"
import CalendarModal from "@/components/Modals/CalendarModal/CalendarModal";
import dayjs from "dayjs";
import MapComponent from "@/components/data/Map/MapComponent";
import OverviewCard from "@/components/calendar/overvieww";
import ToolbarFilter from "@/components/ToolbarFilter/ToolbarFilter";
import CardComponent from "@/components/calendar/Card/CardComponent";
import {className} from "postcss-selector-parser";
import LoadingAnimation from "@/components/loadingAnimation";

import MapController from "@/helpers/Component/Controller/MapController";

export default function DataCalendarResults() {
  const [events, setEvents] = useState<EventsData[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventsData[]>(
    events
  );
  const [filtersApplied, setFiltersApplied] = useState(false);

  const [dataCalendarResp, setDataCalendarResp] = useState<number>(0);
  const [selectedEvent, setSelectedEvent] = useState<EventsData | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sectionState, setSectionState] = useState<sectionStateData>({
    axe: "",
    crop: "",
    city: ""
  });
  const [cropState, setCropState] = useState<string[]>([]);
  const [axesState, setAxesState] = useState<string[]>([]);
  const [cityState, setCityState] = useState<string[]>([]);
  const [counts, setCounts] = useState<Record<string, string>>({});

  const handleEventClick = (clickInfo: any) => {
    setSelectedEvent(clickInfo.event.extendedProps);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };

  useEffect(() => {
    CalendarRepository.fetchEvents()
      .then((data: DataFormat) => {
        const formattedEvents = CalendarController.formatEvents(data).map(event => ({
          ...event,
          axe: event.eje.map(eje => eje.toLowerCase()),
          crop: event.crop.map(crop => crop.toLowerCase()),
          city: event.city.toLowerCase(),
        }));

        setCounts(MapController.updateCountEventsByCity(formattedEvents));

        const uniqueAxes = CalendarController.getUniqueAxes(formattedEvents);
        const uniqueCrop = CalendarController.getUniqueCrops(formattedEvents);
        const uniqueCities = CalendarController.extractCities(formattedEvents);
        setEvents(formattedEvents);
        setFilteredEvents(formattedEvents);
        setAxesState([...uniqueAxes]);
        setCropState([...uniqueCrop]);
        setCityState([...uniqueCities]);
        setDataCalendarResp(200);
      })
      .catch(error => {
        console.error("Error fetching events:", error);
        setDataCalendarResp(-1);
      });
  }, []);

  useEffect(() => {
    setSectionState(sectionState);
  }, [sectionState]);

  const filterEvents = (state: sectionStateData) => {
    let tempEvents: EventsData[] = [];

    const normalizedState = {
      axe: state.axe.toLowerCase(),
      crop: state.crop.toLowerCase(),
      city: state.city.toLowerCase(),
    };

    tempEvents = CalendarController.filterEventsByCrop(events, normalizedState.crop.toLowerCase());
    tempEvents = CalendarController.filterEventsByCities(tempEvents, normalizedState.city.toLowerCase());
    tempEvents = CalendarController.filterEventsByAxe(tempEvents, normalizedState.axe.toLowerCase());

    setSectionState((prev: sectionStateData) => ({
      ...prev,
      city: normalizedState.city,
    }));

    if (normalizedState.city === '') {
      MapController.resetSelectedCity();
    }

    setFilteredEvents(tempEvents);

    if (normalizedState.axe || normalizedState.crop || normalizedState.city) {
      setFiltersApplied(true);
    } else {
      setFiltersApplied(false);
    }
  };


  const resetFilters = () => {
    setSectionState({
      axe: "",
      crop: "",
      city: ""
    });
    MapController.resetSelectedCity();
    setFilteredEvents(events);
    setFiltersApplied(false);
  };

  return (
    <div className={styles.container}>
      {dataCalendarResp === 200 ? (
          <>
            <div className={styles.card_container}>
              <div className={styles.overview}>
                <CardComponent title="Vision General" header={<></>} style={cardStyle}>
                  <OverviewCard></OverviewCard>
                </CardComponent>
              </div>
              <div className={styles.sub_card_container}>
                <ChartCardComponent title="Calendario de eventos" header={
                  <div className={styles.filter_button_container}>
                    <ToolbarFilter
                        filterEvents={(newState: sectionStateData) => filterEvents(newState)}
                        axesState={axesState}
                        cropState={cropState}
                        cityState={cityState}
                        sectionState={sectionState}
                        setSectionState={setSectionState}
                    />
                    {filtersApplied && (
                        <button onClick={resetFilters} className={`${styles.button} ${styles.reset_button}`}>
                          Restaurar
                        </button>
                    )}
                  </div>
                }>
                  <FullCalendar
                      plugins={[dayGridPlugin]}
                      headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: ''
                      }}
                      height='100%'
                      fixedWeekCount={false}
                      events={filteredEvents.map(event => {
                        const today = new Date();
                        const eventEndDate = new Date(event.datesEnd);

                        let backgroundColor;
                        let borderColor;

                        if (event.form_state === '1' && eventEndDate < today) {
                          backgroundColor = '#c84e42';
                          borderColor = '#c84e42';
                        } else if (event.form_state === '0') {
                          backgroundColor = '#80C41C';
                          borderColor = '#80C41C';
                        } else {
                          backgroundColor = '#FECF00';
                          borderColor = '#FECF00';
                        }

                        return {
                          ...event,
                          backgroundColor,
                          borderColor
                        };
                      })}
                      eventClick={handleEventClick}
                  />
                </ChartCardComponent>
              </div>
            </div>
            <div className={styles.card_container}>
              <ChartCardComponent title="Eventos por departamento" header={<></>}>
                <MapComponent
                    data={counts}
                    polygons={CalendarController.extractCities(filteredEvents).map(city => city.toLowerCase())}
                    filterData={(newState: sectionStateData) => filterEvents(newState)}
                />
              </ChartCardComponent>
            </div>
          </>
      ) : dataCalendarResp === 0 ? (
          <div className={styles.loading_container}>
            <div className={styles.loading}>
              <LoadingAnimation/>
            </div>
          </div>
      ) : (
          "Ups! something went wrong, try later"
      )},
      {
      selectedEvent && (
          <CalendarModal
            title={selectedEvent.name}
            show={modalIsOpen}
            handleClose={closeModal}
            //@ts-ignore
            //TODO: fix this datexx
            eventDate={dayjs(selectedEvent.initialDate).format("YYYY-MM-DD")}
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
        )
      }
    </div >
  );
}