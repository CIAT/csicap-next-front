export interface FormattedBeneficiary extends TecnicalBeneficiaries {
    province: string;
    city: string;
    crop: string;
    academicLevel: string;
    institution: string;
}
export interface TecnicalBeneficiaries {
    highest_educational_level: string;
    ethnic_affiliation: string;
    affiliated_guild_or_organization: string[];
    department_where_you_work: string[];
    current_position_in_guild: string;
    municipalities_where_you_work: string[];
    gender_at_birth: string;
    crops_worked_last_12_months: string[];
    professional_field_last_12_months: string[];
    age: string;
}

export interface DataItem {
    data: TecnicalBeneficiaries;
    created_at: string;
    unique_row_id: string;
}

export type DataFormat = DataItem[];