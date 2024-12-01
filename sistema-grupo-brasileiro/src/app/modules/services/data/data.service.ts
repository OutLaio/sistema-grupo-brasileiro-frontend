import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { I_Api_Response } from '../../shared/interfaces/api-response';
import { I_Profile_View_Data } from '../../shared/interfaces/profile/view/profile-view';
import { I_Briefing_Type_Data } from '../../shared/interfaces/project/view/briefing-type-view';
import { I_Agency_Board_Type_Data } from '../../shared/interfaces/briefing/agency-board/view/agency-board-type-view';
import { I_Board_Type_Data } from '../../shared/interfaces/briefing/agency-board/view/board-type-view';
import { I_City_Data } from '../../shared/interfaces/briefing/agency-board/view/city-view';
import { I_Company_Data } from '../../shared/interfaces/company/view/company-view';
import { I_Sticker_Type_Data } from '../../shared/interfaces/briefing/sticker/view/sticker-type-viem';
import { I_Sticker_Information_Type_Data } from '../../shared/interfaces/briefing/sticker/view/sticker-information-type-view';
import { I_Material_Data } from '../../shared/interfaces/briefing/signpost/view/material-view';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private urlBase = 'http://54.200.23.253:8000/api/v1/data';

  constructor(private http: HttpClient) {}

  getProfiles() {
    return this.http.get<I_Api_Response<I_Profile_View_Data[]>>(
      `${this.urlBase}/profiles`
    );
  }

  getBriefingTypes() {
    return this.http.get<I_Api_Response<I_Briefing_Type_Data[]>>(
      `${this.urlBase}/briefing-types`
    );
  }

  getAgencyBoardTypes() {
    return this.http.get<I_Api_Response<I_Agency_Board_Type_Data[]>>(
      `${this.urlBase}/agency-board-types`
    );
  }

  getBoardTypes() {
    return this.http.get<I_Api_Response<I_Board_Type_Data[]>>(
      `${this.urlBase}/board-types`
    );
  }

  getCities() {
    return this.http.get<I_Api_Response<I_City_Data[]>>(
      `${this.urlBase}/cities`
    );
  }

  getCompanies() {
    return this.http.get<I_Api_Response<I_Company_Data[]>>(
      `${this.urlBase}/companies`
    );
  }

  getStickerTypes() {
    return this.http.get<I_Api_Response<I_Sticker_Type_Data[]>>(
      `${this.urlBase}/sticker-types`
    );
  }

  getStickerInformationTypes() {
    return this.http.get<I_Api_Response<I_Sticker_Information_Type_Data[]>>(
      `${this.urlBase}/sticker-information-types`
    );
  }

  getMaterials() {
    return this.http.get<I_Api_Response<I_Material_Data[]>>(
      `${this.urlBase}/materials`
    );
  }
}
