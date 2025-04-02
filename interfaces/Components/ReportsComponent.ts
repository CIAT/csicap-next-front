export interface ReportFormat {
    id: string;
    created_at: string;
    data: Report;
}

export interface Report {
  forEach(arg0: (item: { label: string; value: string; }) => void): unknown;
  date: string;
  datesEnd: string;
  name: string;
  province: string;
    responsable: string;
  city?: string;
  //link: string;
  crop?: string[];
  eje?: string[];
  guess_type?: string[];
  event_objective: string;
  institution?: string[];
  event_type: string;
  email: string;
  event_justification: string;
  invited_participants_number: string;
  main_occupation_without_other: string[]; 
  participant_count: string;   
  female_participants: string;
  male_participants: string;
  other_participants: string;
  component: string[];
  gcf_activities: string[];
  conclusion : string;
  event_id: string;
  is_reported: string;
  not_assistant: string;
}

export interface ReportNames {
  name: string;
  is_reported: string;
  not_assistant: string;
  event_id: string;
  datesEnd: string;
}


export interface ReportNamesFormat {
  id: string;
  created_at: string;
  data: ReportNames[]; // Asegúrate de que este sea un arreglo
}