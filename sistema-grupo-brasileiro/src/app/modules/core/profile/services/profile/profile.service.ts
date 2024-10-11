import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TProfile } from '../../../../types/profile-response.type';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/profile'; 

  constructor(private httpClient: HttpClient) {}

  getProfileUser(): Observable<TProfile> {
    return this.httpClient.get<TProfile>(this.apiUrl);
  }

  updateProfileUser(userData: TProfile): Observable<HttpResponse<any>> {
    return this.httpClient.put<HttpResponse<any>>(`${this.apiUrl}/update`, userData);
  }
}
