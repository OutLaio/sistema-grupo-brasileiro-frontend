import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { RegisterResponse } from '../../types/register-response.type';
import { LoginResponse } from '../../types/login-response.type';

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
    avatar: number = 0,
    profile: number = 0
  ) {
    const payload = {
      employeeForm: {
        name,
        lastname,
        phoneNumber,
        sector,
        occupation,
        agency,
        avatar,
      },
      userForm: {
        email,
        password,
        profile,
      }
    };

    return this.httpClient.post(`${this.prefix}/register`, payload);
  }


  registerCollaborator(
    name: string,
    lastname: string,
    email: string,
    password: string,
    phonenumber: string,
    sector: string,
    occupation: string,
    nop: string,
    role: string,
    avatar: number = 1
  ) {
    return this.httpClient
      .post(`${this.prefix}/register`, {
        name,
        lastname,
        email,
        password,
        phonenumber,
        sector,
        occupation,
        nop,
        role,
        avatar
      });
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
          sessionStorage.setItem('userId', value.userId);
        })
      );
  }

  recoveryPassword(email: string) {
    return this.httpClient
      .post(`${this.prefix}/requestReset`, { email });
  }

  resetPassword(newPassword: string, token: string) {
    return this.httpClient
      .post(`${this.prefix}/resetPassword`, { newPassword, token });
  }
}
