import { Component, Input, OnInit } from '@angular/core';
import { RequestDetailsService } from '../../services/request-details.service';
import { I_Agency_Board_Response } from '../../../../shared/interfaces/briefing/agency-board/view/agency-board-detailed-view';
import { I_Any_Briefing } from '../../../../shared/interfaces/briefing/any-briefing';
import { I_Other_Route_Data } from '../../../../shared/interfaces/briefing/agency-board/view/other-route-view';
import { I_Employee_Form_Data } from '../../../../shared/interfaces/user/form/employee-form';
import { I_Employee_View_Data } from '../../../../shared/interfaces/user/view/employee-view';
import Swal from 'sweetalert2';

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
  }

  getCities(route: I_Other_Route_Data) {
    return route.city.split(', ');
  }

  isClient() {
    let employee: string | null | I_Employee_View_Data = sessionStorage.getItem('userProfile');
    if (employee !== null) {
      employee = JSON.parse(employee) as I_Employee_View_Data;
      return employee?.user.profile.description === 'ROLE_CLIENT';
    }
    return false;
  }

  alterTitle() {
    Swal.fire({
      html: '<h3>Alterar Título do Projeto</h3>',
      input: 'text',
      inputPlaceholder: 'Novo Título',
      showCancelButton: true,
      confirmButtonText: 'Alterar',
      confirmButtonColor: '#029982',
    });
  }

}
