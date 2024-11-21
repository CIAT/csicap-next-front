import {NextPage} from "next";
import CalendarPage from "@/app/calendar/page";
import embedStyles from "./calendar.module.css";

const EmbedCalendar:NextPage = () => {
  return(
      <CalendarPage customStyles={embedStyles}/>
  );
}

export default EmbedCalendar;