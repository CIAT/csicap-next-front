import { DataFormat, DataItem, FormattedBeneficiary, TechnicalBeneficiaries } from "@/interfaces/Components/TechnicalComponent";

class TechnicalController {

    static getUniqueCrops(data: TechnicalBeneficiaries[]): string[] {
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

    static transformToFormattedBeneficiary(
        beneficiaries: TechnicalBeneficiaries[]
    ): FormattedBeneficiary[] {
        return beneficiaries.map((beneficiary) => ({
            ...beneficiary, // Copia todas las propiedades de TechnicalBeneficiaries
            province: beneficiary.department_where_you_work[0] || '', // Asigna la primera provincia o un valor vacío si no existe
            city: beneficiary.municipalities_where_you_work[0] || '', // Asigna la primera ciudad o un valor vacío
            crop: beneficiary.crops_worked_last_12_months[0] || '', // Asigna el primer cultivo trabajado o un valor vacío
            academicLevel: beneficiary.highest_educational_level || '', // Asigna el nivel educativo más alto
            institution: beneficiary.affiliated_guild_or_organization[0] || '', // Asigna la primera organización o un valor vacío
        }));
    }


}

export default TechnicalController;