import {
  ReportFormat,
  Report,
  ReportNamesFormat,
  ReportNames,
} from "@/interfaces/Components/ReportsComponent";

class ReportsController {
  static formatReport(data: ReportFormat): Report[] {
    return data.data.map((report: Report) => ({
      ...report,
      initialDate: report.date, // Convert to Date object
      end: report.datesEnd,
      title: report.name,
      province: report.province,
      responsable: report.responsable,
      city: report.city || "",
      // link: report.link,
      crop: report.crop || [],
      eje: report.eje || [],
      guess_type: report.guess_type || [],
      event_objective: report.event_objective,
      institution: report.institution || [],
      event_type: report.event_type,
      email: report.email,
      event_justification: report.event_justification,
      invited_participants_number: report.invited_participants_number,
      main_occupation_without_other: report.main_occupation_without_other || [],
      participant_count: report.participant_count,
      female_participants: report.female_participants,
      male_participants: report.male_participants,
      other_participants: report.other_participants,
      component: report.component || [],
      gcf_activities: report.gcf_activities || [],
      conclusion: report.conclusion,
      id: report.event_id,
      is_reported: report.is_reported,
      not_assistant: report.not_assistant,
    }));
  }

  static formatHeaders(data: any): ReportNames[] {
    // Asegurarse de que el dato recibido es un arreglo y tiene una propiedad 'data'.
    if (!data || !Array.isArray(data) || data.length === 0 || !data[0].data) {
      console.error("Invalid data format in formatHeaders:", data);
      throw new TypeError("Invalid data format");
    }
  
    // Procesar el arreglo de reportes contenido en la propiedad 'data' del primer objeto.
    return data[0].data.map((report: any) => ({
      name: report.name || "N/A",
      event_id: report.event_id || "NN/A",
      is_reported: report.is_reported || "0",
      not_assistant: report.not_assistant || "0",
    }));
  }
  
  
}

export default ReportsController;