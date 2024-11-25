import { E_Briefing_Type } from './../../../../shared/enums/briefing-types';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestDetailsService } from '../../services/request-details/request-details.service';
import { I_Any_Briefing } from '../../../../shared/interfaces/briefing/any-briefing';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrl: './request-details.component.css',
})
export class RequestDetailsComponent {
  data = {} as any;
  briefingType: string = '';
  E_Briefing_Type = E_Briefing_Type;

  constructor(private service: RequestDetailsService) {}

  ngOnInit(): void {
    const idProject = history.state.id;
    this.service.getRequestDetailsById(idProject).subscribe((res) => {
      this.data.type = res.data!;
      this.briefingType = this.data.type.briefing.briefingType.description;
    });
  }
}
