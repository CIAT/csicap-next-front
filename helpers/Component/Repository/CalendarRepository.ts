import { DataFormat } from "@/interfaces";

class CalendarRepository {
    static async fetchEvents(): Promise<DataFormat> {
        const url = process.env.NEXT_PUBLIC_URL_GET_EVENTS;
        console.log(url)
        if(!url){
            return {
                id: '',
                created_at: '',
                data: []
            };
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch events");
        }
        return response.json();
    }
}

export default CalendarRepository;