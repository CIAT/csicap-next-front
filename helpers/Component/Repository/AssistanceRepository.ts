import {Assistance} from "@/interfaces/Components/AssistanceComponent";

class AssistanceRepository {
    static async getAssistanceData(): Promise<Assistance[]> {
        const url = 'https://1my60gpxj7.execute-api.us-east-1.amazonaws.com/assistence-list';
        if(!url){
            return <Assistance[]>{};
        }

        const response = await fetch(url);
        return await response.json();
    }
}

export default AssistanceRepository;