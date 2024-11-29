import { Component } from '@angular/core';
import { SidebarService } from '../../../services/sidebar/sidebar.service';
import { StorageService } from '../../../services/storage/storage.service';
import { I_Employee_View_Data } from '../../../shared/interfaces/user/view/employee-view';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

  activeUser!: I_Employee_View_Data;

  constructor(
    private sidebarService: SidebarService,
    private storageService: StorageService
  ){}

  ngOnInit(): void {
    this.activeUser = this.storageService.getSessionProfile();
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
