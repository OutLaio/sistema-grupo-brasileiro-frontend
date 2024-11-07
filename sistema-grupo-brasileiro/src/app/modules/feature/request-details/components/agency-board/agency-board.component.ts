import { Component, Input, OnInit } from '@angular/core';
import { RequestDetailsService } from '../../services/request-details.service';
import { I_Agency_Board_Response } from '../../../../shared/interfaces/briefing/agency-board/view/agency-board-detailed-view';
import { I_Any_Briefing } from '../../../../shared/interfaces/briefing/any-briefing';
import { I_Other_Route_Data } from '../../../../shared/interfaces/briefing/agency-board/view/other-route-view';

@Component({
  selector: 'app-agency-board',
  templateUrl: './agency-board.component.html',
  styleUrl: './agency-board.component.css',
})
export class AgencyBoardComponent implements OnInit {
  @Input() briefing!: I_Any_Briefing;
  data!: I_Agency_Board_Response;
  otherCompanies!: string[];

  constructor(private service: RequestDetailsService) {}

  ngOnInit() {
    this.data = this.briefing.type as I_Agency_Board_Response;
    this.otherCompanies = this.data.briefing.otherCompanies?.split(', ') || [];
    console.log(this.data)
  }

  getCities(route: I_Other_Route_Data) {
    return route.city.split(', ');
  }

}
