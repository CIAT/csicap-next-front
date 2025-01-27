import {NextPage} from "next";
import ProducersPage from "@/app/monitoring/producers/page";
import embedStyles from "./producers.module.css";

const EmbedProducers:NextPage = () => {
  return(
      <ProducersPage customStyles={embedStyles}/>
  );
}

export default EmbedProducers;