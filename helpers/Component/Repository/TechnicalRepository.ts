import { DataFormat } from "@/interfaces/Components/TechnicalComponent";

class TechnicalRepository {
    static async fetchEvents(): Promise<DataFormat> {
        const response = await fetch("https://lcp5w7xuf1.execute-api.us-east-1.amazonaws.com/dev/technical-beneficiaries");
        if (!response.ok) {
            throw new Error("Failed to fetch events");
        }
        return response.json();
    }
}

export default TechnicalRepository;