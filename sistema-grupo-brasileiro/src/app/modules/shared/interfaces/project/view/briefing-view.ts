import { I_Company_Briefing_View_Data } from "../../company/view/company-briefing-view";
import { I_Measurements_Data } from "../../measurements/measurements";
import { I_Briefing_Type_Data } from "./briefing-type-view";
import { I_Version_Data } from "./version-view";

export interface I_Briefing_Data {
  id: string;
  briefingType: I_Briefing_Type_Data;
  startTime: Date;
  expectedTime: Date;
  finishTime: Date | null;
  detailedDescription: string;
  measurements: I_Measurements_Data | null;
  companies: I_Company_Briefing_View_Data | null;
  otherCompanies: string | null;
  versions: I_Version_Data[];
}
