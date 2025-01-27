import {TechnicalBeneficiaries} from "@/interfaces/Components/TechnicalComponent";
import {Trained} from "@/interfaces/Components/AssistanceComponent";

class TrainedController {
    static extractProvincesCode(events: Trained[]): string[] {
        const uniqueCodes = new Set<string>();

        events.forEach(event => {
            let code = event.muni_res_complete_code;
            if (!code) return;
            if (code.trim() == '') return;

            if (code.length === 4){
                code = `0${code}`;
            }

            uniqueCodes.add(code);
        });
        
        return Array.from(new Set(uniqueCodes));
    }
}

export default TrainedController;