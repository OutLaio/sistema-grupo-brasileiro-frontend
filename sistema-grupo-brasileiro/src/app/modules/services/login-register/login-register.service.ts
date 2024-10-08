import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { LoginResponse } from '../../core/login/interface/login-response';

@Injectable({
  providedIn: 'root',
})
export class LoginRegisterService {
  private readonly prefix = 'http://localhost:8080/api/v1/auth'; // Variável para o prefixo da porta

  constructor(private httpClient: HttpClient) { }

  registerUser(
    name: string,
    lastname: string,
    email: string,
    password: string,
    phoneNumber: string,
    sector: string,
    occupation: string,
    agency: string,
    avatar: number = 1,
    profile: number = 3
  ) {
    const payload = {
      employeeForm: {
        name,
        lastname,
        phoneNumber,
        sector,
        occupation,
        agency,
        avatar
      },
      userForm: {
        email,
        password,
        profile
      }
    };

    return this.httpClient.post(`${this.prefix}/register`, payload);
  }

  registerCollaborator(
    name: string,
    lastname: string,
    email: string,
    password: string,
    phoneNumber: string,
    sector: string,
    occupation: string,
    agency: string,
    avatar: number = 1,
    profile: number = 2,
  ) {
    const payload = {
      employeeForm: {
        name,
        lastname,
        phoneNumber,
        sector,
        occupation,
        agency,
        avatar
      },
      userForm: {
        email,
        password,
        profile
      }
    };

    return this.httpClient.post(`${this.prefix}/register`, payload);
  }

  loginUser(email: string, password: string) {
    return this.httpClient
      .post<LoginResponse>(`${this.prefix}/login`, {
        email,
        password,
      })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('auth-token', value.token);
          sessionStorage.setItem('idUser', value.employee.id.toString());
          sessionStorage.setItem('userRole', value.employee.userView.profileView.description);
        })
      );
  }

  recoveryPassword(email: string) {
    return this.httpClient
      .post(`${this.prefix}/requestReset`, { email }, { responseType: 'text' });
  }


  resetPassword(password: string, token: string) {
    return this.httpClient
      .post(`${this.prefix}/resetPassword`, { password, token }, { responseType: 'text' });
  }

  getUserRole(){
    return sessionStorage.getItem('userRole');
  }

  isAuthenticated() {
    return!!sessionStorage.getItem('auth-token');
  }

  logout() {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('idUser');
    sessionStorage.clear();
  }
}
