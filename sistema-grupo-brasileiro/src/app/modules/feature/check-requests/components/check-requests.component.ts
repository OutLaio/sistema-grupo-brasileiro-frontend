import { Component, OnInit } from '@angular/core';
import { CheckRequestsService } from '../services/check-requests.service';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage/storage.service';
import { I_Project_Data } from '../../../shared/interfaces/project/view/project-view';
import { C_PROJECT_STATUS } from '../../../shared/enums/project-status';

/**
 * Componente responsável por exibir e gerenciar os projetos em diferentes status.
 * Este componente divide os projetos em várias categorias com base no status e permite que o usuário visualize os detalhes de cada projeto.
 */
@Component({
  selector: 'app-check-requests',
  templateUrl: './check-requests.component.html',
  styleUrls: ['./check-requests.component.css']
})
export class CheckRequestsComponent implements OnInit {
  /**
   * Nível do usuário atual, que pode ser CLIENTE, COLABORADOR ou SUPERVISOR.
   */
  userRole: number | undefined;
  /**
   * Controla a exibição truncada do título dos projetos.
   */
  isTruncated: boolean = true;

  /**
   * Contém todos os projetos recebidos do servidor.
   */
  allProjects: I_Project_Data[] = [];

  /**
   * Contém projetos filtrados por cada status.
   */
  toDoCards: I_Project_Data[] = [];
  inProgressCards: I_Project_Data[] = [];
  awaitingApprovalCards: I_Project_Data[] = [];
  approvedCards: I_Project_Data[] = [];
  inProductionCards: I_Project_Data[] = [];
  completedCards: I_Project_Data[] = [];
  standByCards: I_Project_Data[] = [];

  /**
   * Mensagem de erro caso a requisição de projetos falhe.
   */
  errorMessage: string = '';

  /**
   * Construtor que injeta os serviços necessários para este componente.
   * 
   * @param checkRequestServices Serviço responsável por obter os projetos.
   * @param storageService Serviço responsável por acessar os dados de armazenamento.
   * @param router Serviço de roteamento para navegação.
   */
  constructor(
    private checkRequestServices: CheckRequestsService,
    private storageService: StorageService,
    private router: Router,
  ) { }

  /**
   * Mapeamento de funções de usuários para seus respectivos IDs.
   */
  private roleMapping: { [key: string]: number } = {
    'ROLE_CLIENT': 3,
    'ROLE_COLLABORATOR': 2,
    'ROLE_SUPERVISOR': 1
  };

  /**
   * Método de inicialização do componente. 
   * Obtém o papel do usuário e carrega os projetos ao inicializar.
   */
  ngOnInit(): void {
    const role = this.storageService.getUserRole() ?? "";
    this.userRole = this.roleMapping[role];
    this.getProjects();
  }

  /**
   * Método que solicita os projetos ao serviço `CheckRequestsService` e os organiza por status.
   */
  getProjects(): void {
    this.checkRequestServices.getProjects().subscribe({
      next: (response) => {
        this.allProjects = response.data!;
        this.projectsMapper(this.allProjects);
      },
      error: (error) => {
        console.error("Erro ao carregar projetos:", error);
        this.errorMessage = 'Erro ao carregar colaboradores.';
      }
    });
  }

  /**
   * Método que organiza os projetos por status em diferentes categorias.
   * 
   * @param allProjects Lista de projetos para serem mapeados.
   */
  private projectsMapper(allProjects: I_Project_Data[]): void {
    this.toDoCards = allProjects.filter(project => project.status === C_PROJECT_STATUS.TO_DO.en).map(project => ({ ...project, isTruncated: true }));
    this.toDoCards.sort((a, b) => { return Number(b.id) - Number(a.id) });
    this.inProgressCards = allProjects.filter(project => project.status === C_PROJECT_STATUS.IN_PROGRESS.en).map(project => ({ ...project, isTruncated: true }));
    this.inProgressCards.sort((a, b) => { return Number(b.id) - Number(a.id) });
    this.awaitingApprovalCards = allProjects.filter(project => project.status === C_PROJECT_STATUS.WAITING_APPROVAL.en).map(project => ({ ...project, isTruncated: true }));
    this.awaitingApprovalCards.sort((a, b) => { return Number(b.id) - Number(a.id) });
    this.approvedCards = allProjects.filter(project => project.status === C_PROJECT_STATUS.APPROVED.en).map(project => ({ ...project, isTruncated: true }));
    this.approvedCards.sort((a, b) => { return Number(b.id) - Number(a.id) });
    this.inProductionCards = allProjects.filter(project => project.status === C_PROJECT_STATUS.IN_PRODUCTION.en).map(project => ({ ...project, isTruncated: true }));
    this.inProductionCards.sort((a, b) => { return Number(b.id) - Number(a.id) });
    this.completedCards = allProjects.filter(project => project.status === C_PROJECT_STATUS.COMPLETED.en).map(project => ({ ...project, isTruncated: true }));
    this.completedCards.sort((a, b) => { return Number(b.id) - Number(a.id) });
    this.standByCards = allProjects.filter(project => project.status === C_PROJECT_STATUS.STAND_BY.en).map(project => ({ ...project, isTruncated: true }));
    this.standByCards.sort((a, b) => { return Number(b.id) - Number(a.id) });
  }

  /**
   * Alterna a exibição truncada do título de um projeto.
   * 
   * @param item O projeto cujo estado do título truncado deve ser alterado.
   */
  toggleTruncate(item: I_Project_Data): void {
    item.isTruncated = !item.isTruncated;
  }

  /**
   * Redireciona o usuário para a página de detalhes do projeto.
   * 
   * @param id O ID do projeto cujos detalhes devem ser exibidos.
   */
  goToDetails(id: string) {
    this.router.navigate(['/detalhes-solicitacao'], { state: { id: id } });
  }
}
