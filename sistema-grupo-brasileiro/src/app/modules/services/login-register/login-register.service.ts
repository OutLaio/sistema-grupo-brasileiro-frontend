import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { RegisterResponse } from '../../types/register-response.type';
import { LoginResponse } from '../../types/login-response.type';

@Injectable({
  providedIn: 'root',
})
export class LoginRegisterService {
  constructor(private httpClient: HttpClient) {}

  registerUser(
    name: string,
    lastname: string,
    email: string,
    password: string,
    phonenumber: string,
    sector: string,
    occupation: string,
    nop: string
  ) {
    return this.httpClient
      .post('http://localhost:8080/auth/register', {
        name,
        lastname,
        email,
        password,
        phonenumber,
        sector,
        occupation,
        nop,
      });
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
  ) {
    return this.httpClient
      .post('http://localhost:8080/auth/register', {
        name,
        lastname,
        email,
        password,
        phonenumber,
        sector,
        occupation,
        nop,
        role,
      });
  }

  loginUser(email: string, password: string) {
    return this.httpClient
      .post<LoginResponse>('http://localhost:8080/auth/login', {
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

  recoveryPassword(email: string){
    return this.httpClient
     .post('http://localhost:8080/recoveryPassword', { email });
  }

  resetPassword(newPassword:string, token:string){
    return this.httpClient
     .post('http://localhost:8080/resetPassword', { newPassword, token });
  }
}
