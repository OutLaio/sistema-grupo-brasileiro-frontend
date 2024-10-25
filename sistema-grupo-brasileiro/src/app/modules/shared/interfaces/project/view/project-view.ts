import { Collaborator } from './../../../../feature/collaborator/list-collaborators/enum/collaborator';
import { I_Employee_Simple_View_Data } from "../../user/view/employee-simple-view";

export interface I_Project_Data {
  id: string;
  title: string;
  status: string;
  client: I_Employee_Simple_View_Data;
  collaborator?: I_Employee_Simple_View_Data;
}
