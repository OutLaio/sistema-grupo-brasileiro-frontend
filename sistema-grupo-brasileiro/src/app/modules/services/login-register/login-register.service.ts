import { I_Employee_Form_Data } from './../../shared/interfaces/user/form/employee-form';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { I_Api_Response } from '../../shared/interfaces/api-response';
import { I_Token_Response } from '../../shared/interfaces/auth/view/token-view';
import { I_Employee_View_Data } from '../../shared/interfaces/user/view/employee-view';
import { Router } from '@angular/router';
import { I_User_Request } from '../../shared/interfaces/user/form/user-details-form';
import { I_Login_Request } from '../../shared/interfaces/auth/form/login-form';
import { I_Recovery_Password_Request } from '../../shared/interfaces/auth/form/recovery-password-form';
import { I_Reset_Password_Request } from '../../shared/interfaces/auth/form/reset-password-form';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginRegisterService {
  private readonly prefix = 'http://54.200.23.253:8000/api/v1/auth';

  constructor(private router: Router, private httpClient: HttpClient) {}

  private getHeaders() {
    const token = sessionStorage.getItem('auth-token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  registerUser(req: I_User_Request) {
    return this.httpClient.post<I_Api_Response<I_Employee_View_Data>>(
      `${this.prefix}/register`,
      req
    );
  }

  loginUser(req: I_Login_Request) {
    return this.httpClient
      .post<I_Api_Response<I_Token_Response>>(`${this.prefix}/login`, req)
      .pipe(
        tap((value) => {
          sessionStorage.setItem('auth-token', value.data?.token!);
          sessionStorage.setItem(
            'activeUser',
            JSON.stringify(value.data?.employee!)
          );
        })
      );
  }

  recoveryPassword(req: I_Recovery_Password_Request) {
    return this.httpClient.post<I_Api_Response<void>>(
      `${this.prefix}/requestReset`,
      req
    );
  }

  verifyToken(token: string) {
    return this.httpClient.get<I_Api_Response<void>>(
      `${this.prefix}/verifyToken?token=${token}`
    );
  }

  resetPassword(req: I_Reset_Password_Request) {
    return this.httpClient.post<I_Api_Response<void>>(
      `${this.prefix}/resetPassword`,
      req
    );
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
