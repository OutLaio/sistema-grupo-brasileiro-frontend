import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { I_Agency_Board_Request } from '../../../shared/interfaces/briefing/agency-board/form/agency-board-register-form';
import { StorageService } from '../../../services/storage/storage.service';
import { I_Signpost_Request } from '../../../shared/interfaces/briefing/signpost/form/signpost-register-form';
import { I_Api_Response } from '../../../shared/interfaces/api-response';

@Injectable({
  providedIn: 'root',
})
export class CreateRequestService {
  private readonly apiUrl = 'http://localhost:8080/api/v1';
  private readonly authToken = this.storageService.getToken();
  private readonly idUser = this.storageService.getUserId();

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  private getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    });
  }

  submitSignpostRequest(req: I_Signpost_Request) {
    const headers = this.getHeaders();
    return this.http.post<I_Api_Response<void>>(`${this.apiUrl}/signposts`, req, {
      headers,
      withCredentials: true,
    });
  }

  submitAgencyBoardRequest(req: I_Agency_Board_Request) {
    const headers = this.getHeaders();
    return this.http.post<I_Api_Response<void>>(`${this.apiUrl}/agency-boards`, req, {
      headers,
      withCredentials: true,
    });
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

    return this.http.post<any>(`${this.apiUrl}/stickers`, requestBody, { headers });
  }


}
