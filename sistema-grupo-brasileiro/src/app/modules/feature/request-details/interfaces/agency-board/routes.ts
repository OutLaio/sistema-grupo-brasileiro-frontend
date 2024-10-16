import { ICompanyBriefing } from "../base-briefing/company-briefing";
import { ICity } from "./city";

export interface IRoutes {
  company: ICompanyBriefing;
  cities: ICity[];
  type: string;
}
