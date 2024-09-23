import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TProfile } from '../../../../types/profile-response.type';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private httpClient: HttpClient) {}

  profileTest: TProfile = {
    userId: '1',
    name: 'Mikaelle',
    lastname: 'Rubia',
    email: 'mikaelle@email.com',
    phone: '(11) 98765-4321',
    sector: 'Backend',
    occupation: 'Desenvolvedora',
    nop: 'Cepedi',
  };

  getProfileUser() {
    return of(this.profileTest);
  }

  updateProfileUser(userData: TProfile) {

    this.profileTest.name = userData.name;
    this.profileTest.lastname = userData.lastname;
    this.profileTest.email = userData.email;
    this.profileTest.phone = userData.phone;
    this.profileTest.sector = userData.sector;
    this.profileTest.occupation = userData.occupation;
    this.profileTest.nop = userData.nop;

    return of(HttpStatusCode.Ok);
  }
}
