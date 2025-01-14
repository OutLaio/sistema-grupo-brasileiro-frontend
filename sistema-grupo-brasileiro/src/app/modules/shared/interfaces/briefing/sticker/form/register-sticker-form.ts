import { I_Briefing_Request } from "../../../project/form/briefing-form";
import { I_Project_Request } from "../../../project/form/project-form";
import { I_Sticker_Form_Data } from "./sticker-form";

export interface I_Sticker_Request {
  project: I_Project_Request;
  briefing: I_Briefing_Request;
  sticker: I_Sticker_Form_Data;
}
