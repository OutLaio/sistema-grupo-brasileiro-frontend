// import { Component, OnInit } from '@angular/core';
// import { CollaboratorSystemService } from '../../services/collaborator-system.service'; 
// @Component({
//   selector: 'app-list-collaborators',
//   templateUrl: './list-collaborators.component.html',
//   styleUrls: ['./list-collaborators.component.css']
// })
// export class ListCollaboratorsComponent implements OnInit {
//   colaboradores: any[] = [];
//   p: number = 1;
//   itemsPerPage: number = 5;
//   selectedColaborador: any = null;

//   constructor(private collaboratorService: CollaboratorSystemService) {}

//   ngOnInit() {
//     this.loadCollaborators();
//   }

//   loadCollaborators() {
//     this.collaboratorService.getCollaborators(this.p - 1, this.itemsPerPage)
//       .subscribe(data => {
//         this.colaboradores = data;
//       });
//   }

//   selectColaborador(colaborador: any) {
//     this.selectedColaborador = this.selectedColaborador === colaborador ? null : colaborador;
//   }

//   isSelected(colaborador: any): boolean {
//     return this.selectedColaborador === colaborador;
//   }

//   onPageChange(page: number) {
//     this.p = page;
//     this.loadCollaborators();
//   }
// }

import { Component } from '@angular/core';
import { faker } from '@faker-js/faker';
@Component({
  selector: 'app-list-collaborators',
  templateUrl: './list-collaborators.component.html',
  styleUrls: ['./list-collaborators.component.css']
})
export class ListCollaboratorsComponent {
  colaboradores: { nome: string; numero: string; email: string; funcao: string; setor: string; agencia: string; }[] = [];
  p: number = 1;
  itemsPerPage: number = 5;

  constructor() {
    this.generateCollaborators();
  }

  generateCollaborators() {
    this.colaboradores = Array.from({ length: 100 }).map(() => ({
      nome: faker.name.fullName(),
      numero: faker.phone.number(),
      email: faker.internet.email(),
      funcao: faker.name.jobTitle(),
      setor: faker.helpers.arrayElement(['TI', 'Financeiro', 'Marketing', 'Criação', 'Logística', 'Recursos Humanos', 'Administração']),
      agencia: faker.address.city()
    }));
  }

  selectedColaborador: any = null;

  selectColaborador(colaborador: any) {
    this.selectedColaborador = this.selectedColaborador === colaborador ? null : colaborador;
  }

  isSelected(colaborador: any): boolean {
    return this.selectedColaborador === colaborador;
  }
}
