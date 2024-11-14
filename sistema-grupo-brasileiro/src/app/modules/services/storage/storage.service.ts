import { Injectable } from '@angular/core';
import { I_Employee_View_Data } from '../../shared/interfaces/user/view/employee-view';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getSessionProfile(): I_Employee_View_Data {
    const userProfile = sessionStorage.getItem('userProfile');
    if (userProfile === null) {
      throw new Error('User profile not found in session storage');
    }
    return JSON.parse(userProfile) as I_Employee_View_Data;
  }

  isClient(): boolean {
    return this.getSessionProfile().user.profile.description === 'ROLE_CLIENT';
  }

  isCollaborator(): boolean {
    return this.getSessionProfile().user.profile.description === 'ROLE_COLLABORATOR';
  }

  isSupervisor(): boolean {
    return this.getSessionProfile().user.profile.description === 'ROLE_SUPERVISOR';
  }

  getUserRole(): string {
    return this.getSessionProfile().user.profile.description;
  }

  getUserId(): string {
    return this.getSessionProfile().id;
  }
}
