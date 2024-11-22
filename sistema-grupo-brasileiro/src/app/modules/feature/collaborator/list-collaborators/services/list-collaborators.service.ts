import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { I_Employee_View_Data } from '../../../../shared/interfaces/user/view/employee-view';
import { I_Page } from '../../../../shared/interfaces/pageable/pageable';
import { StorageService } from '../../../../services/storage/storage.service';
import { I_Api_Response } from '../../../../shared/interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class ListCollaboratorsService {
  private apiUrl = 'http://localhost:8080/api/v1/employees/allCollaborators';

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) { }

  private getHeaders(){
    const token = this.storageService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
  getAllCollaborators(page: number, size: number) {
    let url = `${this.apiUrl}?page=${page}&size=${size}`;
    return this.http.get<I_Api_Response<I_Page<I_Employee_View_Data>>>(url, { headers: this.getHeaders() });
  }
}
