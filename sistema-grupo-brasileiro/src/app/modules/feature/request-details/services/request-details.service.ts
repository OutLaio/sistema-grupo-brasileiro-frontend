import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { I_Dialog_Box_Response } from '../../../shared/interfaces/dialog-box/view/dialog-box-view';
import { I_Dialog_Box_Request } from '../../../shared/interfaces/dialog-box/form/dialog-box-form';
import { I_Any_Briefing } from '../../../shared/interfaces/briefing/any-briefing';
import { I_Employee_View_Data } from '../../../shared/interfaces/user/view/employee-view';
import { I_Page } from '../../../shared/interfaces/pageable/pageable';

@Injectable({
  providedIn: 'root',
})
export class RequestDetailsService {
  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  getRequestDetailsById(id: string) {
    const url = `${this.baseUrl}/projects/${id}`;
    return this.http.get<any>(url).pipe();
  }

  getDialoguesByRequestId(id: string) {
    const url = `${this.baseUrl}/dialogs/briefing/${id}`;
    return this.http.get<I_Dialog_Box_Response[]>(url).pipe();
  }

  setNewDialogue(request: I_Dialog_Box_Request) {
    const url = `${this.baseUrl}/dialogs`;
    return this.http.post<I_Dialog_Box_Response>(url, request).pipe();
  }

  getAllCollaborators() {
    const url = `${this.baseUrl}/employees/allCollaborators`;
    return this.http.get<I_Page>(url).pipe();
  }
}
