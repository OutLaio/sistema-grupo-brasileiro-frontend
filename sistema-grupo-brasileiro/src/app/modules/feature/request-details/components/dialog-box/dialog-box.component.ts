import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgModule,
  OnInit,
  ViewChild,
} from '@angular/core';
import { I_Dialog_Box_Response } from '../../../../shared/interfaces/dialog-box/view/dialog-box-view';
import { RequestDetailsService } from '../../services/request-details/request-details.service';
import { I_Dialog_Box_Request } from '../../../../shared/interfaces/dialog-box/form/dialog-box-form';
import { I_Employee_View_Data } from '../../../../shared/interfaces/user/view/employee-view';
import { I_Employee_Simple_View_Data } from '../../../../shared/interfaces/user/view/employee-simple-view';
import { I_Assign_Collaborator_Request } from '../../../../shared/interfaces/project/form/assign-collaborator-form';
import { I_Project_Data } from '../../../../shared/interfaces/project/view/project-view';
import Swal from 'sweetalert2';
import { StorageService } from '../../../../services/storage/storage.service';
import { C_PROJECT_STATUS } from '../../../../shared/enums/project-status';

/**
 * Componente que exibe a caixa de diálogo para o projeto.
 * Permite o envio de mensagens entre os envolvidos e atribuição de colaboradores ao projeto.
 */
@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.css',
})
export class DialogBoxComponent implements OnInit {
  /**
   * Projeto atual que será exibido na caixa de diálogo.
   * @type {I_Project_Data | undefined}
   */
  @Input() project!: I_Project_Data | undefined;

  /**
   * Elemento referenciado para conteúdo rolável.
   * @type {ElementRef}
   */
  @ViewChild('scrollableContent') private scrollableContent!: ElementRef;
  /**
   * Mensagem digitada pelo usuário.
   * @type {string}
   */
  messageText = '';
  /**
   * Lista de mensagens na caixa de diálogo.
   * @type {I_Dialog_Box_Response[]}
   */
  messages!: I_Dialog_Box_Response[];
  /**
   * Flag que indica se o modal está aberto.
   * @type {boolean}
   */
  isModalOpen = false;

  /**
   * Lista de colaboradores do projeto.
   * @type {I_Employee_View_Data[]}
   */
  allCollaborators!: I_Employee_View_Data[];
  /**
   * Colaborador selecionado para atribuição ao projeto.
   * @type {I_Employee_View_Data | null}
   */
  selectedCollaborator!: I_Employee_View_Data | null;

  /**
   * Construtor do componente. Inicia os serviços necessários.
   * @param {RequestDetailsService} service Serviço para obter detalhes da solicitação.
   * @param {ChangeDetectorRef} cdr Refatoração de mudança de detecção.
   * @param {StorageService} storageService Serviço para acessar o armazenamento de sessão.
   */
  constructor(
    private service: RequestDetailsService,
    private cdr: ChangeDetectorRef,
    private storageService: StorageService
  ) { }

  /**
   * Ciclo de vida do componente angular chamado ao inicializar o componente.
   * Este método é chamado assim que o componente é criado.
   * Carrega as mensagens do diálogo e a lista de colaboradores se o usuário for supervisor.
   */
  ngOnInit(): void {
    this.service.getDialoguesByRequestId(this.project!.id).subscribe((res) => {
      this.messages = res.data!.sort((a, b) => Number(a.id) - Number(b.id));
      this.cdr.detectChanges();
      this.scrollToBottom();
    });

    if (this.storageService.isSupervisor()) {
      this.service.getAllCollaborators(0, 20).subscribe((res) => {
        if (res.data!.last)
          this.allCollaborators = res.data?.content as I_Employee_View_Data[];
        else
          this.service.getAllCollaborators(0, res.data!.totalElements + 1).subscribe((newRes) => {
            this.allCollaborators = newRes.data!.content as I_Employee_View_Data[];
          })
      });
    }
  }

  /**
   * Verifica se o usuário atual é um supervisor.
   * @returns {boolean} Retorna true se o usuário for supervisor, caso contrário, false.
   */
  isSupervisor() {
    return this.storageService.isSupervisor();
  }

  /**
   * Verifica se a mensagem foi enviada pelo usuário atual.
   * @param {I_Dialog_Box_Response} message A mensagem a ser verificada.
   * @returns {boolean} Retorna true se a mensagem for do usuário atual.
   */
  isMyMessage(message: I_Dialog_Box_Response) {
    if (message.employee.id == '0')
      return null;
    return this.storageService.getUserId() === message.employee.id;
  }

  /**
   * Rola automaticamente o conteúdo para o final.
   */
  private scrollToBottom() {
    try {
      this.scrollableContent.nativeElement.scrollTop =
        this.scrollableContent.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Erro ao rolar para o final:', err);
    }
  }

  /**
   * Envia uma nova mensagem no diálogo.
   */
  newMessage() {
    if (this.messageText.trim() === '') {
      this.messageText = '';
      return;
    }

    if (this.isFinished())
      return;

    const request: I_Dialog_Box_Request = {
      idBriefing: this.project!.id,
      idEmployee: this.storageService.getUserId(),
      message: this.messageText,
    };
    this.service.setNewDialogue(request).subscribe((res) => {
      this.messages.push(res.data!);
      this.messageText = '';
      this.scrollToBottom();
    });
  }

  /**
   * Abre o modal de seleção de colaborador.
   */
  openModal() {
    this.isModalOpen = true;
  }

  /**
   * Fecha o modal de seleção de colaborador.
   */
  closeModal() {
    this.selectedCollaborator = null;
    this.isModalOpen = false;
  }

  /**
   * Exibe o modal de alteração de colaborador.
   */
  showModalAlterColaborator() {
    Swal.fire({
      title: 'Selecionar Colaborador',
      html: this.getHtmlModalAlterCollaborator(),
      confirmButtonText: this.project?.collaborator != null ? 'Alterar' : 'Salvar',
      showCancelButton: true,
      confirmButtonColor: '#029982',
      cancelButtonText: 'Voltar',
      reverseButtons: true,
      width: '30%',
      padding: '3rem',
      preConfirm: () => {
        const select = document.querySelector('input[name="options-outlined"]:checked') as HTMLInputElement;
        this.selectedCollaborator = this.allCollaborators.find(c => c.id == select.id)!;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.selectCollaborator();
      }
    });
  }

  /**
   * Atribui o colaborador selecionado ao projeto.
   */
  selectCollaborator() {
    console.log(this.selectedCollaborator)
    if (!this.selectedCollaborator) {
      return;
    }
    Swal.fire({
      title: 'Atribuir Colaborador',
      text:
        'Confirma a atribuição de ' +
        this.selectedCollaborator.name +
        ' ao projeto?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonColor: '#029982',
      denyButtonColor: '#d33',
      confirmButtonText: 'Sim',
      denyButtonText: 'Não',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const request: I_Assign_Collaborator_Request = {
          idCollaborator: this.selectedCollaborator!.id,
        }
        this.service
          .assignCollaborator(this.project!.id, request)
          .subscribe((res) => {
            this.project!.collaborator = {
              id: this.selectedCollaborator?.id!,
              fullName:
                this.selectedCollaborator?.name! +
                ' ' +
                this.selectedCollaborator?.lastname!,
              avatar: this.selectedCollaborator?.avatar!,
            };
            Swal.fire({
              title: 'Sucesso!',
              text: res.message,
              icon: 'success',
              iconColor: '#029982',
              confirmButtonColor: '#029982',
            }).then(() => {
              window.location.reload();
            });
          });
      }
    });
  }

  /**
   * Gera o conteúdo HTML do modal de alteração de colaborador.
   * @returns {string} O HTML gerado para o modal.
   */
  getHtmlModalAlterCollaborator() {
    let divs = "";
    this.allCollaborators.map((collaborator) => {
      divs += `
      ${collaborator.id != this.project?.collaborator?.id
          ? `<div>
            <input type="radio" class="btn-check" name="options-outlined" id="${collaborator.id}"
              autocomplete="off" [value]="${collaborator}">
            <label class="btn btn-outline-success d-flex gap-2 align-items-center" for="${collaborator.id}">
              <img src="/assets/images/avatars/${collaborator.avatar}.png" alt="profile image" height="40px">
              <p class="mb-0">${collaborator.name + ' ' + collaborator.lastname}</p>
            </label>
          </div>`
          : ''
        }
            `;
    })

    let html = `
    <div class="d-flex flex-column gap-2">
      ${divs}
    </div>
    `;
    return html;
  }

  /**
   * Verifica se o usuário pode editar o projeto.
   * @returns {boolean} Retorna true se o usuário puder editar, caso contrário, false.
   */
  canEdit() {
    return (
      this.storageService.isSupervisor() &&
      this.project!.status !== C_PROJECT_STATUS.COMPLETED.en
    );
  }

  /**
   * Verifica se o projeto está finalizado.
   * @returns {boolean} Retorna true se o projeto estiver finalizado.
   */
  isFinished() {
    return this.project!.status === C_PROJECT_STATUS.COMPLETED.en;
  }
}
