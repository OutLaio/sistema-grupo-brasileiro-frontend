import { I_Employee_View_Data } from "../../user/view/employee-view";

export interface I_Token_Response {
  token: string;
  employee: I_Employee_View_Data;
}
