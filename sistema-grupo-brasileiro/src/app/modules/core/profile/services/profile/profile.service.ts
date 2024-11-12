import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { I_Employee_View_Data } from '../../../../shared/interfaces/user/view/employee-view';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) { }

  getUserProfile(): I_Employee_View_Data | null {
    const profile = sessionStorage.getItem('userProfile');
    return profile ? JSON.parse(profile) : null;
  }

  editPassword(currentPassword: string, newPassword: string): Observable<any> {
    const authToken = sessionStorage.getItem('auth-token');
    const idUser = sessionStorage.getItem('idUser');
    const requestBody = {
      idUser, currentPassword, newPassword
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });

    return this.http.post(`${this.apiUrl}/changePassword`, requestBody, { headers, withCredentials: true });
  }

  updateProfileUser(userData: I_Employee_View_Data): Observable<HttpResponse<any>> {
    return this.http.put<HttpResponse<any>>(`${this.apiUrl}/update`, userData);
  }
}
