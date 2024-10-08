import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../services/sidebar/sidebar.service';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../../../services/login-register/login-register.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent implements OnInit {
  isSidebarVisible = false;
  userRole: string = '';

  constructor(
    private sidebarService: SidebarService,
    private router: Router,
    private loginRegisterService: LoginRegisterService, 
  ) { }

  ngOnInit() {
    this.sidebarService.sidebarVisibility$.subscribe((isVisible) => {
      this.isSidebarVisible = isVisible;
      this.userRole = this.loginRegisterService.getUserRole() ?? '';
    });
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.sidebarService.toggleSidebar();
  }

  isActiveLink(route: string): boolean {
    return this.router.url.includes(route);
  }

  logoutUser(){
    this.loginRegisterService.logout();
    this.router.navigate(['/login']);
    location.reload();
  }
}
