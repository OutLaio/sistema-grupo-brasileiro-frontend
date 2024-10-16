import { IBaseBriefing } from "../base-briefing/base-briefing";
import { IAgencyBoardType } from "./agency-board-type";
import { IBoardType } from "./board-type";
import { IOtherRoutes } from "./other-routes";
import { IRoutes } from "./routes";

export interface IAgencyBoard extends IBaseBriefing {
  type: IAgencyBoardType;
  boardType?: IBoardType;
  boardLocation: string;
  observation: string;
  routes?: IRoutes[];
  otherRoutes?: IOtherRoutes[];
}
