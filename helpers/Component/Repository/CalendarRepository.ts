import {DataFormat, Event, EventFormat} from "@/interfaces";
import {Trained} from "@/interfaces/Components/AssistanceComponent";
import {NEXT_PUBLIC_URL_GET_EVENTS, NEXT_PUBLIC_URL_GET_EVENTS_CALENDAR} from "@/helpers/localVariables";

class CalendarRepository {
    
    static async fetchEvents(): Promise<Trained> {
        const url = NEXT_PUBLIC_URL_GET_EVENTS;
       
        if(!url){
            return <Trained>{};
        }
        const response = await fetch(`/api/verify-token?shortName=${url}`);
       
        if (!response.ok) {
            throw new Error("Failed to fetch events");
        }
        return  await response.json();
    }

    static async fetchCalendarEvents(): Promise<DataFormat> {
        const url = NEXT_PUBLIC_URL_GET_EVENTS_CALENDAR;
        if(!url){
            return <DataFormat>{};
        }
        const response = await fetch(`/api/verify-token?shortName=${url}`);
        if (!response.ok) {
            throw new Error("Failed to fetch events");
        }
        return await response.json();
    }

    static async fetchCustomEvent(): Promise<EventFormat> {
        const url = NEXT_PUBLIC_URL_GET_EVENTS;
        if(!url){
            return <EventFormat>{};
        }

        const response = await fetch(`/api/verify-token?shortName=${url}`);

    
        if (!response.ok) {
            throw new Error("Failed to fetch events");
        }
        return await response.json();
    }
}



export default CalendarRepository;