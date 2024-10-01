import { Component } from '@angular/core';
import { CardsAttributes } from '../interfaces/cards-attributes';
import { ProjectStatus } from '../enums/project-status';

@Component({
  selector: 'app-check-requests',
  templateUrl: './check-requests.component.html',
  styleUrl: './check-requests.component.css'
})

export class CheckRequestsComponent {

  userRole: number = 2;


  toDoCards = [{
    title: 'Revisão de Documentos',
    description: 'Os documentos relacionados ao projeto estão aguardando uma revisão minuciosa para garantir que todas as informações estejam corretas e completas antes de prosseguir.',
    progress: 20
  }
  ];

  inProgressCards = [
    {
      title: 'Revisão de Documentos',
      description: 'Os documentos relacionados ao projeto estão aguardando uma revisão minuciosa para garantir que todas as informações estejam corretas e completas antes de prosseguir.',
      progress: 20
    }
  ];

  awaitingApprovalCards = [
    {
      title: 'Implementação Iniciada',
      description: 'O desenvolvimento do projeto foi iniciado com a implementação das funcionalidades principais e a criação dos componentes básicos necessários para o progresso.',
      progress: 80
    }
  ];

  approvedCards = [
    {
      title: 'Entrega Finalizada',
      description: 'O projeto foi entregue com sucesso ao cliente, incluindo todos os componentes e funcionalidades acordados. A fase de entrega foi completada e o projeto está formalmente concluído.',
      progress: 100
    }
  ];

  inProductionCards = [
    {
      title: 'Design em Criação',
      description: 'A equipe de design está atualmente trabalhando na criação de layouts e protótipos para o projeto. Esta etapa envolve brainstorming e testes de diferentes abordagens visuais e de usabilidade.',
      progress: 60
    }
  ];

  completedCards = [
    {
      title: 'Testes Concluídos',
      description: 'Todos os testes de funcionalidade, integração e aceitação foram realizados com sucesso, garantindo que o sistema esteja funcionando conforme o esperado e sem falhas.',
      progress: 100
    }
  ];

  standByCards = [
    {
      title: 'Aguardando Aprovação do Cliente',
      description: 'O projeto está atualmente aguardando o feedback final do cliente para prosseguir. Nenhuma ação adicional será tomada até que o cliente forneça sua aprovação ou solicite ajustes.',
      progress: 50
    }
  ];

}
