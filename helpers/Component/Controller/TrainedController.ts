import {TechnicalBeneficiaries} from "@/interfaces/Components/TechnicalComponent";
import {MappedTrained, Trained} from "@/interfaces/Components/AssistanceComponent";

class TrainedController {
    static colors = [
        "#FECF00",
        "#669d16",
        "#0E6E8C",
        "#00BFB3",
        "#FAAF41",
        "#C8A041",
        "#80C41C",
        "#D2D200",
        "#569aaf",
    ];

    static borderColors = [
        "#FECF00",
        "#669d16",
        "#0E6E8C",
        "#00BFB3",
        "#FAAF41",
        "#C8A041",
        "#80C41C",
        "#D2D200",
        "#569aaf",
    ];

    static generateBackgroundColors(elements: string[]): string[] {
        return elements.map((_, index) => this.colors[index % this.colors.length]);
    }

    static generateBorderColors(elements: string[]): string[] {
        return elements.map((_, index) => this.borderColors[index % this.borderColors.length]);
    }

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
            if (
                event[key] === null ||
                event[key] === "Nan" ||
                event[key] === "nan"
            ) {
                count++;
            }
        })

        return count;
    }
}

export default TrainedController;