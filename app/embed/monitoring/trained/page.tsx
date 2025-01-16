import AssistancePage from "@/app/monitoring/trained/page";
import {NextPage} from "next";
import embedStyles from "./trained.module.css";

const EmbedAssistance:NextPage = () => {
  return(
      <AssistancePage customStyles={embedStyles}/>
  );
}

export default EmbedAssistance;