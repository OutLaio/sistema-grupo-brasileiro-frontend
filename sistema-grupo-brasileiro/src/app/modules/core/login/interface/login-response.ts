import { I_Employee_View_Data } from "../../../shared/interfaces/user/view/employee-view";

export interface LoginResponse {
    token: string,
    employee: I_Employee_View_Data
}
