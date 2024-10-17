import { IEmployee } from "./base-briefing/employee";

export interface IDialogBox {
  employee: IEmployee;
  time: number;
  dialog: string;
}
