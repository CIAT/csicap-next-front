import {Trained} from "@/interfaces/Components/AssistanceComponent";
import {NEXT_PUBLIC_URL_GET_ASSISTANCE} from "@/helpers/localVariables";

class AssistanceRepository {
    static async getAssistanceData(): Promise<Trained[]> {
        const url = NEXT_PUBLIC_URL_GET_ASSISTANCE;

        if (!url) {
            return <Trained[]>{};
        }
    
        try {
            const response = await fetch(`/api/verify-token?shortName=${url}`);
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            return await response.json();
        } catch (error) {
            return <Trained[]>{};
        }
    }
    
}

export default AssistanceRepository;