import { EventFormat } from "@/interfaces/Components/Events";
import EventsController from "@/helpers/Component/Controller/EventsController";
import { EventsData } from "@/interfaces";
import {DataFormat} from "@/interfaces/Components/BeneficiariesComponent";
import {TechnicalBeneficiaries} from "@/interfaces/Components/TechnicalComponent";
import {MappedTrained, Trained} from "@/interfaces/Components/AssistanceComponent";

export const getUniqueValuesFunctionsEvents = () => [
    (events: EventFormat[]) =>
        EventsController.getUniqueValues(events, "component", true),
    (events: EventFormat[]) =>
        EventsController.getUniqueValues(events, "eje", true),
    (events: EventFormat[]) =>
        EventsController.getInstitutionCategories(events, "institution", true, EventsController.predefinedInstitutions),
    (events: EventFormat[]) =>
        EventsController.getUniqueValues(events, "crop", true),
    (events: EventFormat[]) =>
        EventsController.getUniqueValues(events, "province"),
    (events: EventFormat[]) =>
        EventsController.getUniqueValues(events, "city"),
];

export const getUniqueValuesFunctionsTrained = () => [
    (events: MappedTrained[]) =>
        EventsController.getUniqueValues(events, "sex_complete"),
    (events: MappedTrained[]) =>
        EventsController.getAgeRanges(events, "age"),
    (events: MappedTrained[]) =>
        EventsController.getUniqueValues(events, "pr_primary_crop"),
    (events: MappedTrained[]) =>
        EventsController.getUniqueValues(events, "group_ocupations"),
    (events: MappedTrained[]) =>
        EventsController.getUniqueValues(events, "dep_res_complete_label"),
    (events: MappedTrained[]) =>
        EventsController.getUniqueValues(events, "muni_res_complete_label"),
    (events: MappedTrained[]) =>
        EventsController.getUniqueValues(events, "organization_affiliation_complete", true),
];

export const getUniqueValuesFunctionsProfessionals = () => [
    (events: TechnicalBeneficiaries[]) =>
        EventsController.getUniqueValues(events, "highest_educational_level"),
    (events: TechnicalBeneficiaries[]) =>
        EventsController.getUniqueValues(events, "gender_at_birth"),
    (events: TechnicalBeneficiaries[]) =>
        EventsController.getUniqueValues(events, "crops_worked_last_12_months", true),
    (events: TechnicalBeneficiaries[]) =>
        EventsController.getInstitutionCategories(events, "affiliated_guild_or_organization", true),
];

export const getUniqueValuesFunctionsCalendar = () => [
    (events: EventsData[]) =>
        EventsController.getUniqueValues(events, "component", true),
    (events: EventsData[]) =>
        EventsController.getUniqueValues(events, "eje", true),
    (events: EventsData[]) =>
        EventsController.getInstitutionCategories(events, "institution", true, EventsController.predefinedInstitutions),
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
        EventsController.getInstitutionCategories(events, "gremio", false),
    (events: DataFormat[]) =>
        EventsController.getUniqueValues(events, "pr_dpto_farm"),
    (events: DataFormat[]) =>
        EventsController.getUniqueValues(events, "pr_muni_farm"),
];

export type FilterFunction<T, U> = (data: T[], value: U) => T[];

export const filterFunctions: Record<string, FilterFunction<any, any>> = {
    date: <T extends { date: string | Date, event_type: string }>(data: T[], value: [Date | null, Date | null]) =>
        EventsController.getEventsByStartDate<T>(data, value[0], value[1]),

    category: <T extends { category: string }>(data: T[], category: string) =>
        data.filter(item => item.category === category),
};

export const filterFunctionsEvents: Record<
    string,
    (events: EventFormat[], value: string) => EventFormat[]
> = {
    component: (events, value) =>
        EventsController.filterEventsByValue(events, "component", value, true),
    axis: (events, value) =>
        EventsController.filterEventsByValue(events, "eje", value, true),
    institution: (events, value) =>
        EventsController.filterEventsByInstitution(events, "institution", value, EventsController.predefinedInstitutions, true),
    crop: (events, value) =>
        EventsController.filterEventsByValue(events, "crop", value, true),
    department: (events, value) =>
        EventsController.filterEventsByValue(events, "province", value),
    city: (events, value) =>
        EventsController.filterEventsByValue(events, "city", value),
};

export const filterFunctionsTrained: Record<
    string,
    (events: MappedTrained[], value: string) => MappedTrained[]
> = {
    gender: (events, value) =>
        EventsController.filterEventsByValue(events, "sex_complete", value),
    age: (events, value) =>
        EventsController.filterEventsByAgeRange(events, "age", value),
    crop: (events, value) =>
        EventsController.filterEventsByValue(events, "pr_primary_crop", value),
    occupation: (events, value) =>
        EventsController.filterEventsByValue(events, "group_ocupations", value),
    department: (events, value) =>
        EventsController.filterEventsByValue(events, "dep_res_complete_label", value),
    city: (events, value) =>
        EventsController.filterEventsByValue(events, "muni_res_complete_label", value),
    institution: (events, value) =>
        EventsController.filterEventsByValue(events, "organization_affiliation_complete", value, true)
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
    institution: (events, value) =>
        EventsController.filterEventsByInstitution(events, "affiliated_guild_or_organization", value, undefined, true),
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
        EventsController.filterEventsByValue(events, "city", value)
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
        EventsController.filterEventsByInstitution(events, "gremio", value),
    department: (events, value) =>
        EventsController.filterEventsByValue(events, "pr_dpto_farm", value),
    city: (events, value) =>
        EventsController.filterEventsByValue(events, "pr_muni_farm", value),
};