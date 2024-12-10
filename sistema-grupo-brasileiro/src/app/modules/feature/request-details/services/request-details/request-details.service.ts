import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { I_Dialog_Box_Response } from '../../../../shared/interfaces/dialog-box/view/dialog-box-view';
import { I_Dialog_Box_Request } from '../../../../shared/interfaces/dialog-box/form/dialog-box-form';
import { I_Assign_Collaborator_Request } from '../../../../shared/interfaces/project/form/assign-collaborator-form';
import { I_New_Version_Request } from '../../../../shared/interfaces/project/form/new-version-form';
import { I_Version_Data } from '../../../../shared/interfaces/project/view/version-view';
import { I_Approve_Request } from '../../../../shared/interfaces/project/form/approve-form';
import { I_Alter_Title_Request } from '../../../../shared/interfaces/project/form/alter-title-form';
import { I_Alter_Date_Request } from '../../../../shared/interfaces/project/form/alter-date-form';
import { I_Api_Response } from '../../../../shared/interfaces/api-response';
import { I_Any_Briefing } from '../../../../shared/interfaces/briefing/any-briefing';
import { ListCollaboratorsService } from '../../../collaborator/list-collaborators/services/list-collaborators.service';
import { I_Alter_Status_Request } from '../../../../shared/interfaces/project/form/alter-status-form';
import { I_Upload_Response } from '../../../../shared/interfaces/upload/upload-file-view';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class RequestDetailsService {
  private baseUrl = 'http://54.200.23.253:8000/api/v1';

  constructor(
    private http: HttpClient,
    private collaboratorsService: ListCollaboratorsService,
    private cookieService: CookieService
  ) {}


  private getHeaders(){
    const token = this.cookieService.get('auth-token') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getRequestDetailsById(id: string) {
    const url = `${this.baseUrl}/projects/${id}`;
    return this.http.get<I_Api_Response<I_Any_Briefing>>(url, {
      headers: this.getHeaders(),
    });
  }

  getDialoguesByRequestId(id: string) {
    const url = `${this.baseUrl}/dialogs/briefing/${id}`;
    return this.http.get<I_Api_Response<I_Dialog_Box_Response[]>>(url, {
      headers: this.getHeaders(),
    });
  }

  setNewDialogue(request: I_Dialog_Box_Request) {
    const url = `${this.baseUrl}/dialogs`;
    return this.http.post<I_Api_Response<I_Dialog_Box_Response>>(url, request, {
      headers: this.getHeaders(),
    });
  }

  getAllCollaborators(page: number, size: number) {
    return this.collaboratorsService.getAllCollaborators(page, size);
  }

  assignCollaborator(id: string, request: I_Assign_Collaborator_Request) {
    const url = `${this.baseUrl}/projects/${id}/assignCollaborator`;
    return this.http.put<I_Api_Response<void>>(url, request, {
      headers: this.getHeaders(),
    });
  }

  newVersion(id: string, request: I_New_Version_Request) {
    const url = `${this.baseUrl}/projects/${id}/newVersion`;
    return this.http.put<I_Api_Response<I_Version_Data>>(url, request, {
      headers: this.getHeaders(),
    });
  }

  supervisorApproval(projectId: string, request: I_Approve_Request) {
    const url = `${this.baseUrl}/projects/${projectId}/approve/supervisor`;
    return this.http.put<I_Api_Response<I_Version_Data>>(url, request, {
      headers: this.getHeaders(),
    });
  }

  clientApproval(projectId: string, request: I_Approve_Request) {
    const url = `${this.baseUrl}/projects/${projectId}/approve/client`;
    return this.http.put<I_Api_Response<I_Version_Data>>(url, request, {
      headers: this.getHeaders(),
    });
  }

  updateTitle(id: string, request: I_Alter_Title_Request) {
    const url = `${this.baseUrl}/projects/${id}/alterTitle`;
    return this.http.put<I_Api_Response<void>>(url, request, {
      headers: this.getHeaders(),
    });
  }

  updateDate(id: string, request: I_Alter_Date_Request) {
    const url = `${this.baseUrl}/projects/${id}/alterDate`;
    return this.http.put<I_Api_Response<void>>(url, request, {
      headers: this.getHeaders(),
    });
  }

  updateStatus(id: string, request: I_Alter_Status_Request) {
    const url = `${this.baseUrl}/projects/${id}/alterStatus`;
    return this.http.put<I_Api_Response<void>>(url, request, {
      headers: this.getHeaders(),
    });
  }

  hasProduction(id: string, hasConfection: boolean) {
    const url = `${this.baseUrl}/projects/${id}/hasProduction?hasConfection=${hasConfection}`;
    return this.http.put<I_Api_Response<void>>(url, null, {
      headers: this.getHeaders(),
    });
  }

  finishProject(id: string) {
    const url = `${this.baseUrl}/projects/${id}/finish`;
    return this.http.put<I_Api_Response<void>>(url, null, {
      headers: this.getHeaders(),
    });
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<I_Api_Response<I_Upload_Response>>(
      `${this.baseUrl}/file/uploadFile`,
      formData,
      { headers: this.getHeaders() }
    );
  }
}
