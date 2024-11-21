import AssistancePage from "@/app/assistance/page";
import {NextPage} from "next";
import embedStyles from "./assistance.module.css";

const EmbedAssistance:NextPage = () => {
  return(
      <AssistancePage customStyles={embedStyles}/>
  );
}

export default EmbedAssistance;