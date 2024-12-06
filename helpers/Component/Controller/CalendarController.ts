import { DataFormat, Event, EventFormat, EventsData } from "@/interfaces";
import dayjs from "dayjs";

class CalendarController {
    static removeAccents(input: string): string {
        return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    static getUniqueAxes(data: EventsData[]): string[] {
        const axes: string[] = data.flatMap(data => data.eje);
        return Array.from(new Set(axes));
    }

    static getUniqueCrops(data: EventsData[]): string[] {
        const crops: string[] = data.flatMap(data => data.crop);
        return Array.from(new Set(crops));
    }

    static formatEvents(data: DataFormat): EventsData[] {
        return data.data.map((event: EventsData) => ({
            ...event,
            initialDate: dayjs(event.date).toDate(), // Convert to Date object
            end: dayjs(event.datesEnd).endOf("day").toDate(),
            title: event.name,
            province: event.province,
            responsable: event.responsable,
            city: event.city || "",
            component: event.component || [],
            crop: event.crop || [],
            eje: event.eje || [],
            guess_type: event.guess_type || [],
            event_objective: event.event_objective,
            institution: event.institution || [],
            event_type: event.event_type,
            form_state: event.form_state,
            email: event.email
        }));
    }

    static formatEvent(data: EventFormat): Event[] {
        return data.data.map((event: Event) => ({
            ...event,
            initialDate: event.date, // Convert to Date object
            end: event.datesEnd,
            title: event.name,
            responsable: event.responsable,
            component: event.component,
            city: event.city || "",
            province: event.province || "",
            gcf_activities: event.gcf_activities || [],
            crop: event.crop || [],
            eje: event.eje || [],
            guess_type: event.guess_type || [],
            event_objective: event.event_objective,
            institution: event.institution || [],
            event_type: event.event_type,
            form_state: event.form_state,
            email: event.email
        }));
    }

    static extractProvinces(events: { province: string }[]): string[] {
        const provinces = events.map(event => event.province);
        return Array.from(new Set(provinces));
    }

    static extractCities(events: { city: string }[]): string[] {
        const cities = events.map(event => event.city);
        return Array.from(new Set(cities));
    }

    static extractProvincesAndCities(events: { province: string, city: string}[]): string[][]{
        const provincesAndCities = events.map(event => [event.province, event.city]);
        return Array.from(new Set(provincesAndCities));
    }

    static filterEventsByComponent(events: EventsData[], component: string): EventsData[] {
        if(component === ""){
            return events;
        }

        return events.filter(event => {
            return event.component.some(components => components === component);
        })
    }

    static filterEventsByInstitution(events: EventsData[], institution: string): EventsData[] {
        if(institution === ""){
            return events;
        }

        return events.filter(event => {
            return event.institution.some(tempInstitution => institution === tempInstitution);
        })
    }

    static filterEventsByCrop(events: EventsData[], crop: string): EventsData[] {
        if (crop === "") {
            return events;
        }
        const normalizedCrop = CalendarController.removeAccents(crop.toUpperCase());
        return events.filter(event =>
            event.crop.some(eventCrop =>
                CalendarController.removeAccents(eventCrop.toUpperCase()) === normalizedCrop
            )
        );
    }

    static filterEventsByDepartment(events: EventsData[], province: string): EventsData[] {
        if (province === "") {
            return events;
        }
        const normalizedProvince = CalendarController.removeAccents(province.toUpperCase());
        return events.filter(event =>
            CalendarController.removeAccents(event.province.toUpperCase()) === normalizedProvince
        );
    }

    static filterEventsByCity(events: EventsData[], city: string): EventsData[] {
        if (city === "") {
            return events;
        }
        const normalizedCity = CalendarController.removeAccents(city.toUpperCase());
        return events.filter(event =>
            CalendarController.removeAccents(event.city.toUpperCase()) === normalizedCity
        );
    }

    static filterEventsByAxis(events: EventsData[], axe: string): EventsData[] {
        if (axe === "") {
            return events;
        }
        const normalizedAxe = CalendarController.removeAccents(axe.toUpperCase());
        return events.filter(event =>
            event.eje.some(eventAxe =>
                CalendarController.removeAccents(eventAxe.toUpperCase()) === normalizedAxe
            )
        );
    }
}

export default CalendarController;