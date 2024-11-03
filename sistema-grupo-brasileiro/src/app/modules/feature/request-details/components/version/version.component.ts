import { AfterViewInit, Component, Input } from '@angular/core';
import { I_Version_Data } from '../../../../shared/interfaces/project/view/version-view';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrl: './version.component.css'
})
export class VersionComponent implements AfterViewInit{
  @Input() version!: I_Version_Data | undefined;
  isDisaproved: boolean = false;

  constructor() {}

  ngAfterViewInit() {
    console.log(this.version);
  }

  onApprove() {
    this.isDisaproved = false;
  }

  onDisapprove() {
    this.isDisaproved = true;
  }

  isSupervisor() {
    return sessionStorage.getItem('userRole') === 'ROLE_SUPERVISOR';
  }

  isClient() {
    return sessionStorage.getItem('userRole') === 'ROLE_CLIENT';
  }

  onSave(){
    this.version!.supervisorApprove = !this.isDisaproved;
  }
}
