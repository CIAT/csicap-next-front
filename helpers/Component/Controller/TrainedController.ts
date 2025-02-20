import {TechnicalBeneficiaries} from "@/interfaces/Components/TechnicalComponent";
import {MappedTrained, Trained} from "@/interfaces/Components/AssistanceComponent";

class TrainedController {
    static extractProvincesCode(events: MappedTrained[]): string[] {
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

    static countDataWithoutInformation<T, K extends keyof T>(events: T[], key: K): number {
        let count: number = 0;

        events.forEach(event => {
            if (event[key] === null) {
                count++;
            }
        })

        return count;
    }
}

export default TrainedController;