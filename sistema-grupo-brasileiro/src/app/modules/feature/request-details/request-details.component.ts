import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-request-details',
    templateUrl: './request-details.component.html',
    styleUrl: './request-details.component.css'
})
export class RequestDetailsComponent {
    userRole: number = 0;
    subtitle: string = 'Em Andamento';
    percentage: number = 100;
    signLocation = 'Petrolina Areia Branca - Agência 01';

    dimensions = [
        { height: '0,90', length: '3,24' },
        { height: '1,00', length: '0,34' }
    ];

    signType: string = '';
    material: string = 'Letreiro (lona adesivada)';

    sharedWithCompany = true;
    sharedCompanies = 'Rota Transportes, Cidade Sol';
    rotaTransportesMainRoutes = 'Salvador, Feira de Santana, Capim Grosso, Juazeiro';
    rotaTransportesConnections = 'Jacobina, Itabuna, Porto Seguro, Ilhéus, Eunápolis';
    cidadeSolMainRoutes = 'Irecê, Xique Xique, Barra';
    cidadeSolConnections = 'Maracas, Jequié, Vt. Conquistas, Eunápolis';

    collaboratorName = '';

    signImages: { name: string, path: string, description: string }[] = [
        { name: 'Imagem 1', path: '/assets/images/grupo-brasileiro-logo.png', description: 'Descrição da Imagem 1' },
        { name: 'Imagem 2', path: '/assets/images/rota-logo.png', description: 'Descrição da Imagem 2' },
        { name: 'Imagem 3', path: '/assets/images/grupo-brasileiro-logo.png', description: 'Descrição da Imagem 3' },
    ];

    constructor() { }

    selectCollaborator() {
        this.collaboratorName = 'Nome do Colaborador Selecionado';
    }


}



// import { Component, OnInit } from '@angular/core';
// import { RequestDetailsService } from '../../services/request-details/request-details.service';

// @Component({
//   selector: 'app-request-details',
//   templateUrl: './request-details.component.html',
//   styleUrls: ['./request-details.component.css']
// })
// export class RequestDetailsComponent implements OnInit {
//   userRole: number = 0;
//   percentage: number = 0;
//   signLocation: string = '';
//   dimensions: string[] = [];
//   signType: string[] = [];
//   materials: string[] = [];
//   sharedWithCompany: boolean = false;
//   sharedCompanies: string = '';
//   rotaTransportesMainRoutes: string = '';
//   rotaTransportesConnections: string = '';
//   cidadeSolMainRoutes: string = '';
//   cidadeSolConnections: string = '';
//   collaboratorName: string = '';
//   signImages: { name: string, path: string, description: string }[] = [];

//   constructor(private requestDetailsService: RequestDetailsService) { }

//   ngOnInit(): void {
//     this.getRequestDetails('1');
//   }

//   getRequestDetails(id: string): void {
//     this.requestDetailsService.getRequestDetailsById(id).subscribe(
//       (data:any) => {
//         this.userRole = data.userRole;
//         this.percentage = data.percentage;
//         this.signLocation = data.signLocation;
//         this.dimensions = data.dimensions;
//         this.signType = data.signType;
//         this.materials = data.materials;
//         this.sharedWithCompany = data.sharedWithCompany;
//         this.sharedCompanies = data.sharedCompanies;
//         this.rotaTransportesMainRoutes = data.rotaTransportesMainRoutes;
//         this.rotaTransportesConnections = data.rotaTransportesConnections;
//         this.cidadeSolMainRoutes = data.cidadeSolMainRoutes;
//         this.cidadeSolConnections = data.cidadeSolConnections;
//         this.collaboratorName = data.collaboratorName;
//         this.signImages = data.signImages;
//       },
//         (error: any) => {
//         console.error('Erro ao obter os detalhes da solicitação', error);
//       }
//     );
//   }

//   selectCollaborator() {
//     this.collaboratorName = 'Nome do Colaborador Selecionado';
//   }
// }
