import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { I_Employee_View_Data } from '../../../../shared/interfaces/user/view/employee-view';
import { I_Page } from '../../../../shared/interfaces/pageable/pageable';

@Injectable({
  providedIn: 'root'
})
export class ListCollaboratorsService {
  private apiUrl = 'http://localhost:8080/api/v1/employees/allCollaborators';

  constructor(private http: HttpClient) { }

  private getHeaders(){
    const token = sessionStorage.getItem('auth-token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
  getAllCollaborators(page: number, size: number) {
    let url = `${this.apiUrl}?page=${page}&size=${size}`;
    return this.http.get<I_Page>(url, { headers: this.getHeaders() }).pipe();
  }
}