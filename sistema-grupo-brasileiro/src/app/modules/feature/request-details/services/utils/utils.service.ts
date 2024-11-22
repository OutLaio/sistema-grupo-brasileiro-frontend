import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { RequestDetailsService } from '../request-details/request-details.service';
import { I_Alter_Title_Request } from '../../../../shared/interfaces/project/form/alter-title-form';
import { HttpErrorResponse } from '@angular/common/http';
import { I_Alter_Date_Request } from '../../../../shared/interfaces/project/form/alter-date-form';
import { StorageService } from '../../../../services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private requestService: RequestDetailsService,
    private storageService: StorageService
  ) { }

  alterTitle(idProject: string) {
    Swal.fire({
      html: '<h4>Alterar Título do Projeto</h4>',
      input: 'text',
      inputPlaceholder: 'Novo Título',
      showCancelButton: true,
      confirmButtonText: 'Alterar',
      confirmButtonColor: '#029982',
    }).then((result) => {
      if (result.isConfirmed) {
        const newTitle: I_Alter_Title_Request = {
          newTitle: result.value
        };
        this.requestService.updateTitle(idProject, newTitle).subscribe({
          next: (value) => Swal.fire('Título Alterado!', value.message, 'success').then(() => window.location.reload()),
          error: (err: HttpErrorResponse) => Swal.fire('Título Não Alterado!', err.message, 'error')
        });
      }
    });
  }

  alterDate(idProject: string) {
    Swal.fire({
      html: '<h4>Alterar Data de Entrega</h4>',
      input: 'date',
      showCancelButton: true,
      confirmButtonText: 'Alterar',
      confirmButtonColor: '#029982',
    }).then((result) => {
      if (result.isConfirmed) {
        const newDate: I_Alter_Date_Request = {
          newDate: result.value
        };
        this.requestService.updateDate(idProject, newDate).subscribe({
          next: (value) => Swal.fire('Data Alterada!', value.message, 'success').then(() => window.location.reload()),
          error: (err: HttpErrorResponse) => Swal.fire('Data Não Alterada!', err.message, 'error')
        });
      }
    });
  }
}
