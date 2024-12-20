import { I_Approve_Request } from './../../../../shared/interfaces/project/form/approve-form';
import { AfterViewInit, Component, Input } from '@angular/core';
import { I_Version_Data } from '../../../../shared/interfaces/project/view/version-view';
import { I_Employee_View_Data } from '../../../../shared/interfaces/user/view/employee-view';
import Swal from 'sweetalert2';
import { RequestDetailsService } from '../../services/request-details/request-details.service';
import { I_New_Version_Request } from '../../../../shared/interfaces/project/form/new-version-form';
import { I_Dialog_Box_Request } from '../../../../shared/interfaces/dialog-box/form/dialog-box-form';
import { StorageService } from '../../../../services/storage/storage.service';
import { I_Any_Briefing } from '../../../../shared/interfaces/briefing/any-briefing';
import { C_PROJECT_STATUS } from '../../../../shared/enums/project-status';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * Componente responsável por gerenciar a versão do projeto.
 * Permite visualizar, aprovar, ou rejeitar versões de arte, além de adicionar novas versões.
 */
@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrl: './version.component.css',
})
export class VersionComponent {
  /**
  * Dados do briefing que contém as versões do projeto.
  */
  @Input() data: I_Any_Briefing | undefined;

  open = 'open'; /** Status da versão em aberto */
  reject = 'reject'; /** Status da versão rejeitada */
  approve = 'approve'; /** Status da versão aprovada */

  /**
   * Cria uma instância da classe que depende de RequestDetailsService e StorageService.
   * 
   * @param {RequestDetailsService} requestDetailsService - Serviço responsável pela obtenção e manipulação de detalhes das requisições.
   * @param {StorageService} storageService - Serviço responsável pela manipulação de dados de armazenamento.
   */
  constructor(
    private requestDetailsService: RequestDetailsService,
    private storageService: StorageService
  ) { }

  /**
   * Método de ciclo de vida do Angular. Executado quando o componente é inicializado.
   * Inicializa o componente e ordena as versões do briefing.
   */
  ngOnInit() {
    this.sortVersions();
  }

  /**
   * Ordena as versões do briefing com base no número da versão.
   */
  private sortVersions() {
    this.data?.type.briefing.versions?.sort((a, b) => {
      return a.versionNumber - b.versionNumber;
    });
  }

  /**
   * Verifica se o usuário é um supervisor.
   * @returns `true` se o usuário for um supervisor.
   */
  isSupervisor() {
    return this.storageService.isSupervisor();
  }

  /**
   * Verifica se o usuário é um colaborador.
   * @returns `true` se o usuário for um colaborador.
   */
  isCollaborator() {
    return this.storageService.isCollaborator();
  }

  /**
   * Verifica se o usuário é um cliente.
   * @returns `true` se o usuário for um cliente.
   */
  isClient() {
    return this.storageService.isClient();
  }

  /**
  * Exibe o modal para inserir uma nova versão de arte.
  */
  showNewVersion() {
    Swal.fire({
      title: '<h5 class="text-exo fw-bold">Inserir Nova Arte</h5>',
      html: `
        <div class="form-group d-flex align-items-start flex-column gap-2">
          <input type="file" id="inputImage" class="form-control"">
        </div>`,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      cancelButtonText: 'Fechar',
      confirmButtonColor: '#029982',
      reverseButtons: true,
      inputAutoFocus: true,
      width: '40%',
      padding: '3rem',
      preConfirm: () => {
        const fileInput = document.getElementById(
          'inputImage'
        ) as HTMLInputElement;

        if (!fileInput) {
          throw new Error('Input element not found');
        }

        const artImage = fileInput.files?.[0];

        if (!artImage) {
          Swal.showValidationMessage('Selecione uma imagem!');
          return false;
        }
        return { artImage };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.newVersion(result.value.artImage);
      }
    });
  }

  /**
   * Faz o upload do arquivo de imagem e cria uma nova versão.
   * @param artImage A imagem de arte a ser enviada.
   */
  newVersion(artImage: File | undefined): void {
    console.log(artImage);
    if (artImage)
      this.requestDetailsService.uploadFile(artImage).subscribe({
        next: (res) => {
          console.log(res.message);
          this.requestDetailsService
            .newVersion(this.data?.type.project.id!, {
              productLink: res.data!.fileDownloadUri,
            } as I_New_Version_Request)
            .subscribe((response) => {
              Swal.fire({
                title: response.message,
                text: 'Aguardando aprovação do supervisor.',
                icon: 'success',
                confirmButtonColor: '#029982',
              }).then(() => {
                window.location.reload();
              });
              this.data?.type.briefing.versions!.push(response.data!);
            });
        },
        error: (err: HttpErrorResponse) =>
          Swal.fire('Arte não salva', err.error.message, 'error'),
      });
  }
  /**
   * Exibe os detalhes de uma versão específica.
   * @param version A versão do projeto a ser visualizada.
   */
  showVersion(version: I_Version_Data) {
    Swal.fire({
      title: `<h5 class="text-exo fw-bold">Detalhes da Arte</h5>`,
      html: this.getHtmlVersionModal(version),
      reverseButtons: true,
      showCloseButton: true,
      showCancelButton: true,
      showConfirmButton: this.isVersionOpenToMe(version) ? true : false,
      confirmButtonText: 'Salvar',
      cancelButtonText: 'Fechar',
      confirmButtonColor: '#029982',
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

        const reviewInput = document.getElementById(
          'review'
        ) as HTMLInputElement;
        const forceApproveInput = document.getElementById(
          'force-approve'
        ) as HTMLInputElement;

        let status: boolean | null = null;
        let feedback: string | null = null;
        let forceApprove: boolean | null = null;

        if (approveInput && approveInput.checked) {
          status = true;
        } else if (disapproveInput && disapproveInput.checked) {
          status = false;
          feedback = feedbackInput.value;
        } else if (reviewInput && reviewInput.checked) {
          forceApprove = false;
          status = false;
        } else if (forceApproveInput && forceApproveInput.checked) {
          forceApprove = true;
          status = true;
        }

        if (status === null && forceApprove === null) {
          Swal.showValidationMessage(
            'Selecione se a arte foi aprovada ou não!'
          );
          return false;
        } else if (!status && !feedback && forceApprove === null) {
          Swal.showValidationMessage(
            'Informe o feedback para a não aprovação!'
          );
          return false;
        }

        return { status, feedback, forceApprove };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const title = result.value.status
          ? 'Arte Aprovada com Sucesso!'
          : 'Arte Não Aprovada!';
        const icon = result.value.status ? 'success' : 'error';
        let text = '';
        let request: I_Approve_Request = {
          idVersion: version.id,
          approved: result.value.status,
          feedback:
            result.value.forceApprove === null
              ? result.value.feedback
              : version.feedback,
        };
        if (this.isSupervisor()) {
          text = result.value.status
            ? result.value.forceApprove
              ? ''
              : 'Aguardando aprovação do cliente!'
            : 'O projeto foi retornado para desenvolvimento!';
          this.requestDetailsService
            .supervisorApproval(this.data?.type.project.id!, request)
            .subscribe((res) => (version = res.data!));
        } else if (this.isClient()) {
          text = result.value.status ? '' : 'Sua solicitação está em análise!';
          this.requestDetailsService
            .clientApproval(this.data?.type.project.id!, request)
            .subscribe((res) => (version = res.data!));
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

  /**
   * Verifica se a versão foi aprovada.
   * @param version A versão a ser verificada.
   * @returns `true` se a versão foi aprovada.
   */
  isVersionApproved(version: I_Version_Data) {
    return version.clientApprove !== null && version.supervisorApprove === true;
  }

  /**
   * Verifica se a versão foi rejeitada.
   * @param version A versão a ser verificada.
   * @returns `true` se a versão foi rejeitada.
   */
  isVersionDisapproved(version: I_Version_Data) {
    return (
      version.clientApprove === false || version.supervisorApprove === false
    );
  }

  /**
   * Verifica se a versão foi reprovada e quem foi o responsável pela reprovação.
   * 
   * @param {I_Version_Data} version - O objeto representando a versão a ser verificada.
   * @returns {string} - Retorna 'cliente' se o cliente reprovou, 'supervisor' se o supervisor reprovou, ou uma string vazia caso a versão não tenha sido reprovada.
   *
   * const approvalStatus = this.isDisapprovedBy(version); // Retorna 'cliente'
   */
  isDisapprovedBy(version: I_Version_Data) {
    if (this.isVersionDisapproved(version)) {
      return version.clientApprove === false ? 'cliente' : 'supervisor';
    }
    return '';
  }

  /**
   * Verifica se a versão está aberta para o usuário interagir.
   * 
   * @param {I_Version_Data} version - A versão a ser verificada.
   * @returns {boolean} Retorna true se a versão estiver aberta.
   */
  isVersionOpenToMe(version: I_Version_Data) {
    if (this.isSupervisor()) return version.supervisorApprove === null;
    else if (this.isClient())
      return (
        version.clientApprove === null && version.supervisorApprove === true
      );
    else return false;
  }

  /**
   * Gera o HTML do modal de versão com base na versão fornecida.
   * 
   * @param {I_Version_Data} version - A versão cujos detalhes serão exibidos no modal.
   * @returns {string} O HTML do modal.
   */
  getHtmlVersionModal(version: I_Version_Data) {
    return `
      <div class="d-flex flex-column gap-2">
        <div class="d-flex gap-5 justify-content-center">
          <img src="${version.productLink
      }" alt="Arte" style="max-height: 200px;">
        </div>
        ${this.isVersionOpenToMe(version) || this.isVersionApproved(version)
        ? `
          <div class="d-flex flex-column align-items-center py-3 border-bottom border-top">
            <p>Baixe a arte clicando no link abaixo:</p>
            <a href="${version.productLink}" target="_blank">${version.productLink}</a>
          </div>`
        : ''
      }
        <div class="mt-4">
          ${this.versionStatus(version) == this.approve
        ? `<p class="text-exo fw-bold fst-italic text-success">Esta arte foi aprovada!</p>`
        : this.versionStatus(version) == this.reject
          ? `<p class="text-exo fw-bold fst-italic text-danger">A arte não foi aprovada pelo ${this.isDisapprovedBy(version) === 'supervisor'
            ? 'supervisor'
            : 'cliente'
          }!</p>
              <div class="d-flex flex-column align-items-start w-100 mt-4">
                <p class="text-exo fw-bold">Feedback:</p>
                <p class="d-flex small-text w-100 text-exo mb-0 px-4 py-3 bg-secondary rounded-3 text-align-start"
                  style="--bs-bg-opacity: .2;"> ${version.feedback || ''}
                </p>
              </div>
              ${this.willForce(version)
            ? `<div class="d-flex flex-column gap-3 align-items-end justify-content-between">
                    <div class="d-flex align-items-center justify-content-center w-100 gap-3 py-3">
                      <input class="in-radio" type="radio" name="approveVersion" id="review">
                      <label class="lb" for="review">Aceitar Revisão</label>

                      <input class="in-radio in-radio-reject" type="radio" name="approveVersion" id="force-approve">
                      <label class="lb lb-reject" for="force-approve">Forçar Aprovação</label>
                    </div>
                  </div>`
            : ``
          }
              `
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

  /**
   * Verifica o status da versão e retorna a string correspondente ao status.
   * 
   * @param {I_Version_Data} version - A versão a ser verificada.
   * @returns {string} O status da versão: 'approve', 'reject' ou 'open'.
   */
  versionStatus(version: I_Version_Data) {
    if (version.supervisorApprove && version.clientApprove !== null)
      return this.approve;
    else if (
      version.supervisorApprove === false ||
      version.clientApprove === false
    )
      return this.reject;
    else return this.open;
  }

  /**
   * Verifica se o colaborador tem permissão para acessar uma nova versão do projeto, baseado no status do projeto.
   * 
   * @returns {boolean} - Retorna true se o colaborador tem permissão para acessar a nova versão, ou false caso contrário. 
   * O acesso é permitido se o status do projeto for 'em andamento' ou 'aguardando aprovação'.
   *
  */
  isOpenToNewVersion() {
    if (this.isCollaborator())
      return (
        this.data?.type.project.status === C_PROJECT_STATUS.IN_PROGRESS.en ||
        this.data?.type.project.status === C_PROJECT_STATUS.WAITING_APPROVAL.en
      );
    return false;
  }

  /**
   * Verifica se a opção "Forçar Aprovação" está disponível para a versão.
   * 
   * @param {I_Version_Data} version - A versão a ser verificada.
   * @returns {boolean} Retorna `true` se a opção "Forçar Aprovação" está disponível.
   */
  willForce(version: I_Version_Data) {
    return (
      this.isSupervisor() &&
      version.supervisorApprove === null &&
      version.clientApprove === false
    );
  }
}
