import { Component, OnInit } from '@angular/core';
import { LoginRegisterService } from '../../../services/login-register/login-register.service';
import { CardsAttributes } from '../interfaces/cards-attributes';
import { CheckRequestsService } from '../services/check-requests.service';
import { ProjectStatus } from '../enums/project-status';

@Component({
  selector: 'app-check-requests',
  templateUrl: './check-requests.component.html',
  styleUrls: ['./check-requests.component.css']
})
export class CheckRequestsComponent implements OnInit {
  userRole: number | undefined;

  allProjects: CardsAttributes[] = [];
  toDoCards: CardsAttributes[] = [];
  inProgressCards: CardsAttributes[] = [];
  awaitingApprovalCards: CardsAttributes[] = [];
  approvedCards: CardsAttributes[] = [];
  inProductionCards: CardsAttributes[] = [];
  completedCards: CardsAttributes[] = [];
  standByCards: CardsAttributes[] = [];
  errorMessage: string = '';

  constructor(
    private loginRegisterService: LoginRegisterService,
    private checkRequestServices: CheckRequestsService
  ) { }

  private roleMapping: { [key: string]: number } = {
    'ROLE_CLIENT': 3,
    'ROLE_COLLABORATOR': 2,
    'ROLE_SUPERVISOR': 1
  };

  ngOnInit(): void {
    const role = this.loginRegisterService.getUserRole() ?? "";
    this.userRole = this.roleMapping[role];
    this.getProjects();
  }

  getProjects(): void {
    console.log("Chamando API para buscar projetos...");
    this.checkRequestServices.getProjects().subscribe({
      next: (response) => {
        console.log("Resposta da API:", response);
        this.allProjects = response;
        this.projectsMapper(this.allProjects);
      },
      error: (error) => {
        console.error("Erro ao carregar projetos:", error);
        this.errorMessage = 'Erro ao carregar colaboradores.';
      }
    });
  }

  private projectsMapper(allProjects: CardsAttributes[]): void {
    this.toDoCards = allProjects.filter(project => project.status === 'TO_DO');
    this.inProgressCards = allProjects.filter(project => project.status === 'IN_PROGRESS');
    this.awaitingApprovalCards = allProjects.filter(project => project.status === 'WAITING_APPROVAL');
    this.approvedCards = allProjects.filter(project => project.status === 'APPROVED');
    this.inProductionCards = allProjects.filter(project => project.status === 'IN_PRODUCTION');
    this.completedCards = allProjects.filter(project => project.status === 'COMPLETED');
    this.standByCards = allProjects.filter(project => project.status === 'STAND_BY');
  }

  isTruncated: boolean = true;

  toggleTruncate() {
    this.isTruncated = !this.isTruncated;
  }

  showCollaboratorName = false;
  showClientName = false;

  toggleTooltip(type: string) {
    if (type === 'collaborator') {
      this.showCollaboratorName = !this.showCollaboratorName;
      this.showClientName = false;
    } else if (type === 'client') {
      this.showClientName = !this.showClientName;
      this.showCollaboratorName = false;
    }
  }

  deadline: Date = new Date;

}
