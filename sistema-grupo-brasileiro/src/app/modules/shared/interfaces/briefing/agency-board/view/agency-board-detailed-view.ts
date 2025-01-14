import { I_Briefing_Data } from "../../../project/view/briefing-view";
import { I_Project_Data } from "../../../project/view/project-view";
import { I_Agency_Board_Data } from "./agency-board-view";

export interface I_Agency_Board_Response {
  bAgencyBoard: I_Agency_Board_Data;
  project: I_Project_Data;
  briefing: I_Briefing_Data;
}
