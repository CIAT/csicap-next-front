import {NextPage} from "next";
import ProfessionalsPage from "@/app/professionals/page";
import embedStyles from "./professionals.module.css";

const EmbedProfessionals: NextPage = () => {
  return(
      <ProfessionalsPage customStyles={embedStyles}/>
  );
}

export default EmbedProfessionals;