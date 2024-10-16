import { IBaseBriefing } from "../base-briefing/base-briefing";
import { IMaterial } from "./material";

export interface ISignpost extends IBaseBriefing{
  material: IMaterial;
  boardLocation: string;
  sector: string;
}
