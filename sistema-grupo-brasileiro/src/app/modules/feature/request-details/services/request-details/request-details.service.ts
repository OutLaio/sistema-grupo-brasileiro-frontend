import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { I_Dialog_Box_Response } from '../../../../shared/interfaces/dialog-box/view/dialog-box-view';
import { I_Dialog_Box_Request } from '../../../../shared/interfaces/dialog-box/form/dialog-box-form';
import { I_Page } from '../../../../shared/interfaces/pageable/pageable';
import { I_Assign_Collaborator_Request } from '../../../../shared/interfaces/project/form/assign-collaborator-form';
import { I_New_Version_Request } from '../../../../shared/interfaces/project/form/new-version-form';
import { I_Version_Data } from '../../../../shared/interfaces/project/view/version-view';
import { I_Approve_Request } from '../../../../shared/interfaces/project/form/approve-form';
import { I_Alter_Title_Request } from '../../../../shared/interfaces/project/form/alter-title-form';
import { I_Message_Success_Response } from '../../../../shared/interfaces/project/view/message-success-view';
import { I_Alter_Date_Request } from '../../../../shared/interfaces/project/form/alter-date-form';

@Injectable({
  providedIn: 'root',
})
export class RequestDetailsService {
  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  private getHeaders(){
    const token = sessionStorage.getItem('auth-token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getRequestDetailsById(id: string) {
    const url = `${this.baseUrl}/projects/${id}`;
    return this.http.get<any>(url, { headers: this.getHeaders() }).pipe();
  }

  getDialoguesByRequestId(id: string) {
    const url = `${this.baseUrl}/dialogs/briefing/${id}`;
    return this.http.get<I_Dialog_Box_Response[]>(url, { headers: this.getHeaders() }).pipe();
  }

  setNewDialogue(request: I_Dialog_Box_Request) {
    const url = `${this.baseUrl}/dialogs`;
    return this.http.post<I_Dialog_Box_Response>(url, request, { headers: this.getHeaders() }).pipe();
  }

  getAllCollaborators() {
    const url = `${this.baseUrl}/employees/allCollaborators`;
    return this.http.get<I_Page>(url, { headers: this.getHeaders() }).pipe();
  }

  assignCollaborator(id:string, request: I_Assign_Collaborator_Request) {
    const url = `${this.baseUrl}/projects/${id}/assignCollaborator`;
    return this.http.put(url, request, { headers: this.getHeaders() }).pipe();
  }

  newVersion(id: string, request: I_New_Version_Request){
    const url = `${this.baseUrl}/projects/${id}/newVersion`;
    return this.http.put<I_Version_Data>(url, request, { headers: this.getHeaders() }).pipe();
  }

  supervisorApproval(request: I_Approve_Request){
    const url = `${this.baseUrl}/projects/approve/supervisor`;
    return this.http.put<I_Version_Data>(url, request, { headers: this.getHeaders() }).pipe();
  }

  clientApproval(request: I_Approve_Request){
    const url = `${this.baseUrl}/projects/approve/client`;
    return this.http.put<I_Version_Data>(url, request, { headers: this.getHeaders() }).pipe();
  }

  updateTitle(id: string ,request: I_Alter_Title_Request) {
    const url = `${this.baseUrl}/projects/${id}/alterTitle`;
    return this.http.put<I_Message_Success_Response>(url, request, { headers: this.getHeaders() }).pipe();
  }

  updateDate(id: string ,request: I_Alter_Date_Request) {
    const url = `${this.baseUrl}/projects/${id}/alterDate`;
    return this.http.put<I_Message_Success_Response>(url, request, { headers: this.getHeaders() }).pipe();
  }

  hasProduction(id: string, hasConfection: boolean) {
    const url = `${this.baseUrl}/projects/${id}/hasProduction?hasConfection=${hasConfection}`;
    return this.http.put<I_Message_Success_Response>(url, null, { headers: this.getHeaders() }).pipe();
  }

  finishProject(id: string) {
    const url = `${this.baseUrl}/projects/${id}/finish`;
    return this.http.put(url, { headers: this.getHeaders() }).pipe();
  }
}
