export interface Trained {
    pr_primary_crop: string;
    sex_complete: string;
    group_ocupations: string;
    age: string;
    gcf_activities: string[];
    muni_res_complete_code: string;
    dep_res_complete_label: string;
    muni_res_complete_label: string;
    start_date: string;
}

export interface MappedTrained {
    pr_primary_crop: string;
    sex_complete: string;
    group_ocupations: string;
    age: string;
    gcf_activities: string[];
    muni_res_complete_code: string;
    dep_res_complete_label: string;
    muni_res_complete_label: string;
    date: string;
}

export interface MappedTrained extends Omit<Trained, "start_date"> {
    date: string;
}