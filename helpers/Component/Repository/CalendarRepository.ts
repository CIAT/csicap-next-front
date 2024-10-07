import { DataFormat } from "@/interfaces";

class CalendarRepository {
    static async fetchEvents(): Promise<DataFormat> {
        const url = "https://qhl00jvv1b.execute-api.us-east-1.amazonaws.com/dev/get-events";
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
}

export default CalendarRepository;