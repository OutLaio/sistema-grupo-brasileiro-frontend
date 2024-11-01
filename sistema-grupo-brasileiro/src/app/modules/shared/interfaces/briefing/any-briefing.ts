import { I_Agency_Board_Response } from "./agency-board/view/agency-board-detailed-view";
import { I_Signpost_Response } from "./signpost/view/signpost-detailed-view";

export interface I_Any_Briefing {
  type: I_Agency_Board_Response | I_Signpost_Response;
}
