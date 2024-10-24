import { DataFormat, Event, EventFormat } from "@/interfaces";
import { ReportFormat, ReportNamesFormat } from "@/interfaces/Components/ReportsComponent";
import { report } from "process";

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
    
        const url = `${baseUrl}?id_event=${reportId}`; // Construct the URL to fetch the report by ID
        console.log(`URL que se manda al aws ${url}`);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error fetching event");
        }
    
        return await response.json(); // Return the specific event data as JSON
      }
}



export default ReportsRepository;