export interface I_Version_Data {
  id: string;
  versionNumber: number;
  productLink: string;
  clientApprove: boolean | null;
  supervisorApprove: boolean | null;
  feedback: string | null;
}
