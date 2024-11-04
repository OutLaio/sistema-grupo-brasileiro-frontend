import { I_Agency_Board_Others_Routes } from "./agency-board-others-routes-form";
import { I_Agency_Board_Routes } from "./agency-board-routes-form";

export interface I_Agency_Board_Data {
  idAgencyBoardType: string;
  boardLocation: string;
  observation: string;
  idBoardType?: string;
  routes?: I_Agency_Board_Routes[];
  othersRoutes?: I_Agency_Board_Others_Routes[];
}
