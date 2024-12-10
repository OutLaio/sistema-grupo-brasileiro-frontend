import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../../../services/storage/storage.service';
import { I_Api_Response } from '../../../shared/interfaces/api-response';
import { I_City_Data } from '../../../shared/interfaces/briefing/agency-board/view/city-view';
import { I_Company_Data } from '../../../shared/interfaces/company/view/company-view';

@Injectable({
  providedIn: 'root',
})
export class CitiesCompaniesService {
  private apiUrl = 'http://54.200.23.253:8000/api/v1/data';

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  private getHeaders() {
    const token = this.storageService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
  getCities() {
    let url = `${this.apiUrl}/cities`;
    return this.http.get<I_City_Data[]>(url, { headers: this.getHeaders() });
  }

  getCompanies() {
    let url = `${this.apiUrl}/companies`;
    return this.http.get<I_Company_Data[]>(url, { headers: this.getHeaders() });
  }
}
