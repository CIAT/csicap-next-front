import { DataFormat, DataItem, FormattedBeneficiary, TechnicalBeneficiaries } from "@/interfaces/Components/TechnicalComponent";

class ProfessionalController {
    static formatEvents(data: DataItem[]): FormattedBeneficiary[] {
        return data.map((item: DataItem) => ({
            ...item.data, // Extraer los datos de la propiedad `data`
            province: item.data.department_where_you_work,
            city: item.data.municipalities_where_you_work,
            crop: item.data.crops_worked_last_12_months,
            academicLevel: item.data.highest_educational_level,
            institution: item.data.affiliated_guild_or_organization,
            age_tc: item.data.age_tc,
            date: item.data.submitted_date_tec
        }));
    }

    static extractProvincesCode(events: TechnicalBeneficiaries[]): string[] {
        const uniqueCodes = new Set<string>();

        events.forEach(event => {
            const province = event.muni_res_tec;

            if (!province) return;

            uniqueCodes.add(province);
        });

        return Array.from(new Set(uniqueCodes));
    }
}

export default ProfessionalController;