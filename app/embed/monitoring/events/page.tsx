import EventPage from "@/app/monitoring/events/page";
import {NextPage} from "next";
import embedStyles from "./events.module.css";

const EmbedEvents:NextPage = () => {
  return(
      <EventPage customStyles={embedStyles}/>
  );
}

export default EmbedEvents