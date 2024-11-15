export interface FormattedBeneficiary extends TechnicalBeneficiaries {
    province: string;
    city: string[];
    crop: string;
    academicLevel: string;
    institution: string[];
}

export interface TechnicalBeneficiaries {
    highest_educational_level: string;
    ethnic_affiliation: string;
    affiliated_guild_or_organization: string[]; // Cambiado a string
    department_where_you_work: string;
    current_position_in_guild: string;
    municipalities_where_you_work: string[]; // Cambiado a string
    gender_at_birth: string;
    crops_worked_last_12_months: string; // Cambiado a string
    professional_field_last_12_months: string[]; // Mantener si es array
    age_tc: string;
    municipalities_code: string[];
}

export interface DataItem {
    data: TechnicalBeneficiaries;
    created_at: string;
    unique_row_id: string;
}

export type DataFormat = DataItem[];