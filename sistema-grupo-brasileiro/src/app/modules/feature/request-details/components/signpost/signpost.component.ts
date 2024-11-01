import { Component, Input, OnInit } from '@angular/core';
import { I_Signpost_Response } from '../../../../shared/interfaces/briefing/signpost/view/signpost-detailed-view';
import { ProjectStatus } from '../../../check-requests/enums/project-status';
import { RequestDetailsService } from '../../services/request-details.service';
import { I_Dialog_Box_Response } from '../../../../shared/interfaces/dialog-box/view/dialog-box-view';
import { I_Dialog_Box_Request } from '../../../../shared/interfaces/dialog-box/form/dialog-box-form';
import { I_Any_Briefing } from '../../../../shared/interfaces/briefing/any-briefing';

@Component({
  selector: 'app-signpost',
  templateUrl: './signpost.component.html',
  styleUrl: './signpost.component.css'
})
export class SignpostComponent implements OnInit {
  @Input() briefing!: I_Any_Briefing;
  data!: I_Signpost_Response;
  otherCompanies!: string[];

  constructor() {}

  ngOnInit(): void {
    this.data = this.briefing.type as I_Signpost_Response;
    this.otherCompanies = this.data.briefing.otherCompanies?.split(', ') || [];
  }
}
