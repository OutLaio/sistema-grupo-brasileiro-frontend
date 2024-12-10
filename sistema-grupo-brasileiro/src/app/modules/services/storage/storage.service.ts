import { Injectable } from '@angular/core';
import { I_Employee_View_Data } from '../../shared/interfaces/user/view/employee-view';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private cookieService: CookieService) { }

  getSessionProfile(): I_Employee_View_Data {
    const activeUser = this.cookieService.get('activeUser');
    if (!activeUser) {
      throw new Error('User profile not found in cookies');
    }
    return JSON.parse(activeUser) as I_Employee_View_Data;
  }

  setSessionProfile(profile: I_Employee_View_Data) {
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    this.cookieService.set(
      'activeUser',
      JSON.stringify(profile),
      expiration,
      '/'
    );
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
    return this.cookieService.get('auth-token') || '';
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
