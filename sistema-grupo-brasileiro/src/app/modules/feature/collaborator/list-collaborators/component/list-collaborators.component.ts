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
  itemsPerPage: number = 8;

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
