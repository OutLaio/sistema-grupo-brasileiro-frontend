import { IBriefing } from "../base-briefing/briefing";
import { IMaterial } from "./material";

export interface ISignpost {
  briefingView: IBriefing;
  material: IMaterial;
  boardLocation: string;
  sector: string;
}
