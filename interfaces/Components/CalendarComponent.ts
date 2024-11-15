export interface EventsData {
    date: Date;
    datesEnd: Date;
    name: string;
    province: string;
    responsable: string | null;
    female_participants: string;
    male_participants: string;
    other_participants: string;
    participant_count: string;
    city: string;
    crop: string[];
    eje: string[];
    guess_type: string[];
    event_objective: string;
    institution: string[];
    event_type: string;
    form_state: string;
    email: string;
    change_selection: string;
    not_assistant: string;
}

export interface Event {
    date: string;
    eje: string[];
    responsable: string;
    city: string;
    guess_type: string[];
    institution: string[];
    event_type: string;
    province: string;
    form_state: string;
    name: string;
    datesEnd: string;
    crop: string[];
    email: string | null;
    event_objective: string;
    event_id: string;
    participant_count: string;
  }
export interface DataFormat {
    id: string;
    created_at: string;
    data: EventsData[];
}

export interface EventFormat {
    id: string;
    created_at: string;
    data: Event[];
}

export interface sectionStateData {
    axe: string;
    crop: string;
    city: string;
}