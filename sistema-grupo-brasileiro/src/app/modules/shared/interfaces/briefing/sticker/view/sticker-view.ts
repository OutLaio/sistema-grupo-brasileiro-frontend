import { I_Sticker_Information_Type_Data } from "./sticker-information-type-view";
import { I_Sticker_Type_Data } from "./sticker-type-viem";

export interface I_Sticker_Data {
  id: string;
  stickerType: I_Sticker_Type_Data;
  stickerInformationType?: I_Sticker_Information_Type_Data;
  sector: string;
  observations: string;
}
