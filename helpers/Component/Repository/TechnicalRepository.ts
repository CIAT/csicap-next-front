import {DataFormat, DataItem} from "@/interfaces/Components/TechnicalComponent";

class TechnicalRepository {
    static async fetchEvents(): Promise<DataFormat> {
        const url = process.env.NEXT_PUBLIC_URL_GET_TECHNICIAN;
        if(!url){
            return <DataItem[]>{};
        }

        const response = await fetch(`/api/verify-token?shortName=${url}`);
        if (!response.ok) {
            throw new Error("Failed to fetch events");
        }
        return response.json();
    }
}

export default TechnicalRepository;