import { Component, OnInit } from '@angular/core';
import { I_Signpost_Response } from '../../../../shared/interfaces/briefing/signpost/view/signpost-detailed-view';
import { ProjectStatus } from '../../../check-requests/enums/project-status';
import { RequestDetailsService } from '../../services/request-details.service';
import { I_Dialog_Box_Response } from '../../../../shared/interfaces/dialog-box/view/dialog-box-view';
import { I_Dialog_Box_Request } from '../../../../shared/interfaces/dialog-box/form/dialog-box-form';

@Component({
  selector: 'app-signpost',
  templateUrl: './signpost.component.html',
  styleUrl: './signpost.component.css'
})
export class SignpostComponent implements OnInit {
  data!: I_Signpost_Response;
  otherCompanies!: string[];

  constructor(private service: RequestDetailsService) {


    // this.data = {
    //   briefing: {
    //     id: "1",
    //     briefingType: {
    //       id: "1",
    //       description: 'Placa de Sinalização'
    //     },
    //     startTime: new Date("10/25/2024"),
    //     expectedTime: new Date("12/25/2024"),
    //     finishTime: null,
    //     detailedDescription: "O briefing sobre a placa de sinalização foi criado com sucesso.",
    //     measurements: {
    //       height: 135,
    //       length: 35
    //     },
    //     companies: {
    //       companies: [{
    //         id: "1",
    //         name: "Empresa A"
    //       },{
    //         id: "2",
    //         name: "Empresa B"
    //       },{
    //         id: "3",
    //         name: "Empresa C"
    //       }]
    //     },
    //     otherCompanies: "Empresa D, Empresa E, Empresa F",
    //     versions: [{
    //       id: "1",
    //       productLink: "https://example.com/placa-sinalizacao-1.pdf",
    //       versionNumber: 1
    //     }]
    //   },
    //   project: {
    //     id: "1",
    //     title: "Projeto de Sinalização para a cidade de Londres",
    //     status: ProjectStatus.IN_PROGRESS,
    //     client: {
    //       id: "1",
    //       fullName: "João Silva",
    //       avatar: 1
    //     },
    //     collaborator: {
    //       id: "2",
    //       fullName: "Maria Lima",
    //       avatar: 2
    //     }
    //   },
    //   signpost: {
    //     id: "1",
    //     boardLocation: "Algum Lugar",
    //     material: {
    //       id: "1",
    //       description: "Material de placa de sinalização"
    //     },
    //     sector: "Algum Setor"
    //   }
    // }
  }


  ngOnInit(): void {
    this.service.getRequestDetailsById('16').subscribe((res) => {
      this.data = res as I_Signpost_Response;
      if (this.data.briefing.otherCompanies)
        this.otherCompanies = this.data.briefing.otherCompanies.split(", ");
    });
  }
}
