import { I_Employee_Form_Data } from "./employee-form";
import { I_User_Form_Data } from "./user-form";

export interface I_User_Request {
  employee: I_Employee_Form_Data;
  user: I_User_Form_Data;
}
