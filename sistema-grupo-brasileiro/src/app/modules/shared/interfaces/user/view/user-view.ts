import { I_Profile_View_Data } from "../../profile/view/profile-view";

export interface I_User_View_Data {
  id: string;
  email: string;
  profile: I_Profile_View_Data;
}
