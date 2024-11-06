import { AfterViewInit, Component, Input } from '@angular/core';
import { I_Version_Data } from '../../../../shared/interfaces/project/view/version-view';
import { I_Employee_View_Data } from '../../../../shared/interfaces/user/view/employee-view';
import Swal from 'sweetalert2';
import { RequestDetailsService } from '../../services/request-details.service';
import { I_New_Version_Request } from '../../../../shared/interfaces/project/form/new-version-form';
import { I_Dialog_Box_Request } from '../../../../shared/interfaces/dialog-box/form/dialog-box-form';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrl: './version.component.css',
})
export class VersionComponent {
  profile!: I_Employee_View_Data;

  @Input() versions!: I_Version_Data[] | undefined;
  @Input() idBriefing!: string | undefined;

  isDisaproved: boolean = false;

  constructor(private requestDetailsService: RequestDetailsService) {}

  ngOnInit() {
    this.getActiveProfile();
    this.sortVersions();
  }

  private sortVersions() {
    this.versions?.sort((a, b) => {
      return a.versionNumber - b.versionNumber;
    });
  }

  private getActiveProfile() {
    const employee = sessionStorage.getItem('userProfile');
    if (employee !== null) {
      this.profile = JSON.parse(employee) as I_Employee_View_Data;
    }
  }

  getSessionProfile() {
    return this.profile.user.profile.description;
  }

  isSupervisor() {
    return this.profile.user.profile.description === 'ROLE_SUPERVISOR';
  }

  isCollaborator() {
    return this.profile.user.profile.description === 'ROLE_COLLABORATOR';
  }

  isClient() {
    return this.profile.user.profile.description === 'ROLE_CLIENT';
  }

  showNewVersion() {
    Swal.fire({
      title: '<h5 class="text-exo fw-bold">Inserir Nova Arte</h5>',
      html: `
        <div class="d-flex flex-column gap-4">
        <div class="form-group d-flex align-items-start flex-column gap-2">
        <label for="inputTitle">Título da Arte</label>
        <input type="text" id="inputTitle" class="form-control" [(ngModel)]="artTitle" name="artTitle">
        </div>
        <div class="form-group d-flex align-items-start flex-column gap-2">
        <label for="inputDescription">Descrição da Arte</label>
        <textarea id="inputDescription" class="form-control" [(ngModel)]="artDescription" name="artDescription"></textarea>
        </div>
        <div class="form-group d-flex align-items-start flex-column gap-2">
          <label for="inputImage">Imagem da Arte</label>
          <input type="file" id="inputImage" class="form-control"">
        </div>
        </div>
      `,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      cancelButtonText: 'Fechar',
      inputAutoFocus: true,
      width: '40%',
      padding: '3rem',
      preConfirm: () => {
        const inputTitle = document.getElementById(
          'inputTitle'
        ) as HTMLInputElement;
        const inputDescription = document.getElementById(
          'inputDescription'
        ) as HTMLTextAreaElement;
        const fileInput = document.getElementById(
          'inputImage'
        ) as HTMLInputElement;

        if (!inputTitle || !inputDescription || !fileInput) {
          throw new Error('Input elements not found');
        }

        const artTitle = inputTitle.value;
        const artDescription = inputDescription.value;
        const artImage = fileInput.files?.[0];

        if (!artImage) {
          Swal.showValidationMessage('Selecione uma imagem!');
          return false;
        }
        return { artTitle, artDescription, artImage };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.newVersion(
          result.value.artTitle,
          result.value.artDescription,
          result.value.artImage
        );
      }
    });
  }

  newVersion(
    artTitle: string,
    artDescription: string,
    artImage: File | undefined
  ): void {
    this.requestDetailsService
      .newVersion(this.idBriefing!, {
        productLink: artImage!.name,
      } as I_New_Version_Request)
      .subscribe((response) => {
        Swal.fire({
          title: 'Nova Arte Criada com Sucesso!',
          text: 'Aguardando aprovação do supervisor.',
          icon: 'success',
          confirmButtonColor: '#029982',
        });
        this.requestDetailsService
          .setNewDialogue({
            idEmployee: sessionStorage.getItem('idUser')!,
            idBriefing: this.idBriefing,
            message:
              'Uma nova arte foi criada. Aguardando aprovação do supervisor.',
          } as I_Dialog_Box_Request)
          .subscribe();
        this.versions!.push(response);
      });
  }

  showVersion(version: I_Version_Data) {
    Swal.fire({
      title: `<h5 class="text-exo fw-bold">Detalhes da Arte</h5>`,
      html: this.getHtmlVersionModal(version),
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      cancelButtonText: 'Fechar',
      width: '40%',
      padding: '3rem',
    });
  }

  isVersionApproved(version: I_Version_Data) {
    return version.clientApprove === true;
  }

  isVersionDisapproved(version: I_Version_Data) {
    return (
      version.clientApprove === false || version.supervisorApprove === false
    );
  }

  isDisapprovedBy(version: I_Version_Data) {
    if (this.isVersionDisapproved(version)) {
      return version.clientApprove === false ? 'cliente' : 'supervisor';
    }
    return '';
  }

  isVersionOpen(version: I_Version_Data) {
    if (this.isSupervisor()) return version.supervisorApprove === null;
    else if (this.isClient()) return version.clientApprove === null;
    else return false;
  }

  getHtmlVersionModal(version: I_Version_Data) {
    return `
      <div class="d-flex flex-column gap-2">
        <div class="d-flex gap-5 justify-content-center">
          <img src="/assets/images/${
            version.productLink
          }" alt="Arte" class="w-75 h-auto">
        </div>
        <div class="d-flex flex-column align-items-center py-3 border-bottom border-top">
          <p>Baixe a arte clicando no link abaixo:</p>
          <a href="${version.productLink}" target="_blank">${
      version.productLink
    }</a>
        </div>

        <div>
          ${
            this.isVersionApproved(version)
              ? `<p class="small-text text-success">Esta arte foi aprovada!</p>`
              : this.isVersionDisapproved(version)
              ? `<p>A arte não foi aprovada pelo ${
                  this.isDisapprovedBy(version) === 'supervisor'
                    ? 'supervisor'
                    : 'cliente'
                }!</p>
              <p class="small-text text-exo">Feedback: ${
                version.feedback || ''
              }</p>`
              : ''
          }
        </div>

        ${
          this.isVersionOpen(version)
            ? `<div class="d-flex flex-column gap-3 align-items-end justify-content-between">
                <div class="d-flex align-items-center justify-content-center w-100 gap-3 py-3">
                  <input type="radio" name="approveVersion" id="approve" checked="checked" (change)="${this.onApprove()}">
                  <label for="approve">Aprovar</label>

                  <input type="radio" name="approveVersion" id="non-approve" (change)="${this.onDisapprove()}">
                  <label for="non-approve">Não Aprovar</label>
                </div>
                ${this.isDisaproved ? `<div class="w-100">
                  <span>Feedback:</span>
                  <textarea class="form-control" placeholder="Informe o motivo para a não aprovação da arte desenvolvida..."
                    id="feedback" rows="5"></textarea>
                </div>` : ''}
              </div>`
            : ''
        }
      </div>
    `;
  }

  // ngAfterViewInit() {
  //   console.log(this.version);
  // }

  onApprove() {
    this.isDisaproved = false;
  }

  onDisapprove() {
    this.isDisaproved = true;
  }

  // isSupervisor() {
  //   return sessionStorage.getItem('userRole') === 'ROLE_SUPERVISOR';
  // }

  // isClient() {
  //   return sessionStorage.getItem('userRole') === 'ROLE_CLIENT';
  // }

  // isApprovedBySupervisor() {
  //   return this.version?.supervisorApprove === true;
  // }

  // isDisapprovedBySupervisor() {
  //   return this.version?.supervisorApprove === false;
  // }

  // isApprovedByClient() {
  //   return this.version?.clientApprove === true;
  // }

  // isDisapprovedByClient() {
  //   return this.version?.clientApprove === false;
  // }

  // isVersionApproved() {
  //   return this.isApprovedBySupervisor() && this.isApprovedByClient();
  // }

  // isVersionDisapproved() {
  //   return this.isDisapprovedBySupervisor() || this.isDisapprovedByClient();
  // }

  // showApproveSelect() {
  //   return this.isSupervisor() &&
  //     (this.version?.supervisorApprove === null ||
  //       this.version?.clientApprove === false) ||
  //     (this.isClient() &&
  //       this.version?.clientApprove === null &&
  //       this.version?.supervisorApprove);
  // }

  // onSave(){
  //   this.version!.clientApprove = !this.isDisaproved;
  //   this.version!.supervisorApprove =!this.isDisaproved;
  // }
}
