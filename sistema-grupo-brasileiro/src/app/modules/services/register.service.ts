import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { RegisterResponse } from '../types/register-response.type';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private httpClient: HttpClient) {}

  registerUser(
    name: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    department: string,
    occupation: string,
    nop: string
  ) {
    return this.httpClient
      .post<RegisterResponse>('/register', {
        name,
        lastName,
        email,
        password,
        phone,
        department,
        occupation,
        nop,
      })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('auth-token', value.token);
          sessionStorage.setItem('userId', value.userId);
        })
      );
  }
}
