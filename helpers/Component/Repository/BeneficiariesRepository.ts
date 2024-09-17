import { DataFormat } from "@/interfaces/Components/BeneficiariesComponent";

class BeneficiariesRepository {
    static async fetchEvents(): Promise<DataFormat[]> {
        const response = await fetch("https://adi5xn1pwe.execute-api.us-east-1.amazonaws.com/dev/beneficiaries");
        if (!response.ok) {
            throw new Error("Failed to fetch events");
        }
        return response.json();
    }
}

export default BeneficiariesRepository;