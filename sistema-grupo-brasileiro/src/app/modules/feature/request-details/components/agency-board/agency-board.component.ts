import { Component, Input, OnInit } from '@angular/core';
import { I_Agency_Board_Response } from '../../../../shared/interfaces/briefing/agency-board/view/agency-board-detailed-view';
import { I_Any_Briefing } from '../../../../shared/interfaces/briefing/any-briefing';
import { I_Other_Route_Data } from '../../../../shared/interfaces/briefing/agency-board/view/other-route-view';
import { StorageService } from '../../../../services/storage/storage.service';
import { UtilsService } from '../../services/utils/utils.service';
import { C_PROJECT_STATUS } from '../../../../shared/enums/project-status';

/**
 * Componente `AgencyBoardComponent`
 * 
 * Exibe as informações detalhadas sobre um briefing de placa de agência, incluindo status do projeto,
 * outras empresas envolvidas, e permite alterar o título, data e status do projeto.
 * 
 * Este componente também verifica se o usuário tem permissões para editar as informações
 * com base no perfil (cliente ou colaborador) e no status do projeto.
 */
@Component({
  selector: 'app-agency-board',
  templateUrl: './agency-board.component.html',
  styleUrl: './agency-board.component.css',
})
export class AgencyBoardComponent implements OnInit {
  /**
   * O briefing que contém as informações detalhadas do projeto
   * @type {I_Any_Briefing}
   */
  @Input() briefing!: I_Any_Briefing;
  /**
   * Dados detalhados do briefing no formato de resposta
   * @type {I_Agency_Board_Response}
   */
  data!: I_Agency_Board_Response;
  /**
   * Lista de outras empresas envolvidas no briefing
   * @type {string[]}
   */
  otherCompanies!: string[];

  /**
   * @constructor
   * @param {StorageService} storageService - Serviço para acessar dados de sessão do usuário
   * @param {UtilsService} utilsService - Serviço utilitário para manipulações diversas
   */
  constructor(
    private storageService: StorageService,
    private utilsService: UtilsService
  ) { }

  /**
   * Ciclo de vida do componente angular chamado ao inicializar o componente.
   * 
   * Inicializa os dados do componente.
   * Converte os dados do briefing para o formato de resposta detalhada e 
   * cria um array de outras empresas envolvidas no briefing.
   */
  ngOnInit() {
    this.data = this.briefing.type as I_Agency_Board_Response;
    this.otherCompanies = this.data.briefing.otherCompanies!.length > 1 ? this.data.briefing.otherCompanies!.split(', ') : [];
  }

  /**
   * Retorna as cidades de uma rota dividida por vírgula.
   * @param {I_Other_Route_Data} route - Dados da rota contendo as cidades
   * @returns {string[]} - Um array com as cidades
   */
  getCities(route: I_Other_Route_Data) {
    return route.city.split(', ');
  }

  /**
   * Verifica se o usuário pode editar o projeto.
   * O projeto pode ser editado se o usuário não for um cliente e o status do projeto não for "COMPLETED".
   * @returns {boolean} - `true` se o projeto pode ser editado, `false` caso contrário
   */
  canEdit() {
    return !this.storageService.isClient() && this.data.project.status !== C_PROJECT_STATUS.COMPLETED.en
  }

  /**
   * Verifica se o usuário é um cliente.
   * @returns {boolean} - `true` se o usuário for cliente, `false` caso contrário
   */
  isClient() {
    return this.storageService.isClient();
  }

  /**
   * Altera o título do projeto utilizando o serviço utilitário.
   * @returns {string} - O novo título do projeto
   */
  alterTitle() {
    return this.utilsService.alterTitle(this.data.project.id);
  }

  /**
   * Altera a data do projeto utilizando o serviço utilitário.
   * @returns {string} - A nova data do projeto
   */
  alterDate() {
    return this.utilsService.alterDate(this.data.project.id);
  }

  /**
   * Altera o status do projeto utilizando o serviço utilitário.
   * @returns {string} - O novo status do projeto
   */
  alterStatus() {
    return this.utilsService.alterStatus(this.data.project.id, this.data.project.status);
  }

  /**
   * Retorna o status do projeto em português.
   * Verifica se o status está no formato de inglês ou português.
   * @returns {string | null} - O status do projeto em português
   */
  getStatus() {
    const status = this.data.project.status;
    for (const [key, value] of Object.entries(C_PROJECT_STATUS)) {
      if (value.en === status || value.pt === status) {
        return value.pt;
      }
    }
    return null;
  }

  /**
   * Verifica se o projeto está finalizado.
   * @returns {boolean} - `true` se o status do projeto for "COMPLETED", `false` caso contrário
   */
  isFinished() {
    return this.data.project.status === C_PROJECT_STATUS.COMPLETED.en;
  }
}
