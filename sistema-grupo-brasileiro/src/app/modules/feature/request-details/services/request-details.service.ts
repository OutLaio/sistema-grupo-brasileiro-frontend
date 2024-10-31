import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { I_Dialog_Box_Response } from '../../../shared/interfaces/dialog-box/view/dialog-box-view';

@Injectable({
  providedIn: 'root',
})
export class RequestDetailsService {
  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  getRequestDetailsById(id: string) {
    const url = `${this.baseUrl}/projects/${id}`;
    return this.http.get<any>(url).pipe(
      tap((value) => {
      })
    );
  }

  getDialoguesByRequestId(id: string) {
    const url = `${this.baseUrl}/dialogs/briefing/${id}`;
    return this.http.get<I_Dialog_Box_Response[]>(url).pipe(
      tap((value) => {
      })
    );
  }
}
