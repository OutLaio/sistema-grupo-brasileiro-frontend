import { I_Briefing_Request } from "../../../project/form/briefing-form";
import { I_Project_Request } from "../../../project/form/project-form";
import { I_Stickers_Form_Data } from "./stickers-form";

export interface I_Stickers_Request {
  project: I_Project_Request;
  briefing: I_Briefing_Request;
  sticker: I_Stickers_Form_Data;
}
