import { EventFormat } from "@/interfaces/Components/Events";
import EventsController from "@/helpers/Component/Controller/EventsController";
import { EventsData } from "@/interfaces";
import {DataFormat} from "@/interfaces/Components/BeneficiariesComponent";

export const getUniqueValuesFunctionsEvents = () => [
    (events: EventFormat[]) =>
        EventsController.getUniqueValues(events, "component", true),
    (events: EventFormat[]) =>
        EventsController.getUniqueValues(events, "eje", true),
    (events: EventFormat[]) =>
        EventsController.getUniqueValues(events, "institution", true),
    (events: EventFormat[]) =>
        EventsController.getUniqueValues(events, "crop", true),
    (events: EventFormat[]) =>
        EventsController.getUniqueValues(events, "province"),
    (events: EventFormat[]) =>
        EventsController.getUniqueValues(events, "city"),
    (events: EventFormat[]) =>
        EventsController.getUniqueValues(events, "gcf_activities", true),
];

export const getUniqueValuesFunctionsCalendar = () => [
    (events: EventsData[]) =>
        EventsController.getUniqueValues(events, "component", true),
    (events: EventsData[]) =>
        EventsController.getUniqueValues(events, "eje", true),
    (events: EventsData[]) =>
        EventsController.getUniqueValues(events, "institution", true),
    (events: EventsData[]) =>
        EventsController.getUniqueValues(events, "crop", true),
    (events: EventsData[]) =>
        EventsController.getUniqueValues(events, "province"),
    (events: EventsData[]) =>
        EventsController.getUniqueValues(events, "city"),
];

export const getUniqueValuesFunctionsProducers = () => [
    (events: DataFormat[]) =>
        EventsController.getUniqueValues(events, "gen_name"),
    (events: DataFormat[]) =>
        EventsController.getUniqueValues(events, "type_property"),
    (events: DataFormat[]) =>
        EventsController.getUniqueValues(events, "pr_ethnic_group"),
    (events: DataFormat[]) =>
        EventsController.getUniqueValues(events, "pr_primary_crop"),
    (events: DataFormat[]) =>
        EventsController.getUniqueValues(events, "gremio"),
    (events: DataFormat[]) =>
        EventsController.getUniqueValues(events, "pr_dpto"),
    (events: DataFormat[]) =>
        EventsController.getUniqueValues(events, "pr_muni"),
];

export const filterFunctionsEvents: Record<
    string,
    (events: EventFormat[], value: string) => EventFormat[]
> = {
    component: (events, value) =>
        EventsController.filterEventsByValue(events, "component", value, true),
    axis: (events, value) =>
        EventsController.filterEventsByValue(events, "eje", value, true),
    institution: (events, value) =>
        EventsController.filterEventsByValue(events, "institution", value, true),
    crop: (events, value) =>
        EventsController.filterEventsByValue(events, "crop", value, true),
    department: (events, value) =>
        EventsController.filterEventsByValue(events, "province", value),
    city: (events, value) =>
        EventsController.filterEventsByValue(events, "city", value),
    gcfActivity: (events, value) =>
        EventsController.filterEventsByValue(events, "gcf_activities", value, true),
};

export const filterFunctionsCalendar: Record<
    string,
    (events: EventsData[], value: string) => EventsData[]
> = {
    component: (events, value) =>
        EventsController.filterEventsByValue(events, "component", value, true),
    axis: (events, value) =>
        EventsController.filterEventsByValue(events, "eje", value, true),
    institution: (events, value) =>
        EventsController.filterEventsByValue(events, "institution", value, true),
    crop: (events, value) =>
        EventsController.filterEventsByValue(events, "crop", value, true),
    department: (events, value) =>
        EventsController.filterEventsByValue(events, "province", value),
    city: (events, value) =>
        EventsController.filterEventsByValue(events, "city", value),
};

export const filterFunctionsProducers: Record<
    string,
    (events: DataFormat[], value: string) => DataFormat[]
> = {
    gender: (events, value) =>
        EventsController.filterEventsByValue(events, "gen_name", value),
    property: (events, value) =>
        EventsController.filterEventsByValue(events, "type_property", value),
    ethnic: (events, value) =>
        EventsController.filterEventsByValue(events, "pr_ethnic_group", value),
    primaryCrop: (events, value) =>
        EventsController.filterEventsByValue(events, "pr_primary_crop", value),
    guild: (events, value) =>
        EventsController.filterEventsByValue(events, "gremio", value),
    department: (events, value) =>
        EventsController.filterEventsByValue(events, "pr_dpto", value),
    city: (events, value) =>
        EventsController.filterEventsByValue(events, "pr_muni", value),
};