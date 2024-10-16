import { IBriefingType } from "./briefing-type";
import { ICompanyBriefing } from "./company-briefing";
import { IMeasurement } from "./measurement";
import { IProject } from "./project";
import { IVersion } from "./version";

export interface IBaseBriefing {
  project: IProject;
  briefingType: IBriefingType;
  startTime: string;
  expectedTime: string;
  finishTime?: string;
  detailedDescription: string;
  otherCompany?: string[];
  measurements?: IMeasurement;
  companies?: ICompanyBriefing[];
  versions?: IVersion[];
}
