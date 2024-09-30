import { Component } from '@angular/core';
import { SidebarService } from './modules/services/sidebar/sidebar.service';
import { LoginRegisterService } from './modules/services/login-register/login-register.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'sistema-grupo-brasileiro';
  isSidebarVisible = false;
  constructor(
    private sidebarService: SidebarService,
    private loginRegisterService: LoginRegisterService, 
  ) {}

  ngOnInit() {
    this.sidebarService.sidebarVisibility$.subscribe((isVisible) => {
      this.isSidebarVisible = isVisible;
    });
  }

  isAuthenticated(){
    return this.loginRegisterService.isAuthenticated();
  }

}
