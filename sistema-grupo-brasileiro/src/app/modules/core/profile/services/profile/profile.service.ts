import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { I_Employee_View_Data } from '../../../../shared/interfaces/user/view/employee-view';
import { Observable } from 'rxjs';
import { I_Change_Password_Request } from '../../../../shared/interfaces/auth/form/password-form';
import { I_Employee_Form_Data } from '../../../../shared/interfaces/user/form/employee-form';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/users';
  private readonly apiEditUrl = 'http://localhost:8080/api/v1/employees';

  constructor(private http: HttpClient) { }

  getUserProfile(): I_Employee_View_Data | null {
    const profile = sessionStorage.getItem('userProfile');
    return profile ? JSON.parse(profile) : null;
  }

  getUserProfileFromServer(userId?: string): Observable<I_Employee_View_Data> {
    const authToken = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });

    return this.http.get<I_Employee_View_Data>(`${this.apiEditUrl}/${userId}`, {
      headers,
      withCredentials: true
    });
  }

  updateProfileUser(userData: I_Employee_Form_Data, userId?: string) {
    const authToken = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });

    return this.http.put(`${this.apiEditUrl}/${userId}`, userData, {
      headers,
      withCredentials: true
    });
  }

  deleteAccount(userId?: string) {
    const authToken = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });

    return this.http.put(`${this.apiUrl}/${userId}/deactivate`, {},
      {
        headers,
        withCredentials: true,
        responseType: 'text'
      }
    );
  }

  editPassword(userPasswordRequest: I_Change_Password_Request): Observable<any> {
    const authToken = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });

    return this.http.post(`${this.apiUrl}/changePassword`, userPasswordRequest, {
      headers,
      withCredentials: true,
      responseType: 'text'
    });
  }
}
