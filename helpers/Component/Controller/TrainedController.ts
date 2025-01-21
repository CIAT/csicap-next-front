import {TechnicalBeneficiaries} from "@/interfaces/Components/TechnicalComponent";
import {Trained} from "@/interfaces/Components/AssistanceComponent";

class TrainedController {
    static extractProvincesCode(events: Trained[]): string[] {
        const uniqueCodes = new Set<string>();

        events.forEach(event => {
            const code = event.muni_res_complete;
            if (code && code.trim() !== '') {
                uniqueCodes.add(code);
            }
        });
        
        return Array.from(new Set(uniqueCodes));
    }
}

export default TrainedController;