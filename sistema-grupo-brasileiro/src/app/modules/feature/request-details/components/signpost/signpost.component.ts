import { Component, Input, OnInit } from '@angular/core';
import { I_Signpost_Response } from '../../../../shared/interfaces/briefing/signpost/view/signpost-detailed-view';
import { RequestDetailsService } from '../../services/request-details/request-details.service';
import { I_Any_Briefing } from '../../../../shared/interfaces/briefing/any-briefing';
import { I_Version_Data } from '../../../../shared/interfaces/project/view/version-view';
import { StorageService } from '../../../../services/storage/storage.service';
import { UtilsService } from '../../services/utils/utils.service';
import { Router } from '@angular/router';
import { C_PROJECT_STATUS } from '../../../../shared/enums/project-status';

@Component({
  selector: 'app-signpost',
  templateUrl: './signpost.component.html',
  styleUrl: './signpost.component.css',
})
export class SignpostComponent implements OnInit {
  @Input() briefing!: I_Any_Briefing;
  data!: I_Signpost_Response;
  otherCompanies!: string[];
  roleCollaborator = 'ROLE_COLLABORATOR';

  isNewVersionModalOpen = false;
  isVersionModalOpen = false;

  artTitle: string = '';
  artDescription: string = '';
  artImage: File | null = null;

  selectedVersion: I_Version_Data | undefined;

  constructor(
    private storageService: StorageService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.data = this.briefing.type as I_Signpost_Response;
    this.otherCompanies = this.data.briefing.otherCompanies?.split(', ') || [];
  }

  getSessionProfile() {
    return sessionStorage.getItem('userRole');
  }

  toggleNewVersionModal() {
    this.isNewVersionModalOpen = !this.isNewVersionModalOpen;
  }

  toggleVersionModal(version?: I_Version_Data) {
    this.selectedVersion = version;
    this.isVersionModalOpen = !this.isVersionModalOpen;
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.artImage = fileInput.files[0];
    }
  }

  canEdit() {
    return (
      !this.storageService.isClient() &&
      this.data.project.status !== C_PROJECT_STATUS.COMPLETED.en
    );
  }

  isClient() {
    return this.storageService.isClient();
  }

  alterTitle() {
    return this.utilsService.alterTitle(this.data.project.id);
  }

  alterDate() {
    return this.utilsService.alterDate(this.data.project.id);
  }

  alterStatus() {
    return this.utilsService.alterStatus(
      this.data.project.id,
      this.data.project.status
    );
  }

  getStatus() {
    const status = this.data.project.status;
    for (const [key, value] of Object.entries(C_PROJECT_STATUS)) {
      if (value.en === status || value.pt === status) {
        return value.pt;
      }
    }
    return null;
  }

  isFinished() {
    return this.data.project.status === C_PROJECT_STATUS.COMPLETED.en;
  }
}
