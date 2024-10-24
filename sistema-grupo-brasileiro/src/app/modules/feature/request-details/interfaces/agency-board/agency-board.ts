import { IBriefing } from "../base-briefing/briefing";
import { IAgencyBoardType } from "./agency-board-type";
import { IBoardType } from "./board-type";
import { IOtherRoutes } from "./other-routes";
import { IRoutes } from "./routes";

export interface IAgencyBoard {
  briefingView: IBriefing;
  type: IAgencyBoardType;
  boardType?: IBoardType;
  boardLocation: string;
  observation: string;
  routes?: IRoutes[];
  otherRoutes?: IOtherRoutes[];
}
