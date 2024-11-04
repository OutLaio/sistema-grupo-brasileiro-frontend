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

  isApprovedBySupervisor() {
    return this.version?.supervisorApprove === true;
  }

  isDisapprovedBySupervisor() {
    return this.version?.supervisorApprove === false;
  }


  isApprovedByClient() {
    return this.version?.clientApprove === true;
  }

  isDisapprovedByClient() {
    return this.version?.clientApprove === false;
  }

  isVersionApproved() {
    return this.isApprovedBySupervisor() && this.isApprovedByClient();
  }

  isVersionDisapproved() {
    return this.isDisapprovedBySupervisor() || this.isDisapprovedByClient();
  }

  showApproveSelect() {
    return this.isSupervisor() &&
      (this.version?.supervisorApprove === null ||
        this.version?.clientApprove === false) ||
      (this.isClient() &&
        this.version?.clientApprove === null &&
        this.version?.supervisorApprove);
  }

  onSave(){
    this.version!.clientApprove = !this.isDisaproved;
    this.version!.supervisorApprove =!this.isDisaproved;
  }
}
