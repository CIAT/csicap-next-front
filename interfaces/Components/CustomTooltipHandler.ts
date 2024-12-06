import {EventFormat} from "@/interfaces/Components/Events";
import EventsController from "@/helpers/Component/Controller/EventsController";

export const getUniqueValuesFunctionsEvents = () => [
    (events: EventFormat[]) => EventsController.getUniqueComponents(events),
    (events: EventFormat[]) => EventsController.getUniqueAxis(events),
    (events: EventFormat[]) => EventsController.getUniqueInstitutions(events),
    (events: EventFormat[]) => EventsController.getUniqueCrops(events),
    (events: EventFormat[]) => EventsController.getUniqueDepartments(events),
    (events: EventFormat[]) => EventsController.getUniqueCities(events),
    (events: EventFormat[]) => EventsController.getUniqueGCFActivities(events),
];

export const filterFunctionsEvents: Record<string, (events: EventFormat[], value: string) => EventFormat[]> = {
    component: EventsController.filterEventsByComponent,
    axis: EventsController.filterEventsByAxis,
    institution: EventsController.filterEventsByInstitution,
    crop: EventsController.filterEventsByCrop,
    department: EventsController.filterEventsByDepartment,
    city: EventsController.filterEventsByCity,
    gcfActivity: EventsController.filterEventsByCGFActivity,
};