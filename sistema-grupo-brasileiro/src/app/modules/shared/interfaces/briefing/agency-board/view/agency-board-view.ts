import { I_Agency_Board_Type_Data } from "./agency-board-type-view";
import { I_Board_Type_Data } from "./board-type-view";
import { I_Other_Route_Data } from "./other-route-view";
import { I_Route_Data } from "./route-view";

export interface I_Agency_Board_Data {
  id: string;
  agencyBoardType: I_Agency_Board_Type_Data;
  boardType?: I_Board_Type_Data;
  routes?: I_Route_Data[];
  otherRoutes?: I_Other_Route_Data[];
  boardLocation: string;
  observations: string;
}
