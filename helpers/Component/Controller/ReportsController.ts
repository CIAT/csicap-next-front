import {
  ReportFormat,
  Report,
  ReportNamesFormat,
  ReportNames,
} from "@/interfaces/Components/ReportsComponent";

class ReportsController {
  static formatHeaders(data: any): ReportNames[] {
    try {
      // Validate input structure
      if (!data || typeof data !== "object" || !Array.isArray(data.data)) {
        console.error("Invalid data format in formatHeaders:", data); // Log error
        throw new TypeError("Invalid data format");
      }
  
      // Map over the data to create formatted report headers
      return data.data.map((report: any, index: number) => {

        return {
          name: report.name || "N/A",
          event_id: report.event_id || "N/A",
          is_reported: report.is_reported || "0",
          not_assistant: report.not_assistant || "0",
          datesEnd: report.datesEnd || "N/A",
        };
      });
    } catch (error) {
      console.error("Error in formatHeaders:", error); // Log unexpected errors
      return []; // Return an empty array in case of an error
    }
  }
}

export default ReportsController;