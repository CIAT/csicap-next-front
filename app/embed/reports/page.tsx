import {NextPage} from "next";
import ReportsPage from "@/app/reports/page";
import embedStyle from "./reports.module.css";

const EmbedReports:NextPage = () => {
  return(
      <ReportsPage customStyles={embedStyle}/>
  );
}

export default EmbedReports;