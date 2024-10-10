import { DataFormat, Event, EventFormat } from "@/interfaces";

class CalendarRepository {
    static async fetchEvents(): Promise<DataFormat> {
        const url = process.env.NEXT_PUBLIC_URL_GET_EVENTS;
        console.log(url)
        if(!url){
            return <DataFormat>{};
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch events");
        }
        return response.json();
    }

    static async fetchCustomEvent(): Promise<EventFormat> {
        const url = process.env.NEXT_PUBLIC_URL_GET_EVENTS;
        console.log(url)
        if(!url){
            return <EventFormat>{};
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch events");
        }
        return response.json();
    }
}



export default CalendarRepository;