export interface I_Version_Data {
  id: string;
  versionNumber: number;
  productLink: string;
  clientApprove?: boolean;
  supervisorApprove?: boolean;
  feedback?: string;
}
