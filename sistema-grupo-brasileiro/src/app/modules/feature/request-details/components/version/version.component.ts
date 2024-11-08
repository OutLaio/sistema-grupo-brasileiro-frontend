import { I_Approve_Request } from './../../../../shared/interfaces/project/form/approve-form';
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

  open = 'open';
  reject = 'reject';
  approve = 'approve';

  constructor(private requestDetailsService: RequestDetailsService) {}

  ngOnInit() {
    this.getActiveProfile();
    this.sortVersions();
    console.log(this.versions);
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
      html: this.getHtmlNewVersionModal(),
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

  getHtmlNewVersionModal() {
    return `
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
      `;
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
      reverseButtons: true,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      cancelButtonText: 'Fechar',
      confirmButtonColor: '#029982',
      focusCancel: true,
      width: '40%',
      padding: '3rem',
      preConfirm: () => {
        const approveInput = document.getElementById(
          'approve'
        ) as HTMLInputElement;
        const disapproveInput = document.getElementById(
          'non-approve'
        ) as HTMLInputElement;
        const feedbackInput = document.getElementById(
          'feedback'
        ) as HTMLTextAreaElement;

        let status: boolean | null = null;
        let feedback = '';

        if (approveInput && approveInput.checked) {
          status = true;
        } else if (disapproveInput && disapproveInput.checked) {
          status = false;
          feedback = feedbackInput.value || '';
        }

        if (status === null) {
          Swal.showValidationMessage(
            'Selecione se a arte foi aprovada ou não!'
          );
          return false;
        } else if (!status && !feedback) {
          Swal.showValidationMessage(
            'Informe o feedback para a não aprovação!'
          );
          return false;
        }

        return { status, feedback };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const title = result.value.status
          ? 'Arte Aprovada com Sucesso!'
          : 'Arte Não Aprovada!';
        const icon = result.value.status ? 'success' : 'error';
        let text = '';
        let request: I_Approve_Request = {
          idProject: this.idBriefing!,
          idVersion: version.id,
          approved: result.value.status,
          feedback: result.value.feedback,
        };
        if (this.isSupervisor()) {
          text = result.value.status
            ? 'Aguardando aprovação do cliente!'
            : 'O projeto foi retornado para desenvolvimento!';
          this.requestDetailsService
            .supervisorApproval(request)
            .subscribe((res) => (version = res));
        } else if (this.isClient()) {
          text = result.value.status ? '' : 'Sua solicitação está em análise!';
          this.requestDetailsService
            .clientApproval(request)
            .subscribe((res) => (version = res));
        }
        Swal.fire({
          title: title,
          icon: icon,
          text: text != '' ? text : undefined,
          confirmButtonColor: '#029982',
        }).then(() => window.location.reload());
      }
    });
    setTimeout(() => {
      console.log('timeout');
      const disapproveInput = document.getElementById(
        'non-approve'
      ) as HTMLInputElement;
      const feedbackContainer = document.getElementById('feedbackContainer');
      console.log(feedbackContainer);

      if (disapproveInput && feedbackContainer) {
        disapproveInput.addEventListener('change', () => {
          feedbackContainer.style.display = 'block';
          Swal.resetValidationMessage();
        });
        const approveInput = document.getElementById(
          'approve'
        ) as HTMLInputElement;
        approveInput.addEventListener('change', () => {
          feedbackContainer.style.display = 'none';
          Swal.resetValidationMessage();
        });
      }
    }, 0);
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

  isVersionOpenToMe(version: I_Version_Data) {
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
        <div class="mt-4">
          ${
            this.versionStatus(version) == this.approve
              ? `<p class="text-exo fw-bold fst-italic text-success">Esta arte foi aprovada!</p>`
              : this.versionStatus(version) == this.reject
              ? `<p class="text-exo fw-bold fst-italic text-danger">A arte não foi aprovada pelo ${
                  this.isDisapprovedBy(version) === 'supervisor'
                    ? 'supervisor'
                    : 'cliente'
                }!</p>
              <div class="d-flex flex-column align-items-start w-100 mt-4">
                <p class="text-exo fw-bold">Feedback:</p>
                <p class="d-flex small-text w-100 text-exo mb-0 px-4 py-3 bg-secondary rounded-3 text-align-start"
                  style="--bs-bg-opacity: .2;"> ${version.feedback || ''}
                </p>
              </div>`
              : this.isVersionOpenToMe(version)
              ? `<div class="d-flex flex-column gap-3 align-items-end justify-content-between">
                  <div class="d-flex align-items-center justify-content-center w-100 gap-3 py-3">
                    <input class="in-radio" type="radio" name="approveVersion" id="approve">
                    <label class="lb" for="approve">Aprovar</label>

                    <input class="in-radio in-radio-reject" type="radio" name="approveVersion" id="non-approve">
                    <label class="lb lb-reject" for="non-approve">Não Aprovar</label>
                  </div>
                  <div id="feedbackContainer" class="w-100" style="display: none;">
                    <span>Feedback:</span>
                    <textarea class="form-control" placeholder="Informe o motivo para a não aprovação da arte desenvolvida..."
                      id="feedback" rows="5"></textarea>
                  </div>
                </div>`
              : `<p class="text-exo fw-bold fst-italic text-warning">Aguardando aprovação ...</p>`
          }
        </div>
      </div>
    `;
  }

  versionStatus(version: I_Version_Data) {
    if (version.supervisorApprove && version.clientApprove) return this.approve;
    else if (
      version.supervisorApprove === false ||
      version.clientApprove === false
    )
      return this.reject;
    else return this.open;
  }
}
