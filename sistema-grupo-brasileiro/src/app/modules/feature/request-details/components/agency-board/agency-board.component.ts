import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IRoutes } from './../../interfaces/agency-board/routes';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IAgencyBoard } from '../../interfaces/agency-board/agency-board';
import { TBriefing } from '../../interfaces/briefing.type';
import { ISignpost } from '../../interfaces/signpost/signpost';
import { IBriefingType } from '../../interfaces/base-briefing/briefing-type';
import { IProject } from '../../interfaces/base-briefing/project';
import { IEmployee } from '../../interfaces/base-briefing/employee';
import { IAgencyBoardType } from '../../interfaces/agency-board/agency-board-type';
import { ICompanyBriefing } from '../../interfaces/base-briefing/company-briefing';
import { IMeasurement } from '../../interfaces/base-briefing/measurement';
import { ICity } from '../../interfaces/agency-board/city';

@Component({
  selector: 'app-agency-board',
  templateUrl: './agency-board.component.html',
  styleUrl: './agency-board.component.css',
})
export class AgencyBoardComponent {
  data!: IAgencyBoard;

  constructor() {
    this.data = {
      boardLocation: 'Petrolina Areia Branca - Agência 01',
      briefingType: {
        id: '1',
        description: 'Placa de Intinerários',
      } as IBriefingType,
      detailedDescription:
        '- Enviar foto do local (agência) com visão ampla;' +
        '\n- Enviar sinalização na imagem de onde deve ser instalada a placa;',
      expectedTime: '10/11/2024',
      observation:
        '- Painel com Adesivo para TV ou quadro decorativo (enviar fotos e medidas também);\n' +
        '- Adesivo jateado ou perfurado para Vidro ou alguma outra área (enviar fotos e medidas também);',
      project: {
        id: '1',
        collaborator: {
          id: '1',
          name: 'Carlos',
          lastname: 'Dias',
          email: 'carlos.dias@example.com',
        } as IEmployee,
        client: {
          id: '1',
          name: 'Dan',
          lastname: 'Souza',
          email: 'dan.souza@example.com',
        } as IEmployee,
        title: 'Placa de Intinerários - Luminoso Completo\n'+
        'Petrolina Areia Branca - Agência 01',
        status: 'Em Desenvolvimento',
      } as IProject,
      startTime: '16/10/2024',
      type: {
        id: '1',
        description: 'Luminoso Completo',
      } as IAgencyBoardType,
      companies: [
        {
          idCompany: '1',
          name: 'Rota',
        } as ICompanyBriefing,
        {
          idCompany: '2',
          name: 'Cidade Sol',
        } as ICompanyBriefing,
      ],
      otherCompany: ['Águia Branca', 'Gontijo'],
      measurements: {
        height: 34,
        length: 120,
      } as IMeasurement,
      routes: [
        {
          company: {
            idCompany: '1',
            name: 'Rota',
          } as ICompanyBriefing,
          cities: [
            {
              id: '1',
              name: 'Ilhéus',
            } as ICity,
            {
              id: '2',
              name: 'Salvador',
            } as ICity,
          ],
          type: 'main',
        } as IRoutes,
        {
          company: {
            idCompany: '1',
            name: 'Rota',
          } as ICompanyBriefing,
          cities: [
            {
              id: '3',
              name: 'Itabuna',
            } as ICity,
            {
              id: '4',
              name: 'Salobrinho',
            } as ICity,
          ],
          type: 'connection',
        } as IRoutes,
        {
          company: {
            idCompany: '2',
            name: 'Cidade Sol',
          } as ICompanyBriefing,
          cities: [
            {
              id: '1',
              name: 'Ilhéus',
            } as ICity,
            {
              id: '5',
              name: 'Nanuque',
            } as ICity,
          ],
          type: 'main',
        } as IRoutes,
        {
          company: {
            idCompany: '2',
            name: 'Cidade Sol',
          } as ICompanyBriefing,
          cities: [
            {
              id: '3',
              name: 'Itabuna',
            } as ICity,
            {
              id: '6',
              name: 'Camacan',
            } as ICity,
          ],
          type: 'connection',
        } as IRoutes,
      ],
      otherRoutes: [
        {
          company: 'Águia Branca',
          cities: ['Itabuna', 'Salvador'],
          type: 'main',
        },
        {
          company: 'Águia Branca',
          cities: ['Gandu', 'Cruz das Almas'],
          type: 'connection',
        },
        {
          company: 'Gontijo',
          cities: ['Salvador', 'São Paulo'],
          type: 'main',
        },
        {
          company: 'Gontijo',
          cities: ['Itabuna', 'Vitória'],
          type: 'connection',
        },
      ],
    } as IAgencyBoard;
  }
}
