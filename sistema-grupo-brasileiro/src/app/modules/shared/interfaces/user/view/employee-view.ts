import { I_User_View_Data } from "./user-view";

export interface I_Employee_View_Data {
  id: string;
  user: I_User_View_Data;
  name: string;
  lastname: string;
  phoneNumber: string;
  sector: string;
  occupation: string;
  agency: string;
  avatar: number;
}
