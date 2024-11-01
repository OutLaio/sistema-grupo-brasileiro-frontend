import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgModule,
  OnInit,
  ViewChild,
} from '@angular/core';
import { I_Dialog_Box_Response } from '../../../../shared/interfaces/dialog-box/view/dialog-box-view';
import { RequestDetailsService } from '../../services/request-details.service';
import { I_Dialog_Box_Request } from '../../../../shared/interfaces/dialog-box/form/dialog-box-form';
import { I_Employee_View_Data } from '../../../../shared/interfaces/user/view/employee-view';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.css',
})
export class DialogBoxComponent implements OnInit {
  @ViewChild('scrollableContent') private scrollableContent!: ElementRef;
  idSupervisor = '1';
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
    this.service.getDialoguesByRequestId('1').subscribe((res) => {
      this.response = res.sort((a, b) => Number(a.id) - Number(b.id));
      console.log(this.response);
      this.cdr.detectChanges();
      this.scrollToBottom();
    });

    this.service.getAllCollaborators().subscribe(
      (res) => {
        this.allCollaborators = res.content as Array<I_Employee_View_Data>;
      }
    )
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
      idBriefing: '1',
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
    console.log(this.selectedCollaborator.name);
  }
}
