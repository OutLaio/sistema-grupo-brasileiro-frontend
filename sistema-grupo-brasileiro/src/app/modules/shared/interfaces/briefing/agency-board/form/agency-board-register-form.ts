import { I_Briefing_Request } from "../../../project/form/briefing-form";
import { I_Project_Request } from "../../../project/form/project-form";
import { I_Agency_Board_Data } from "./agency-board-form";


export interface I_Agency_Board_Request {
  project: I_Project_Request;
  briefing: I_Briefing_Request;
  angecyBoard: I_Agency_Board_Data;
}
