import { DataFormat, EventsData } from "@/interfaces";
import dayjs from "dayjs";

class CalendarController {
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

    static filterEventsByCrop(events: EventsData[], crop: string): EventsData[] {
        if (crop === "") {
            return events;
        }
        return events.filter(event => event.crop.includes(crop));
    }

    static filterEventsByProvince(events: EventsData[], province: string): EventsData[] {
        if (province === "") {
            return events;
        }
        return events.filter(event => event.province.includes(province));
    }

    static filterEventsByAxe(events: EventsData[], axe: string): EventsData[] {
        if (axe === "") {
            return events;
        }
        return events.filter(event => event.eje.includes(axe));
    }
}

export default CalendarController;