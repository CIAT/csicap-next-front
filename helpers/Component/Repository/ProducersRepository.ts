import {DataFormat} from "@/interfaces/Components/BeneficiariesComponent";
import {NEXT_PUBLIC_URL_GET_PRODUCERS} from "@/helpers/localVariables";

class ProducersRepository {
    static async fetchEvents(): Promise<DataFormat[]> {
        const url = NEXT_PUBLIC_URL_GET_PRODUCERS;
        if(!url){
            return <DataFormat[]>{};
        }

        const response = await fetch(`/api/verify-token?shortName=${url}`);
        if (!response.ok) {
            throw new Error("Failed to fetch events");
        }
        return response.json();
    }
}

export default ProducersRepository;