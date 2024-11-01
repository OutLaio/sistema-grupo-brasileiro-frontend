import { I_Briefing_Data } from "../../../project/view/briefing-view";
import { I_Project_Data } from "../../../project/view/project-view";

export interface I_Agency_Board_Response {
  agencyBoard: any;
  project: I_Project_Data;
  briefing: I_Briefing_Data;
}
