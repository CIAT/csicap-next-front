import EventPage from "@/app/events/page";
import {NextPage} from "next";
import embedStyles from "./events.module.css";

const EmbedEvents:NextPage = () => {
  return(
      <EventPage customStyles={embedStyles}/>
  );
}

export default EmbedEvents