import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { I_Employee_View_Data } from '../../../../shared/interfaces/user/view/employee-view';
import { I_Change_Password_Request } from '../../../../shared/interfaces/auth/form/password-form';
import { I_Employee_Form_Data } from '../../../../shared/interfaces/user/form/employee-form';
import { StorageService } from '../../../../services/storage/storage.service';
import { I_Api_Response } from '../../../../shared/interfaces/api-response';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly baseUrl = 'http://54.200.23.253:8000/api/v1';
  private readonly authToken = this.storageService.getToken();

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

  updateProfileUser(req: I_Employee_Form_Data, userId?: string) {
    const headers = this.getHeaders();
    return this.http.put<I_Api_Response<I_Employee_View_Data>>(
      `${this.baseUrl}/employees/${userId}`,
      req,
      {
        headers,
        withCredentials: true,
      }
    );
  }

  deleteAccount(userId?: string) {
    const headers = this.getHeaders();
    return this.http.put<I_Api_Response<void>>(
      `${this.baseUrl}/users/${userId}/deactivate`,
      {},
      {
        headers,
        withCredentials: true,
      }
    );
  }

  editPassword(req: I_Change_Password_Request) {
    const headers = this.getHeaders();
    return this.http.post<I_Api_Response<void>>(
      `${this.baseUrl}/users/changePassword`,
      req,
      {
        headers,
        withCredentials: true,
      }
    );
  }
}
