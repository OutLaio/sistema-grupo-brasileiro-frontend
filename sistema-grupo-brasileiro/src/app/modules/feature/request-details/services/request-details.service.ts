import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestDetailsService {
  private baseUrl = 'http://localhost:8080/api/v1/projects';

  constructor(private http: HttpClient) {}

  getRequestDetailsById(id: string) {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      tap((value) => {
        console.log(value.briefingView.briefingType)
      })
    );
  }
}
