import { I_Briefing_Data } from "../../../project/view/briefing-view";
import { I_Project_Data } from "../../../project/view/project-view";
import { I_Sticker_Data } from "./sticker-view";

export interface I_Sticker_Response {
  sticker: I_Sticker_Data;
  project: I_Project_Data;
  briefing: I_Briefing_Data;
}
