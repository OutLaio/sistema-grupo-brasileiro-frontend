import { I_Company_Data } from "../../../company/view/company-view";
import { I_City_Data } from "./city-view";

export interface I_Route_Data {
  id: string;
  company: I_Company_Data;
  cities: I_City_Data[];
  type: string;
}
