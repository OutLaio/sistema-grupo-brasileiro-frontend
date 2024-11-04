import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { LoginResponse } from '../../core/login/interface/login-response';
import { TProfile } from '../../types/profile-response.type';
import { I_Employee_View_Data } from '../../shared/interfaces/user/view/employee-view';

@Injectable({
  providedIn: 'root',
})
export class LoginRegisterService {
  private readonly prefix = 'http://localhost:8080/api/v1/auth';

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
          sessionStorage.setItem('userRole', value.employee.user.profile.description);

          const userProfile: I_Employee_View_Data = {
            id: value.employee.id,
            user: value.employee.user,
            name: value.employee.name,
            lastname: value.employee.lastname,
            phoneNumber: value.employee.phoneNumber,
            sector: value.employee.sector,
            occupation: value.employee.occupation,
            agency: value.employee.agency,
            avatar: value.employee.avatar
          };

          sessionStorage.setItem('userProfile', JSON.stringify(userProfile));
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

  getUserRole() {
    return sessionStorage.getItem('userRole');
  }


  getUserName(): string | null {
    const profile = sessionStorage.getItem('userProfile');
    if (profile) {
      const userProfile: TProfile = JSON.parse(profile);
      return userProfile.name + " " + userProfile.lastname;
    }
    return null;
  }

  getUserProfile(): TProfile | null {
    const profile = sessionStorage.getItem('userProfile');
    return profile ? JSON.parse(profile) : null;
  }

  isAuthenticated() {
    return !!sessionStorage.getItem('auth-token');
  }

  logout() {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('idUser');
    sessionStorage.clear();
  }
}
