import { I_Employee_Simple_View_Data } from "../../user/view/employee-simple-view";

export interface I_Dialog_Box_Response {
  id: string;
  employee: I_Employee_Simple_View_Data;
  time: number;
  dialog: string;
}
