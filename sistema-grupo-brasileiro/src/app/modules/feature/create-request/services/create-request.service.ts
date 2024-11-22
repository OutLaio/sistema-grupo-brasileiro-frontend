import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { I_Agency_Board_Request } from '../../../shared/interfaces/briefing/agency-board/form/agency-board-register-form';
import { I_Project_Request } from '../../../shared/interfaces/project/form/project-form';
import { I_Briefing_Request } from '../../../shared/interfaces/project/form/briefing-form';
import { I_Agency_Board_Data } from '../../../shared/interfaces/briefing/agency-board/form/agency-board-form';

@Injectable({
  providedIn: 'root'
})
export class CreateRequestService {
  private readonly apiUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }
  submitAgencyBoardRequest(
    projectForm: I_Project_Request,
    briefingForm: I_Briefing_Request,
    bAgencyBoardsForm: I_Agency_Board_Data
  ): Observable<any> {
    const authToken = sessionStorage.getItem('auth-token');
    const requestBody = {
      projectForm, briefingForm, bAgencyBoardsForm
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });

    return this.http.post(`${this.apiUrl}/agency-boards`, requestBody, { headers, withCredentials: true });
  }

  
  submitSignpostRequest(
    sendCompanies: number[],
    sendOthersCompanies: string[],
    boardType: number,
    boardLocation: string,
    sector: string,
    description: string,
    height: number,
    width: number,
  ): Observable<any> {
    const idUser = sessionStorage.getItem('idUser');
    const authToken = sessionStorage.getItem('auth-token');
    const requestBody = {
      project: {
        id_client: Number(idUser),
        title: 'Placa de Sinalização'
      },
      briefing: {
        expected_date: '',
        detailed_description: description,
        companies: sendCompanies.map(id => ({ id_company: id })),
        otherCompany: sendOthersCompanies.join(', '),
        id_briefing_type: 2,
        measurement: {
          height: height,
          length: width
        }
      },
      signpost: {
        id_material: boardType,
        board_location: boardLocation,
        sector: sector
      }
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });

    return this.http.post(`${this.apiUrl}/signposts`, requestBody, { headers, withCredentials: true });
  }

  submitStickersRequest(
    sendCompanies: number[],
    sendOthersCompanies: string[],
    stickerType: number,
    stickerTypeInformation: number,
    sector: string,
    description: string,
    height: number,
    width: number,
    observations: string,
  ): Observable<any> {
    const idUser = sessionStorage.getItem('idUser');
    const authToken = sessionStorage.getItem('auth-token');
    const requestBody = {
      project: {
        id_client: Number(idUser),
        title: 'Adesivos'
      },
      briefing: {
        expectedDate: '',
        detailedDescription: description,
        companies: sendCompanies.map(id => ({ id_company: id })),
        otherCompany: sendOthersCompanies.join(', '),
        idBriefingType: '3',
        measurement: {
          height: height,
          length: width
        }
      },
      sticker: {
        idStickerType: stickerType,
        idStickerInformationType: stickerTypeInformation,
        sector: sector,
        observations: observations
      }
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });

    return this.http.post(`${this.apiUrl}/stickers`, requestBody, { headers, withCredentials: true });
  }

}
