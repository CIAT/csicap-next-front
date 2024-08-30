export interface EventsData {
    date: Date;
    datesEnd: Date;
    name: string;
    province: string;
    responsable: string | null;
    city: string;
    crop: string[];
    eje: string[];
    guess_type: string[];
    event_objective: string;
    institution: string[];
    event_type: string;
    form_state: string;
    email: string;
}

export interface DataFormat {
    id: string;
    created_at: string;
    data: EventsData[];
}

export interface sectionStateData {
    axe: string;
    crop: string;
    province: string;
}