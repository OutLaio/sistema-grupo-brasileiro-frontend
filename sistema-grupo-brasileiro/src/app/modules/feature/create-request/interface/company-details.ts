import { I_City_Data } from "../../../shared/interfaces/briefing/agency-board/view/city-view";

export interface CompanyDetails {
  name: string;
  companyMainRoutes: I_City_Data[];
  companyConnections: I_City_Data[];
  isCustom: boolean;
}

