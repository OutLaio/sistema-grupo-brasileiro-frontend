import { IEmployee } from "./employee";

export interface IProject {
  id: string;
  collaborator?: IEmployee;
  client: IEmployee;
  title: string;
  status: string;
}
