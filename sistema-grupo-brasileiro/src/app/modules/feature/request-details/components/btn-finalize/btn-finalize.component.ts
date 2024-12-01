import { Component, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { StorageService } from '../../../../services/storage/storage.service';
import { RequestDetailsService } from '../../services/request-details/request-details.service';
import { I_Project_Data } from '../../../../shared/interfaces/project/view/project-view';
import { HttpErrorResponse } from '@angular/common/http';
import { C_PROJECT_STATUS } from '../../../../shared/enums/project-status';

@Component({
  selector: 'app-btn-finalize',
  templateUrl: './btn-finalize.component.html',
  styleUrl: './btn-finalize.component.css'
})
export class BtnFinalizeComponent {

  @Input() project: I_Project_Data | null = null;

  constructor(
    private storageService: StorageService,
    private requestService: RequestDetailsService
  ) {}

  confirmConfection() {
    Swal.fire({
      html: `<h4>Confirmação de Confecção</h4>
              <p>Este projeto inclui a necessidade de confecção? Selecione "Sim" caso seja necessário, caso contrário selecione "Não" para finalizar.</p>`,
      icon: 'question',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      confirmButtonColor: '#029982',
    }).then((result) => {
      if (result.isConfirmed) {
        this.requestService.hasProduction(this.project?.id!, true).subscribe({
          next: (value) => Swal.fire('Em confecção', value.message, 'success').then(() => window.location.reload()),
          error: (err: HttpErrorResponse) => Swal.fire('Erro ao atualizar o status!', err.error.message, 'error').then(() => window.location.reload())
        });
      } else {
        this.requestService.hasProduction(this.project?.id!, false).subscribe({
          next: (value) => Swal.fire('Finalizado', value.message, 'success').then(() => window.location.reload()),
          error: (err: HttpErrorResponse) => Swal.fire('Erro ao atualizar o status!', err.error.message, 'error').then(() => window.location.reload())
        })
      }
    });
  }

  confirmFinish() {
    Swal.fire({
      html: `<h4>Confirmação de Finalização</h4>
              <p>Deseja finalizar esta solicitação?</p>`,
      icon: 'question',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      confirmButtonColor: '#029982',
    }).then((result) => {
      if (result.isConfirmed) {
        this.requestService.finishProject(this.project?.id!).subscribe({
          next: (value) => Swal.fire('Finalizado', value.message, 'success').then(() => window.location.reload()),
          error: (err: HttpErrorResponse) => Swal.fire('Erro ao atualizar o status!', err.error.message, 'error').then(() => window.location.reload())
        });
      }
    });
  }

  isApproved() {
    return this.project?.status === C_PROJECT_STATUS.APPROVED.en && !this.storageService.isClient();
  }

  isConfection() {
    return this.project?.status === C_PROJECT_STATUS.IN_PRODUCTION.en && !this.storageService.isClient();
  }
}
