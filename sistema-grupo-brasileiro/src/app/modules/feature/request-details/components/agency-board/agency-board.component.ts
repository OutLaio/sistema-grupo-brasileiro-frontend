import { Component, Input, OnInit } from '@angular/core';
import { I_Agency_Board_Response } from '../../../../shared/interfaces/briefing/agency-board/view/agency-board-detailed-view';
import { I_Any_Briefing } from '../../../../shared/interfaces/briefing/any-briefing';
import { I_Other_Route_Data } from '../../../../shared/interfaces/briefing/agency-board/view/other-route-view';
import { StorageService } from '../../../../services/storage/storage.service';
import { UtilsService } from '../../services/utils/utils.service';

@Component({
  selector: 'app-agency-board',
  templateUrl: './agency-board.component.html',
  styleUrl: './agency-board.component.css',
})
export class AgencyBoardComponent implements OnInit {
  @Input() briefing!: I_Any_Briefing;
  data!: I_Agency_Board_Response;
  otherCompanies!: string[];

  constructor(
    private storageService: StorageService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.data = this.briefing.type as I_Agency_Board_Response;
    this.otherCompanies = this.data.briefing.otherCompanies?.split(', ') || [];
  }

  getCities(route: I_Other_Route_Data) {
    return route.city.split(', ');
  }

  isClient() {
    return this.storageService.isClient();
  }

  alterTitle() {
    return this.utilsService.alterTitle(this.data.project.id);
  }

  alterDate() {
    return this.utilsService.alterDate(this.data.project.id);
  }
}
