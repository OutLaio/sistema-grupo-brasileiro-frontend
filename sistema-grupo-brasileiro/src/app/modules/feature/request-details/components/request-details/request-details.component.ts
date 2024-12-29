import { E_Briefing_Type } from './../../../../shared/enums/briefing-types';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestDetailsService } from '../../services/request-details/request-details.service';
import { I_Any_Briefing } from '../../../../shared/interfaces/briefing/any-briefing';

/**
 * Componente responsável por exibir os detalhes de uma solicitação de projeto.
 * O componente carrega os dados do briefing e exibe informações sobre o tipo de briefing.
 */
@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrl: './request-details.component.css',
})
export class RequestDetailsComponent {
  /**
   * Dados do briefing associados ao projeto.
   * @type {any}
   */
  data = {} as any;
  /**
   * Tipo de briefing que será exibido.
   * @type {string}
   */
  briefingType: string = '';
  /**
   * Enum de tipos de briefing.
   * @type {E_Briefing_Type}
   */
  E_Briefing_Type = E_Briefing_Type;

  /**
  * Construtor do componente.
  * @param {RequestDetailsService} service Serviço para obter detalhes da solicitação.
  */
  constructor(private service: RequestDetailsService) { }

  /**
   * Ciclo de vida do componente angular chamado ao inicializar o componente.
   * Carrega os detalhes do briefing do projeto com base no id passado na navegação.
   * Exibe o tipo de briefing associado ao projeto.
   */
  ngOnInit(): void {
    const idProject = history.state.id;
    this.service.getRequestDetailsById(idProject).subscribe((res) => {
      this.data.type = res.data!;
      this.briefingType = this.data.type.briefing.briefingType.description;
    });
  }
}
