import { I_Briefing_Request } from "../../../project/form/briefing-form";
import { I_Project_Request } from "../../../project/form/project-form";
import { I_Signpost_Form_Data } from "./signpost-form";

export interface I_Signpost_Request {
  project: I_Project_Request;
  briefing: I_Briefing_Request;
  signpost: I_Signpost_Form_Data;
}
