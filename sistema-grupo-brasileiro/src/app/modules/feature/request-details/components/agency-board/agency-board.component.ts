import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RequestDetailsService } from '../../services/request-details.service';
import { I_Agency_Board_Response } from '../../../../shared/interfaces/briefing/agency-board/view/agency-board-detailed-view';

@Component({
  selector: 'app-agency-board',
  templateUrl: './agency-board.component.html',
  styleUrl: './agency-board.component.css',
})
export class AgencyBoardComponent {
  data!: I_Agency_Board_Response;

  constructor(
    private service: RequestDetailsService
  ) {
    service.getRequestDetailsById('15').subscribe(
      (res) => {
        if(res.briefingView.briefingType.id != '1') {
          console.log("This is not a Agency Board");
        }else {
          this.data = res as I_Agency_Board_Response;
          console.log(this.data);
        }
      }
    )
  }
}
