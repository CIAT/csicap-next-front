import { EventFormat } from "@/interfaces/Components/Events";
import EventsController from "@/helpers/Component/Controller/EventsController";
import { EventsData } from "@/interfaces";
import {DataFormat} from "@/interfaces/Components/BeneficiariesComponent";
import {TechnicalBeneficiaries} from "@/interfaces/Components/TechnicalComponent";
import {Assistance} from "@/interfaces/Components/AssistanceComponent";

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

export const getUniqueValuesFunctionsAssistants = () => [
    (events: Assistance[]) =>
        EventsController.getUniqueValues(events, "sex_complete"),
    (events: Assistance[]) =>
        EventsController.getAgeRanges(events, "age"),
    (events: Assistance[]) =>
        EventsController.getUniqueValues(events, "pr_primary_crop"),
    (events: Assistance[]) =>
        EventsController.getUniqueValues(events, "group_ocupations"),
    (events: Assistance[]) =>
        EventsController.getUniqueValues(events, "gcf_activities", true),
];

export const getUniqueValuesFunctionsProfessionals = () => [
    (events: TechnicalBeneficiaries[]) =>
        EventsController.getUniqueValues(events, "highest_educational_level"),
    (events: TechnicalBeneficiaries[]) =>
        EventsController.getUniqueValues(events, "gender_at_birth"),
    (events: TechnicalBeneficiaries[]) =>
        EventsController.getUniqueValues(events, "crops_worked_last_12_months", true),
    (events: TechnicalBeneficiaries[]) =>
        EventsController.getUniqueValues(events, "department_where_you_work", true),
    (events: TechnicalBeneficiaries[]) =>
        EventsController.getUniqueValues(events, "municipalities_where_you_work", true),
    (events: TechnicalBeneficiaries[]) =>
        EventsController.getUniqueValues(events, "affiliated_guild_or_organization", true),
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

export const filterFunctionsAssistants: Record<
    string,
    (events: Assistance[], value: string) => Assistance[]
> = {
    gender: (events, value) =>
        EventsController.filterEventsByValue(events, "sex_complete", value),
    age: (events, value) =>
        EventsController.filterEventsByAgeRange(events, "age", value),
    occupation: (events, value) =>
        EventsController.filterEventsByValue(events, "pr_primary_crop", value),
    crop: (events, value) =>
        EventsController.filterEventsByValue(events, "group_ocupations", value),
    gcfActivity: (events, value) =>
        EventsController.filterEventsByValue(events, "gcf_activities", value, true),
};

export const filterFunctionsProfessionals: Record<
    string,
    (events: TechnicalBeneficiaries[], value: string) => TechnicalBeneficiaries[]
> = {
    educationLevel: (events, value) =>
        EventsController.filterEventsByValue(events, "highest_educational_level", value),
    gender: (events, value) =>
        EventsController.filterEventsByValue(events, "gender_at_birth", value),
    crop: (events, value) =>
        EventsController.filterEventsByValue(events, "crops_worked_last_12_months", value, true),
    department: (events, value) =>
        EventsController.filterEventsByValue(events, "department_where_you_work", value, true),
    city: (events, value) =>
        EventsController.filterEventsByValue(events, "municipalities_where_you_work", value, true),
    institution: (events, value) =>
        EventsController.filterEventsByValue(events, "affiliated_guild_or_organization", value, true),
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