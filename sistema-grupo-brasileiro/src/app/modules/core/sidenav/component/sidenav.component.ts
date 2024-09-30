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

  constructor(
    private sidebarService: SidebarService,
    private router: Router,
    private loginRegisterService: LoginRegisterService, 
  ) { }

  ngOnInit() {
    this.sidebarService.sidebarVisibility$.subscribe((isVisible) => {
      this.isSidebarVisible = isVisible;
    });
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.sidebarService.toggleSidebar(); // Toggle sidebar state
  }

  isActiveLink(route: string): boolean {
    return this.router.url.includes(route);
  }

  logoutUser(){
    this.loginRegisterService.logout();
    location.reload();
  }
}
