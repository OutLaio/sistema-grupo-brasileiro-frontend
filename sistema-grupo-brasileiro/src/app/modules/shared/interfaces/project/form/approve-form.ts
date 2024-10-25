export interface I_Approve_Request {
  idProject: string;
  idVersion: string;
  approved: boolean;
  feedback?: string;
}
