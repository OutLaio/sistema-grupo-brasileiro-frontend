import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { I_Dialog_Box_Response } from '../../../shared/interfaces/dialog-box/view/dialog-box-view';
import { I_Dialog_Box_Request } from '../../../shared/interfaces/dialog-box/form/dialog-box-form';
import { I_Any_Briefing } from '../../../shared/interfaces/briefing/any-briefing';
import { I_Employee_View_Data } from '../../../shared/interfaces/user/view/employee-view';
import { I_Page } from '../../../shared/interfaces/pageable/pageable';
import { I_Assign_Collaborator_Request } from '../../../shared/interfaces/project/form/assign-collaborator-form';
import { I_New_Version_Request } from '../../../shared/interfaces/project/form/new-version-form';
import { I_Version_Data } from '../../../shared/interfaces/project/view/version-view';

@Injectable({
  providedIn: 'root',
})
export class RequestDetailsService {
  private baseUrl = 'http://localhost:8080/api/v1';

  private token = sessionStorage.getItem('auth-token');
  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
  });

  constructor(private http: HttpClient) {}

  getRequestDetailsById(id: string) {
    const url = `${this.baseUrl}/projects/${id}`;
    return this.http.get<any>(url, { headers: this.headers }).pipe();
  }

  getDialoguesByRequestId(id: string) {
    const url = `${this.baseUrl}/dialogs/briefing/${id}`;
    return this.http.get<I_Dialog_Box_Response[]>(url, { headers: this.headers }).pipe();
  }

  setNewDialogue(request: I_Dialog_Box_Request) {
    const url = `${this.baseUrl}/dialogs`;
    return this.http.post<I_Dialog_Box_Response>(url, request, { headers: this.headers }).pipe();
  }

  getAllCollaborators() {
    const url = `${this.baseUrl}/employees/allCollaborators`;
    return this.http.get<I_Page>(url, { headers: this.headers }).pipe();
  }

  assignCollaborator(id:string, request: I_Assign_Collaborator_Request) {
    const url = `${this.baseUrl}/projects/${id}/assignCollaborator`;
    return this.http.put(url, request, { headers: this.headers }).pipe();
  }

  newVersion(id: string, request: I_New_Version_Request){
    const url = `${this.baseUrl}/projects/${id}/newVersion`;
    return this.http.put<I_Version_Data>(url, request, { headers: this.headers }).pipe();
  }
}
