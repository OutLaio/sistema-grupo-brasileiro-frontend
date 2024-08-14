import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileResponse } from '../../types/profile-response.type';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private httpClient: HttpClient) {}

  getProfileUser() {
    let profileTest:ProfileResponse;
    profileTest = {
      userId: '1234567890',
      name: 'John',
      lastname: 'Doe',
      email: 'johndoe@example.com',
      phone: '(11) 99999-9999',
      sector: 'Marketing',
      occupation: 'Marketing Manager',
      nop: '12345'
    }
    return of(profileTest);
  }
}
