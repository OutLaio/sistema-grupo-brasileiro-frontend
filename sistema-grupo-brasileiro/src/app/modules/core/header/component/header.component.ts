import { Component } from '@angular/core';
import { SidebarService } from '../../../services/sidebar/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

  constructor(private sidebarService: SidebarService){}
  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
