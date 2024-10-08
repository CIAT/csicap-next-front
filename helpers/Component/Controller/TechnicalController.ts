import { DataFormat, DataItem, FormattedBeneficiary, TechnicalBeneficiaries } from "@/interfaces/Components/TechnicalComponent";

class TechnicalController {

    static getUniqueCrops(data: TechnicalBeneficiaries[]): string[] {
        const crops: string[] = data.flatMap(data => data.crops_worked_last_12_months);
        return Array.from(new Set(crops));
    }

    static formatEvents(data: DataItem[]): FormattedBeneficiary[] {
        return data.map((item: DataItem) => ({
            ...item.data, // Extraer los datos de la propiedad `data`
            province: item.data.department_where_you_work, // No es un array, tomarlo directamente
            city: item.data.municipalities_where_you_work, // No es un array, tomarlo directamente
            crop: item.data.crops_worked_last_12_months, // No es un array, tomarlo directamente
            academicLevel: item.data.highest_educational_level, // Nivel académico
            institution: item.data.affiliated_guild_or_organization, // Organización o institución
            age_tc: item.data.age_tc // Edad
        }));
    }

    static extractProvinces(events: FormattedBeneficiary[]): string[] {
        const provinces = events.map(event => event.province);
        return Array.from(new Set(provinces));
    }

    static extractMunicipalitiesCode(events: TechnicalBeneficiaries[]): string[] {
        const uniqueCodes = new Set<string>();

        events.forEach(event => {
            if (event && Array.isArray(event.municipalities_code)) {
                event.municipalities_code.forEach(code => {
                    if (code && code.trim() !== '') {
                        uniqueCodes.add(code);
                    }
                });
            }
        });

        return Array.from(uniqueCodes);
    }


    static filterEventsByCrop(events: TechnicalBeneficiaries[], crop: string): TechnicalBeneficiaries[] {
        if (crop === "") {
            return events;
        }
        return events.filter(event => event.crops_worked_last_12_months.includes(crop));
    }

    static filterEventsByProvince(events: TechnicalBeneficiaries[], province: string): TechnicalBeneficiaries[] {
        if (province === "") {
            return events;
        }
        return events.filter(event => event.department_where_you_work.includes(province));
    }
}

export default TechnicalController;