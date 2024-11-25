import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { I_Agency_Board_Request } from '../../../shared/interfaces/briefing/agency-board/form/agency-board-register-form';
import { I_Signpost_Request } from '../../../shared/interfaces/briefing/signpost/form/signpost-register-form';
import { I_Stickers_Request } from '../../../shared/interfaces/briefing/stickers/form/stickers-register-form';

import { StorageService } from '../../../services/storage/storage.service';
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
  ) { }

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

  submitStickersRequest(req: I_Stickers_Request) {
    const headers = this.getHeaders();
    return this.http.post<I_Api_Response<void>>(`${this.apiUrl}/stickers`, req, {
      headers,
      withCredentials: true,
    });
  }

}
