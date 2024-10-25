import { I_Material_Data } from "./material-view";

export interface I_Signpost_View_Data {
  id: string;
  material: I_Material_Data;
  boardLocation: string;
  sector: string;
}
