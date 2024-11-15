import {Assistance} from "@/interfaces/Components/AssistanceComponent";

class AssistanceRepository {
    static async getAssistanceData(): Promise<Assistance[]> {
        const url = process.env.NEXT_PUBLIC_URL_GET_ASSISTANCE;
        if(!url){
            return <Assistance[]>{};
        }

        const response = await fetch(url);
        return await response.json();
    }
}

export default AssistanceRepository;