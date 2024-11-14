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
import { RequestDetailsService } from '../../services/request-details.service';
import { I_Dialog_Box_Request } from '../../../../shared/interfaces/dialog-box/form/dialog-box-form';
import { I_Employee_View_Data } from '../../../../shared/interfaces/user/view/employee-view';
import { I_Employee_Simple_View_Data } from '../../../../shared/interfaces/user/view/employee-simple-view';
import { I_Assign_Collaborator_Request } from '../../../../shared/interfaces/project/form/assign-collaborator-form';
import { I_Project_Data } from '../../../../shared/interfaces/project/view/project-view';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.css',
})
export class DialogBoxComponent implements OnInit {
  @Input() project!: I_Project_Data | undefined;

  @ViewChild('scrollableContent') private scrollableContent!: ElementRef;
  idSupervisor = 'ROLE_SUPERVISOR';
  messageText = '';
  response!: I_Dialog_Box_Response[];
  isModalOpen = false;

  allCollaborators!: I_Employee_View_Data[];
  selectedCollaborator!: I_Employee_View_Data | null;

  constructor(
    private service: RequestDetailsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.service.getDialoguesByRequestId(this.project!.id).subscribe((res) => {
      this.response = res.sort((a, b) => Number(a.id) - Number(b.id));
      this.cdr.detectChanges();
      this.scrollToBottom();
    });

    if (this.getSessionProfile() === this.idSupervisor) {
      this.service.getAllCollaborators().subscribe((res) => {
        this.allCollaborators = res.content as Array<I_Employee_View_Data>;
        console.log(this.allCollaborators);
      });
    }
  }

  private scrollToBottom() {
    try {
      this.scrollableContent.nativeElement.scrollTop =
        this.scrollableContent.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Erro ao rolar para o final:', err);
    }
  }

  getSessionId() {
    return sessionStorage.getItem('idUser');
  }

  getSessionProfile() {
    return sessionStorage.getItem('userRole');
  }

  newMessage() {
    if (this.messageText.trim() === '') {
      this.messageText = '';
      return;
    }
    const request: I_Dialog_Box_Request = {
      idBriefing: this.project!.id,
      idEmployee: this.getSessionId()!,
      message: this.messageText,
    };
    this.service.setNewDialogue(request).subscribe((res) => {
      this.response.push(res);
      this.messageText = '';
      this.scrollToBottom();
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.selectedCollaborator = null;
    this.isModalOpen = false;
  }

  selectCollaborator() {
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
        };
        this.service
          .assignCollaborator(this.project!.id, request)
          .subscribe(() => {
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
              text:
                'O(a) colaborador(a) ' +
                this.selectedCollaborator?.name +
                ' foi atribuído(a) ao projeto.',
              icon: 'success',
              iconColor: '#029982',
              confirmButtonColor: '#029982',
            }).then(() => {
              this.closeModal();
            });
          });
      }
    });
  }
}
