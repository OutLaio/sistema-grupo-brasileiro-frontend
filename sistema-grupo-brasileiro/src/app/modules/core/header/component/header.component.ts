import { Component } from '@angular/core';
import { SidebarService } from '../../../services/sidebar/sidebar.service';
import { LoginRegisterService } from '../../../services/login-register/login-register.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

  userName: string = "";

  constructor(private sidebarService: SidebarService,
     private loginRegisterService: LoginRegisterService
  ){}

  ngOnInit(): void {
    this.userName = this.loginRegisterService.getUserName() || '';
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
