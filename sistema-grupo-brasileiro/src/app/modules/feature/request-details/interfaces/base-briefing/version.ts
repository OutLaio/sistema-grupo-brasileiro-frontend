export interface IVersion {
  idVersion: string;
  numVersion: number;
  productLink: string;
  clientApprove?: boolean;
  supervisorApprove?: boolean;
  feedback?: string;
}
