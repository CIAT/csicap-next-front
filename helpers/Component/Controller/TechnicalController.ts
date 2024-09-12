import { DataFormat, DataItem, FormattedBeneficiary, TecnicalBeneficiaries } from "@/interfaces/Components/TechnicalComponent";

class TechnicalController {

    static getUniqueCrops(data: TecnicalBeneficiaries[]): string[] {
        const crops: string[] = data.flatMap(data => data.crops_worked_last_12_months);
        return Array.from(new Set(crops));
    }

    static formatEvents(data: DataFormat): FormattedBeneficiary[] {
        return data.map((item: DataItem) => ({
            ...item.data, // Extraer los datos de la propiedad `data`
            province: item.data.department_where_you_work.join(', '),
            city: item.data.municipalities_where_you_work.join(', '),
            crop: item.data.crops_worked_last_12_months.join(', '),
            academicLevel: item.data.highest_educational_level,
            institution: item.data.affiliated_guild_or_organization.join(', '),
            age: item.data.age
        }));
    }

    static extractProvinces(events: FormattedBeneficiary[]): string[] {
        const provinces = events.map(event => event.province);
        return Array.from(new Set(provinces));
    }

    static filterEventsByCrop(events: TecnicalBeneficiaries[], crop: string): TecnicalBeneficiaries[] {
        if (crop === "") {
            return events;
        }
        return events.filter(event => event.crops_worked_last_12_months.includes(crop));
    }

    static filterEventsByProvince(events: TecnicalBeneficiaries[], province: string): TecnicalBeneficiaries[] {
        if (province === "") {
            return events;
        }
        return events.filter(event => event.department_where_you_work.includes(province));
    }

}

export default TechnicalController;