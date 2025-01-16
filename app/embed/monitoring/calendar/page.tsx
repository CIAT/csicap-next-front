import {NextPage} from "next";
import embedStyles from "./calendar.module.css";
import CalendarPage from "@/app/monitoring/calendar/page";

const EmbedCalendar:NextPage = () => {
  return(
      <CalendarPage customStyles={embedStyles}/>
  );
}

export default EmbedCalendar;