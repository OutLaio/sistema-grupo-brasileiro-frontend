import { Component } from '@angular/core';
import { SidebarService } from './modules/services/sidebar/sidebar.service';
import { StorageService } from './modules/services/storage/storage.service';

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
    private storageService: StorageService,
  ) {}

  ngOnInit() {
    this.sidebarService.sidebarVisibility$.subscribe((isVisible) => {
      this.isSidebarVisible = isVisible;
    });
  }

  isAuthenticated(){
    return this.storageService.isAutenticated();
  }

}
