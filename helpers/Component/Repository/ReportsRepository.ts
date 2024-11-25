import { ReportFormat, ReportNamesFormat } from "@/interfaces/Components/ReportsComponent";

class ReportsRepository {
    static async fetchEvents(): Promise<ReportNamesFormat> {
        const url = process.env.NEXT_PUBLIC_URL_GET_REPORTS;
        if(!url){
            return <ReportNamesFormat>{};
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch events");
        }
        return response.json();
    }

    static async fetchEventById(reportId: string): Promise<ReportFormat> {
      const baseUrl = process.env.NEXT_PUBLIC_URL_GET_REPORTS; // Base URL for fetching reports
      if (!baseUrl) {
        return <ReportFormat>{}; // Return an empty object if the URL is not defined
      }
    
      // Encode the reportId to handle any special characters
      const encodedReportId = encodeURIComponent(reportId);
      const url = `${baseUrl}?id_event=${encodedReportId}`; // Construct the URL with encoded reportId
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error("Error fetching event");
      }
    
      return await response.json(); // Return the specific event data as JSON
    }
    
}



export default ReportsRepository;