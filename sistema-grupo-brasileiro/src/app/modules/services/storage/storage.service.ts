import { Injectable } from '@angular/core';
import { I_Employee_View_Data } from '../../shared/interfaces/user/view/employee-view';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getSessionProfile(): I_Employee_View_Data {
    const activeUser = sessionStorage.getItem('activeUser');
    if (activeUser === null) {
      throw new Error('User profile not found in session storage');
    }
    return JSON.parse(activeUser) as I_Employee_View_Data;
  }

  setSessionProfile(profile: I_Employee_View_Data) {
    sessionStorage.setItem('activeUser', JSON.stringify(profile));
  }

  getUserFullName(): string {
    return `${this.getSessionProfile().name} ${this.getSessionProfile().lastname}`;
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

  getToken(): string {
    return sessionStorage.getItem('auth-token')?? '';
  }

  isAutenticated(): boolean {
    return !!this.getToken();
  }
}
