import { Component } from '@angular/core';
import { SidebarService } from '../../../services/sidebar/sidebar.service';
import { StorageService } from '../../../services/storage/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

  userName: string = "";

  constructor(
    private sidebarService: SidebarService,
    private storageService: StorageService
  ){}

  ngOnInit(): void {
    this.userName = this.storageService.getUserFullName() || '';
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
