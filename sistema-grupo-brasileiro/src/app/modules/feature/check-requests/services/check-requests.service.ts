import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../../../services/storage/storage.service';
import { I_Api_Response } from '../../../shared/interfaces/api-response';
import { I_Project_Data } from '../../../shared/interfaces/project/view/project-view';

@Injectable({
  providedIn: 'root',
})
export class CheckRequestsService {
  private readonly authToken = this.storageService.getToken();
  private apiUrl = 'http://localhost:8080/api/v1/projects';

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  private getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    });
  }

  getProjects() {
    const headers = this.getHeaders();
    return this.http.get<I_Api_Response<I_Project_Data[]>>(this.apiUrl, { headers });
  }
}
