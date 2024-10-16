import { Component } from '@angular/core';
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
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrl: './request-details.component.css',
})
export class RequestDetailsComponent {
  data!: IAgencyBoard;

  constructor() {
    this.data = {
      boardLocation: 'Board Location',
      briefingType: {
        id: '1',
        description: 'Placa de Intinerários',
      } as IBriefingType,
      detailedDescription: 'Detail description',
      expectedTime: '12/12/2015',
      observation: 'Observation',
      project: {
        id: '1',
        collaborator: {
          id: '1',
          name: 'Collaborator',
          lastname: 'Collaborator',
          email: 'email@example.com',
        } as IEmployee,
        client: {
          id: '1',
          name: 'Client',
          lastname: 'Client',
          email: 'client@example.com',
        } as IEmployee,
        title: 'Project Title',
        status: 'Status',
      } as IProject,
      startTime: '11/12/2015',
      type: {
        id: '1',
        description: 'Luminoso Completo',
      } as IAgencyBoardType,
      companies: [
        {
          idCompany: '1',
          name: 'Company 1',
        } as ICompanyBriefing,
        {
          idCompany: '2',
          name: 'Company 2',
        } as ICompanyBriefing,
      ],
      measurements: {
        height: 10,
        length: 20,
      } as IMeasurement,
      routes: [
        {
          company: {
            idCompany: '1',
            name: 'Company 1',
          } as ICompanyBriefing,
          cities: [
            {
              id: '1',
              name: 'City 1',
            } as ICity,
            {
              id: '2',
              name: 'City 2',
            } as ICity,
          ],
          type: 'main',
        } as IRoutes,
        {
          company: {
            idCompany: '1',
            name: 'Company 1',
          } as ICompanyBriefing,
          cities: [
            {
              id: '3',
              name: 'City 3',
            } as ICity,
            {
              id: '4',
              name: 'City 4',
            } as ICity,
          ],
          type: 'connection',
        } as IRoutes,
        {
          company: {
            idCompany: '2',
            name: 'Company 2',
          } as ICompanyBriefing,
          cities: [
            {
              id: '1',
              name: 'City 1',
            } as ICity,
            {
              id: '2',
              name: 'City 2',
            } as ICity,
          ],
          type: 'main',
        } as IRoutes,
        {
          company: {
            idCompany: '2',
            name: 'Company 2',
          } as ICompanyBriefing,
          cities: [
            {
              id: '3',
              name: 'City 3',
            } as ICity,
            {
              id: '4',
              name: 'City 4',
            } as ICity,
          ],
          type: 'connection',
        } as IRoutes,
      ],
    } as IAgencyBoard;
  }
}
