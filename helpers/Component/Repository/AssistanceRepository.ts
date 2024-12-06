import {Assistance} from "@/interfaces/Components/AssistanceComponent";

class AssistanceRepository {
    static async getAssistanceData(): Promise<Assistance[]> {
        const url = process.env.NEXT_PUBLIC_URL_GET_ASSISTANCE;

        if (!url) {
            return <Assistance[]>{};
        }
    
        try {
            const response = await fetch(`/api/verify-token?shortName=${url}`);
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            return await response.json();
        } catch (error) {
            return <Assistance[]>{}; 
        }
    }
    
}

export default AssistanceRepository;