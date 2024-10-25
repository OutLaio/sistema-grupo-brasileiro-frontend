import { ProjectStatus } from "../../../../feature/check-requests/enums/project-status";

export interface I_Project_Request {
  idClient: string;
  title: string;
  status?: ProjectStatus;
}
