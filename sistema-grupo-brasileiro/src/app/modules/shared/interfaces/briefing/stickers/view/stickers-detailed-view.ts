import { I_Briefing_Data } from "../../../project/view/briefing-view";
import { I_Project_Data } from "../../../project/view/project-view";
import { I_Stickers_View_Data } from "./stickers-view";

export interface I_Signpost_Response {
  signpost: I_Stickers_View_Data;
  project: I_Project_Data;
  briefing: I_Briefing_Data;
}
