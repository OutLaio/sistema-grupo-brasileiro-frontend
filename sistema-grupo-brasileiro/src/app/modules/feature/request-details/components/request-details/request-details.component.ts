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

}
