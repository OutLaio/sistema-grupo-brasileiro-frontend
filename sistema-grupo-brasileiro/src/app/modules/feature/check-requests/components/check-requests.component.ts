import { Component } from '@angular/core';


@Component({
  selector: 'app-check-requests',
  templateUrl: './check-requests.component.html',
  styleUrl: './check-requests.component.css'
})
export class CheckRequestsComponent {

  userRole: number = 2;

  emAnaliseCards = [
    {
      title: 'Análise de Requisitos',
      description: 'Realizando a análise detalhada dos requisitos do projeto, incluindo funcionalidades, restrições e expectativas das partes interessadas. Esta fase é crucial para garantir que todas as necessidades sejam compreendidas e documentadas.',
      progress: 40
    }
  ];
  
  emAbertoCards = [
    {
      title: 'Revisão de Documentos',
      description: 'Os documentos relacionados ao projeto estão aguardando uma revisão minuciosa para garantir que todas as informações estejam corretas e completas antes de prosseguir.',
      progress: 20
    }
  ];
  
  aprovadoCards = [
    {
      title: 'Implementação Iniciada',
      description: 'O desenvolvimento do projeto foi iniciado com a implementação das funcionalidades principais e a criação dos componentes básicos necessários para o progresso.',
      progress: 80
    }
  ];
  
  concluidoCards = [
    {
      title: 'Entrega Finalizada',
      description: 'O projeto foi entregue com sucesso ao cliente, incluindo todos os componentes e funcionalidades acordados. A fase de entrega foi completada e o projeto está formalmente concluído.',
      progress: 100
    }
  ];
  

}
