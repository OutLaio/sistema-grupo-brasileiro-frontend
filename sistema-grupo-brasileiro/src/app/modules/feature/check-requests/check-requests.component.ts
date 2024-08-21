import { Component } from '@angular/core';

@Component({
  selector: 'app-check-requests',
  templateUrl: './check-requests.component.html',
  styleUrl: './check-requests.component.css'
})
export class CheckRequestsComponent {

  userRole: number = 1;

  emAnaliseCards = [
    {
      title: 'Análise de Requisitos',
      description: 'Realizando a análise detalhada dos requisitos do projeto, incluindo funcionalidades, restrições e expectativas das partes interessadas. Esta fase é crucial para garantir que todas as necessidades sejam compreendidas e documentadas.',
      progress: 40
    },
    {
      title: 'Validação de Dados',
      description: 'A validação dos dados fornecidos pelo cliente está em andamento, garantindo que todos os dados sejam precisos, completos e adequados para o desenvolvimento do projeto.',
      progress: 60
    },
    {
      title: 'Revisão Técnica',
      description: 'A equipe técnica está revisando o projeto para identificar possíveis problemas técnicos e garantir que a solução proposta esteja alinhada com as melhores práticas e padrões.',
      progress: 50
    },
    {
      title: 'Verificação de Escopo',
      description: 'Verificando o escopo do projeto para assegurar que todas as atividades e entregas sejam devidamente compreendidas e documentadas, evitando alterações inesperadas no futuro.',
      progress: 45
    },
    {
      title: 'Avaliação de Riscos',
      description: 'Identificando e avaliando os riscos associados ao projeto, incluindo potenciais problemas que podem impactar o prazo, custo ou qualidade do projeto.',
      progress: 55
    },
    {
      title: 'Planejamento de Recursos',
      description: 'Planejando os recursos necessários para o projeto, incluindo alocação de pessoal, equipamentos e materiais, para garantir que tudo esteja disponível quando necessário.',
      progress: 50
    },
    {
      title: 'Análise de Stakeholders',
      description: 'Identificando e analisando os stakeholders envolvidos no projeto, suas expectativas e o impacto do projeto em suas atividades. Esta análise é essencial para garantir a satisfação de todas as partes interessadas.',
      progress: 70
    },
    {
      title: 'Criação de Protótipos',
      description: 'Desenvolvendo protótipos iniciais para visualizar e testar conceitos antes da implementação completa. Os protótipos ajudam a identificar problemas precoces e validar o design.',
      progress: 65
    }
  ];
  
  emAbertoCards = [
    {
      title: 'Revisão de Documentos',
      description: 'Os documentos relacionados ao projeto estão aguardando uma revisão minuciosa para garantir que todas as informações estejam corretas e completas antes de prosseguir.',
      progress: 20
    },
    {
      title: 'Aprovação de Orçamento',
      description: 'O orçamento proposto para o projeto está aguardando a aprovação final das partes interessadas, incluindo revisão de custos e alocação de recursos.',
      progress: 35
    },
    {
      title: 'Planejamento Inicial',
      description: 'Desenvolvendo o planejamento inicial do projeto, que inclui definição de metas, cronograma e recursos necessários para garantir que o projeto comece de forma estruturada.',
      progress: 10
    },
    {
      title: 'Contratação de Fornecedores',
      description: 'Aguardando a conclusão dos contratos com fornecedores externos necessários para o projeto, incluindo negociação de termos e condições.',
      progress: 25
    },
    {
      title: 'Definição de Requisitos',
      description: 'Finalizando a definição dos requisitos técnicos e funcionais do projeto, assegurando que todas as partes envolvidas estejam alinhadas com o escopo e as expectativas.',
      progress: 30
    },
    {
      title: 'Preparação de Ambiente',
      description: 'Preparando o ambiente de desenvolvimento, que pode incluir a configuração de servidores, instalação de software e criação de infraestrutura necessária para o projeto.',
      progress: 40
    },
    {
      title: 'Alocação de Equipe',
      description: 'A equipe do projeto está sendo alocada e organizada, incluindo definição de funções e responsabilidades para garantir que todos estejam preparados para iniciar o trabalho.',
      progress: 20
    },
    {
      title: 'Definição de Cronograma',
      description: 'Elaborando o cronograma detalhado do projeto, com prazos e marcos importantes, para assegurar que todas as etapas sejam concluídas dentro do prazo previsto.',
      progress: 15
    }
  ];
  
  aprovadoCards = [
    {
      title: 'Implementação Iniciada',
      description: 'O desenvolvimento do projeto foi iniciado com a implementação das funcionalidades principais e a criação dos componentes básicos necessários para o progresso.',
      progress: 80
    },
    {
      title: 'Testes de Unidade',
      description: 'Realizando testes de unidade para verificar o funcionamento correto de cada componente individual do sistema, assegurando que cada parte funcione de acordo com os requisitos especificados.',
      progress: 60
    },
    {
      title: 'Feedback do Cliente',
      description: 'Coletando feedback detalhado do cliente sobre o progresso do projeto, para ajustar e melhorar conforme necessário, garantindo que o produto final atenda às expectativas do cliente.',
      progress: 90
    },
    {
      title: 'Desenvolvimento em Andamento',
      description: 'O desenvolvimento do projeto está avançando conforme o planejado, com a conclusão das tarefas e implementação de funcionalidades adicionais conforme o cronograma estabelecido.',
      progress: 75
    },
    {
      title: 'Integração de Sistemas',
      description: 'Integrando o sistema desenvolvido com outros sistemas ou módulos existentes para garantir que todas as partes do projeto funcionem em conjunto de forma eficaz.',
      progress: 70
    },
    {
      title: 'Revisão de Código',
      description: 'A revisão do código está em andamento, incluindo a verificação de padrões de codificação, correção de erros e melhoria da qualidade do código para garantir uma base sólida para o projeto.',
      progress: 65
    },
    {
      title: 'Testes de Integração',
      description: 'Realizando testes de integração para garantir que todas as partes do sistema funcionem juntas conforme o esperado e para identificar e resolver quaisquer problemas de integração.',
      progress: 80
    },
    {
      title: 'Atualização de Documentação',
      description: 'Atualizando a documentação do projeto para refletir as mudanças recentes, incluindo detalhes técnicos e informações do usuário, para garantir que a documentação esteja completa e precisa.',
      progress: 85
    }
  ];
  
  concluidoCards = [
    {
      title: 'Entrega Finalizada',
      description: 'O projeto foi entregue com sucesso ao cliente, incluindo todos os componentes e funcionalidades acordados. A fase de entrega foi completada e o projeto está formalmente concluído.',
      progress: 100
    },
    {
      title: 'Documentação Concluída',
      description: 'Toda a documentação técnica e de usuário foi finalizada e entregue. Isso inclui manuais, guias de usuário e documentação de suporte técnico para facilitar a utilização e manutenção do sistema.',
      progress: 100
    },
    {
      title: 'Treinamento Realizado',
      description: 'O treinamento da equipe ou do cliente foi completado, abrangendo todos os aspectos do sistema e suas funcionalidades para garantir um uso eficiente e eficaz.',
      progress: 100
    },
    {
      title: 'Revisão Final',
      description: 'Uma revisão final do projeto foi realizada para garantir que todos os requisitos tenham sido atendidos e que o sistema esteja funcionando conforme o esperado. Todas as questões foram resolvidas.',
      progress: 100
    },
    {
      title: 'Feedback de Encerramento',
      description: 'O feedback final do cliente foi coletado, revisado e incorporado, se necessário. Isso garante que todas as expectativas foram atendidas e que o cliente está satisfeito com o resultado final.',
      progress: 100
    },
    {
      title: 'Arquivamento de Projeto',
      description: 'O projeto foi arquivado, incluindo todos os arquivos, documentos e registros relacionados, para referência futura e para garantir que tudo esteja disponível para auditoria ou análise posterior.',
      progress: 100
    },
    {
      title: 'Acompanhamento Pós-Entrega',
      description: 'Realizando o acompanhamento pós-entrega para garantir que qualquer problema pós-lançamento seja identificado e resolvido, e que o cliente receba o suporte necessário.',
      progress: 100
    },
    {
      title: 'Certificação de Conclusão',
      description: 'Emitindo a certificação de conclusão do projeto, confirmando que todos os critérios foram atendidos e que o projeto foi concluído com sucesso de acordo com os requisitos estabelecidos.',
      progress: 100
    }
  ];
  

}
