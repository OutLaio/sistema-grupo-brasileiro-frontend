import { C_PROJECT_STATUS } from './../../../../shared/enums/project-status';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { RequestDetailsService } from '../request-details/request-details.service';
import { I_Alter_Title_Request } from '../../../../shared/interfaces/project/form/alter-title-form';
import { HttpErrorResponse } from '@angular/common/http';
import { I_Alter_Date_Request } from '../../../../shared/interfaces/project/form/alter-date-form';
import { StorageService } from '../../../../services/storage/storage.service';
import { I_Alter_Status_Request } from '../../../../shared/interfaces/project/form/alter-status-form';

/**
 * Serviço responsável por realizar utilitários relacionados à alteração de título, data de entrega e status de um projeto.
 * Utiliza a biblioteca `SweetAlert2` para exibir alertas modais interativos.
 * Interage com o serviço `RequestDetailsService` para realizar as alterações de dados no servidor.
 */
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  /**
   * Construtor do serviço `UtilsService`.
   * 
   * @param requestService - Serviço que lida com requisições relacionadas aos detalhes do projeto.
   * @param storageService - Serviço utilizado para gerenciar dados no armazenamento local.
   */
  constructor(
    private requestService: RequestDetailsService,
    private storageService: StorageService
  ) { }

  /**
   * Exibe um modal para alterar o título de um projeto.
   * Quando confirmado, envia a alteração para o servidor e exibe um alerta de sucesso ou erro.
   * 
   * @param idProject - Identificador do projeto cujo título será alterado.
   */
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

  /**
  * Exibe um modal para alterar a data de entrega de um projeto.
  * Quando confirmada, envia a alteração para o servidor e exibe um alerta de sucesso ou erro.
  * 
  * @param idProject - Identificador do projeto cuja data de entrega será alterada.
  */
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

  /**
   * Exibe um modal para alterar o status de um projeto.
   * Quando confirmado, envia a alteração para o servidor e exibe um alerta de sucesso ou erro.
   * Se o status atual for igual ao novo status selecionado, exibe um alerta informando que nada foi alterado.
   * 
   * @param idProject - Identificador do projeto cujo status será alterado.
   * @param currentStatus - Status atual do projeto, utilizado para verificar se houve alteração.
   */
  alterStatus(idProject: string, currentStatus: string) {
    Swal.fire({
      html: '<h4>Alterar Status do Projeto </h4>',
      input: 'select',
      inputOptions: {
        [C_PROJECT_STATUS.TO_DO.en]: C_PROJECT_STATUS.TO_DO.pt,
        [C_PROJECT_STATUS.IN_PROGRESS.en]: C_PROJECT_STATUS.IN_PROGRESS.pt,
        [C_PROJECT_STATUS.WAITING_APPROVAL.en]: C_PROJECT_STATUS.WAITING_APPROVAL.pt,
        [C_PROJECT_STATUS.APPROVED.en]: C_PROJECT_STATUS.APPROVED.pt,
        [C_PROJECT_STATUS.IN_PRODUCTION.en]: C_PROJECT_STATUS.IN_PRODUCTION.pt,
        [C_PROJECT_STATUS.COMPLETED.en]: C_PROJECT_STATUS.COMPLETED.pt,
        [C_PROJECT_STATUS.STAND_BY.en]: C_PROJECT_STATUS.STAND_BY.pt,
      },
      showCancelButton: true,
      confirmButtonText: 'Alterar',
      confirmButtonColor: '#029982',
    }).then((result) => {
      if (result.isConfirmed) {
        if (currentStatus === result.value) {
          Swal.fire('Status já está ativo!', 'Nada foi alterado.', 'info');
          return;
        }
        const newStatus: I_Alter_Status_Request = {
          newStatus: result.value,
        };
        this.requestService.updateStatus(idProject, newStatus).subscribe({
          next: (value) =>
            Swal.fire('Status Alterado!', value.message, 'success').then(() =>
              window.location.reload()
            ),
          error: (err: HttpErrorResponse) =>
            Swal.fire('Status Não Alterado!', err.message, 'error'),
        });
      }
    });
  }
}
