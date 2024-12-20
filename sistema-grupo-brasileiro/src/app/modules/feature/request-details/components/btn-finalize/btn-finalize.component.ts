import { Component, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { StorageService } from '../../../../services/storage/storage.service';
import { RequestDetailsService } from '../../services/request-details/request-details.service';
import { I_Project_Data } from '../../../../shared/interfaces/project/view/project-view';
import { HttpErrorResponse } from '@angular/common/http';
import { C_PROJECT_STATUS } from '../../../../shared/enums/project-status';

/**
 * Componente responsável por exibir botões para finalizar ou confirmar a confecção de um projeto.
 * 
 * Quando o botão de finalização é clicado, ele solicita a confirmação do usuário e, dependendo da escolha, atualiza o status do projeto.
 * O componente permite que apenas supervisores aprovem ou atualizem o status do projeto para "em produção" ou "finalizado".
 */
@Component({
  selector: 'app-btn-finalize',
  templateUrl: './btn-finalize.component.html',
  styleUrl: './btn-finalize.component.css'
})
export class BtnFinalizeComponent {
  /**
   * O projeto ao qual o botão de finalização está associado
   * @type {I_Project_Data | null}
   */
  @Input() project: I_Project_Data | null = null;

  /**
   * @constructor
   * Cria uma instância da classe que utiliza o StorageService e o RequestDetailsService.
   * 
   * @param {StorageService} storageService - Serviço responsável pela manipulação de dados de armazenamento.
   * @param {RequestDetailsService} requestService - Serviço responsável pela obtenção e manipulação de detalhes de requisição.
 */
  constructor(
    private storageService: StorageService,
    private requestService: RequestDetailsService
  ) { }

  /**
   * Confirma a necessidade de confecção do projeto.
   * Se a opção for "Sim", o status do projeto será atualizado para "em confecção".
   * Caso contrário, o projeto será finalizado.
   * Exibe um pop-up de confirmação com a opção de selecionar "Sim" ou "Não".
   */
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

  /**
    * Confirma a finalização do projeto.
    * Exibe um pop-up de confirmação com a opção de selecionar "Sim" ou "Não".
    * Se confirmado, o status do projeto será atualizado para "Finalizado".
    */
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

  /**
   * Verifica se o projeto foi aprovado e se o usuário é um supervisor.
   * @returns {boolean} - `true` se o projeto for aprovado e o usuário for supervisor, caso contrário `false`
   */
  isApproved() {
    return this.project?.status === C_PROJECT_STATUS.APPROVED.en && this.storageService.isSupervisor();
  }

  /**
   * Verifica se o projeto está em produção e se o usuário é um supervisor.
   * @returns {boolean} - `true` se o projeto estiver em produção e o usuário for supervisor, caso contrário `false`
   */
  isConfection() {
    return this.project?.status === C_PROJECT_STATUS.IN_PRODUCTION.en && this.storageService.isSupervisor();
  }
}
