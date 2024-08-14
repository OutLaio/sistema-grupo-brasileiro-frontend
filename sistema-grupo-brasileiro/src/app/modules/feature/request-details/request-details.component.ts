import { Component } from '@angular/core';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrl: './request-details.component.css'
})
export class RequestDetailsComponent {
  percentage: number = 75;

  signLocation = 'Petrolina Areia Branca - Agência 01';
  dimensions = [
    '0,90 Alt. x 3,24 cumprimento',
    '1,00 Alt. x 0,34 cumprimento'
  ];
  signType = [];
  materials = [
    'Letreiro (lona adesivada)',
    'Impressão Digital (Lona Totalmente impressa)'
  ];

  sharedWithCompany = true;
  sharedCompanies = 'Rota Transportes, Cidade Sol';
  rotaTransportesMainRoutes = 'Salvador, Feira de Santana, Capim Grosso, Juazeiro';
  rotaTransportesConnections = 'Jacobina, Itabuna, Porto Seguro, Ilhéus, Eunápolis';
  cidadeSolMainRoutes = 'Irecê, Xique Xique, Barra';
  cidadeSolConnections = 'Maracas, Jequié, Vt. Conquistas, Eunápolis';

  collaboratorName = '';

  signImages: { name: string, path: string, description: string }[] = [
    { name: 'Imagem 1', path: 'caminho/para/a/imagem1.jpg', description: 'Descrição da Imagem 1' },
    { name: 'Imagem 2', path: 'caminho/para/a/imagem2.jpg', description: 'Descrição da Imagem 2' },
    { name: 'Imagem 3', path: 'caminho/para/a/imagem3.jpg', description: 'Descrição da Imagem 3' },
    { name: 'Imagem 4', path: 'caminho/para/a/imagem4.jpg', description: 'Descrição da Imagem 4' },
    { name: 'Imagem 5', path: 'caminho/para/a/imagem5.jpg', description: 'Descrição da Imagem 5' }
  ];

  selectCollaborator() {
    this.collaboratorName = 'Nome do Colaborador Selecionado'; 
  }

  constructor() { }

}
