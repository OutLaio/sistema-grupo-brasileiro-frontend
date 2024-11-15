import { Component, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { StorageService } from '../../../../services/storage/storage.service';
import { RequestDetailsService } from '../../services/request-details/request-details.service';
import { I_Project_Data } from '../../../../shared/interfaces/project/view/project-view';

@Component({
  selector: 'app-has-production',
  templateUrl: './has-production.component.html',
  styleUrl: './has-production.component.css'
})
export class HasProductionComponent {

  @Input() project: I_Project_Data | null = null;

  constructor(
    private storageService: StorageService,
    private requestService: RequestDetailsService
  ) {}

  showModal() {
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
          error: (err) => Swal.fire('Erro ao atualizar o status!', err.message, 'error').then(() => window.location.reload())
        });
      } else {
        this.requestService.hasProduction(this.project?.id!, false).subscribe({
          next: () => Swal.fire('Finalizado', 'O status do projeto foi atualizado com sucesso!', 'success').then(() => window.location.reload()),
          error: (err) => Swal.fire('Erro ao atualizar o status!', err.message, 'error').then(() => window.location.reload())
        })
      }
    });
  }

  isApproved() {
    return this.project?.status === 'APPROVED' && this.storageService.isSupervisor();
  }
}
