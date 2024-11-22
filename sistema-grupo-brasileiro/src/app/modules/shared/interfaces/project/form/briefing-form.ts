import { I_Company_Briefing_Form_Data } from "../../company/form/company-briefing-form";
import { I_Measurements_Data } from "../../measurements/measurements";

export interface I_Briefing_Request {
  detailedDescription: string;
  companies?: I_Company_Briefing_Form_Data[];
  otherCompany?: string;
  idBriefingType: number;
  measurement?: I_Measurements_Data;
}
