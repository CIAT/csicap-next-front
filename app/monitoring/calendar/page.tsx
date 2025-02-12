"use client";

import React, { useEffect, useState } from "react";
import cardStyle from "@/components/calendar/Card/cardComponent.module.css";
import { EventsData, DataFormat, sectionStateData } from "@/interfaces";
import CalendarRepository from "@/helpers/Component/Repository/CalendarRepository";
import CalendarController from "@/helpers/Component/Controller/CalendarController";
import ChartCardComponent from "@/components/events/chartCard";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import CalendarModal from "@/components/Modals/CalendarModal/CalendarModal";
import dayjs from "dayjs";
import MapComponent from "@/components/data/Map/MapComponent";
import OverviewCard from "@/components/calendar/overvieww";
import CardComponent from "@/components/calendar/Card/CardComponent";
import LoadingAnimation from "@/components/loadingAnimation";

import MapController from "@/helpers/Component/Controller/MapController";
import { NestedDictionary } from "@/interfaces/Map/NestedDictionary";
import { parseISO } from "date-fns";
import { NextPage } from "next";
import { PageCustomProps } from "@/interfaces/Components/PageCustomProps";
import { CustomTooltipData } from "@/interfaces/Components/CustomTooltip";
import EventsController from "@/helpers/Component/Controller/EventsController";
import CustomTooltip from "@/components/CustomTooltip/CustomTooltip";
import {
  handleOnClick,
  handleReset,
  handleTooltipChange,
} from "@/helpers/Component/CustomTooltip/CustomTooltipHandler";
import {
  filterFunctionsCalendar,
  getUniqueValuesFunctionsCalendar,
} from "@/interfaces/Components/CustomTooltipHandler";
import ExportDropdown from "@/components/download/DowloadDropDown/ExportDropdown";
import EventController from "@/helpers/Component/Controller/EventsController";

const CalendarPage: NextPage<PageCustomProps> = ({ customStyles }) => {
  const styles = customStyles || require("./calendar.module.css");

  const [events, setEvents] = useState<EventsData[]>([]);
  const [tempEventData, setTempEventData] = useState<EventsData[]>(events);
  const [filtersApplied, setFiltersApplied] = useState(false);

  const [dataCalendarResp, setDataCalendarResp] = useState<number>(0);
  const [selectedEvent, setSelectedEvent] = useState<EventsData | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sectionState, setSectionState] = useState<sectionStateData>({
    axe: "",
    crop: "",
    city: "",
  });
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
  const [counts, setCounts] = useState<NestedDictionary>({});

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
      label: "Institución",
    },
    {
      value: "",
      label: "Sistema productivo",
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
  const [formState, setFormState] = useState<string>("");

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
    "Institución",
    "Sistema productivo",
    "Departamento",
    "Municipio",
  ];

  const handleEventClick = (clickInfo: any) => {
    setSelectedEvent(clickInfo.event.extendedProps);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };

  useEffect(() => {
    CalendarRepository.fetchCalendarEvents()
      .then((data: DataFormat) => {
        const formattedEvents = CalendarController.formatEvents(data);

        const uniqueAxis = EventsController.getUniqueValues(
          formattedEvents,
          "eje",
          true
        );
        const uniqueComponents = EventsController.getUniqueValues(
          formattedEvents,
          "component",
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

        setCounts(MapController.updateCountEventsByCity(formattedEvents));

        setComponentState([...uniqueComponents]);
        setAxisState([...uniqueAxis]);
        setInstitutionState([...uniqueInstitutions]);
        setCropState([...uniqueCrops]);
        setDepartmentState([...uniqueDepartments]);
        setCityState([...uniqueCities]);
        setDataCalendarResp(200);

        setEvents(formattedEvents);
        setTempEventData(formattedEvents);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setDataCalendarResp(-1);
      });
  }, []);

  useEffect(() => {
    setTempEventData(
        EventController.getEventsByFormState(events, formState)
    );
  }, [formState]);

  return (
    <div className={styles.container}>
      {dataCalendarResp === 200 ? (
        <>
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
                filterFunctionsCalendar,
                getUniqueValuesFunctionsCalendar(),
                filterTypes
              )
            }
            onClick={() =>
              handleOnClick(
                tooltipValues,
                tempEventData,
                setTempEventData,
                filterFunctionsCalendar,
                filterTypes
              )
            }
            onReset={() =>
              handleReset(
                events,
                setTooltipOptions,
                setTooltipValues,
                setTempEventData,
                getUniqueValuesFunctionsCalendar(),
                placeHolders
              )
            }
            placeholders={placeHolders}
            filterTypes={filterTypes}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => String(option.value)}
          />
          <div style={{display:"flex", flexDirection:"row", height:"100%"}}>
            <div className={styles.card_container}>
              <div className={styles.overview}>
                <CardComponent
                  title="Estado"
                  header={<></>}
                  style={cardStyle}
                >
                  <OverviewCard
                      formState={formState}
                      setStatus={setFormState}
                  />
                </CardComponent>
              </div>
              <div className={styles.sub_card_container}>
                <ChartCardComponent
                  title="Calendario de eventos"
                  header={<></>}
                >
                  <FullCalendar
                    plugins={[dayGridPlugin]}
                    headerToolbar={{
                      left: "prev,next today",
                      center: "title",
                      right: "",
                    }}
                    height="100%"
                    fixedWeekCount={false}
                    events={tempEventData
                      .map((event) => {
                        const currentDate = new Date();
                        currentDate.setHours(0, 0, 0, 0);
                        const eventEndDate = event.datesEnd
                          ? parseISO(String(event.datesEnd))
                          : null;

                        let backgroundColor;
                        let borderColor;

                        if (
                          event.change_selection ===
                          "EL EVENTO HA SIDO CANCELADO"
                        ) {
                          backgroundColor = "#b9b9b9";
                          borderColor = "#b9b9b9";
                        } else if (
                          (eventEndDate &&
                            event.form_state === "1" &&
                            eventEndDate < currentDate) ||
                          event.not_assistant === "1"
                        ) {
                          backgroundColor = "#c84e42";
                          borderColor = "#c84e42";
                        } else if (event.form_state === "0" && event.not_assistant === "0") {
                          // Eventos que están completamente finalizados (form_state = 0)
                          backgroundColor = "#80C41C";
                          borderColor = "#80C41C";
                        } else if (
                          eventEndDate &&
                          eventEndDate >= currentDate
                        ) {
                          // Si el evento aún no ha terminado o es hoy
                          backgroundColor = "#FECF00";
                          borderColor = "#FECF00";
                        }

                        return {
                          ...event,
                          backgroundColor,
                          borderColor,
                        };
                      })
                      .filter((event) => event !== null)}
                    eventClick={handleEventClick}
                  />
                </ChartCardComponent>
              </div>
            </div>
            <div className={styles.card_container2}>
              <ChartCardComponent
                  title="Eventos por municipio"
                  header={
                    <div className={styles.header_container}>
                      <ExportDropdown
                          mapImageName={"calendario_map.png"}
                      />
                    </div>
                  }>
                <MapComponent
                    polygons={CalendarController.extractProvincesAndCities(tempEventData)}
                    data={counts}
                    useQuintile={true}
                    quintileType={"Eventos"}
                />
              </ChartCardComponent>
            </div>
          </div>
        </>
      ) : dataCalendarResp === 0 ? (
        <div className={styles.loading_container}>
          <div className={styles.loading}>
            <LoadingAnimation />
          </div>
        </div>
      ) : (
        "Ups! something went wrong, try later"
      )}
      ,
      {selectedEvent && (
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
      )}
    </div>
  );
};

export default CalendarPage;
