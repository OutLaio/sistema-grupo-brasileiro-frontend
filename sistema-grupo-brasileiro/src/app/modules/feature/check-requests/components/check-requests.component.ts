import { Component, OnInit } from '@angular/core';
import { LoginRegisterService } from '../../../services/login-register/login-register.service';
import { CheckRequestsService } from '../services/check-requests.service';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage/storage.service';
import { I_Project_Data } from '../../../shared/interfaces/project/view/project-view';
import { C_PROJECT_STATUS } from '../../../shared/enums/project-status';

@Component({
  selector: 'app-check-requests',
  templateUrl: './check-requests.component.html',
  styleUrls: ['./check-requests.component.css']
})
export class CheckRequestsComponent implements OnInit {
  userRole: number | undefined;
  isTruncated: boolean = true;

  allProjects: I_Project_Data[] = [];
  toDoCards: I_Project_Data[] = [];
  inProgressCards: I_Project_Data[] = [];
  awaitingApprovalCards: I_Project_Data[] = [];
  approvedCards: I_Project_Data[] = [];
  inProductionCards: I_Project_Data[] = [];
  completedCards: I_Project_Data[] = [];
  standByCards: I_Project_Data[] = [];
  errorMessage: string = '';

  constructor(
    private checkRequestServices: CheckRequestsService,
    private storageService: StorageService,
    private router: Router,
  ) { }

  private roleMapping: { [key: string]: number } = {
    'ROLE_CLIENT': 3,
    'ROLE_COLLABORATOR': 2,
    'ROLE_SUPERVISOR': 1
  };

  ngOnInit(): void {
    const role = this.storageService.getUserRole() ?? "";
    this.userRole = this.roleMapping[role];
    this.getProjects();
  }

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


  private projectsMapper(allProjects: I_Project_Data[]): void {
    this.toDoCards = allProjects.filter(project => project.status === C_PROJECT_STATUS.TO_DO.en).map(project => ({ ...project, isTruncated: true }));
    this.toDoCards.sort((a, b) => {return Number(b.id) - Number(a.id)});
    this.inProgressCards = allProjects.filter(project => project.status === C_PROJECT_STATUS.IN_PROGRESS.en).map(project => ({ ...project, isTruncated: true }));
    this.inProgressCards.sort((a, b) => { return Number(b.id) - Number(a.id)});
    this.awaitingApprovalCards = allProjects.filter(project => project.status === C_PROJECT_STATUS.WAITING_APPROVAL.en).map(project => ({ ...project, isTruncated: true }));
    this.awaitingApprovalCards.sort((a, b) => { return Number(b.id) - Number(a.id)});
    this.approvedCards = allProjects.filter(project => project.status === C_PROJECT_STATUS.APPROVED.en).map(project => ({ ...project, isTruncated: true }));
    this.approvedCards.sort((a, b) => { return Number(b.id) - Number(a.id)});
    this.inProductionCards = allProjects.filter(project => project.status === C_PROJECT_STATUS.IN_PRODUCTION.en).map(project => ({ ...project, isTruncated: true }));
    this.inProductionCards.sort((a, b) => { return Number(b.id) - Number(a.id)});
    this.completedCards = allProjects.filter(project => project.status === C_PROJECT_STATUS.COMPLETED.en).map(project => ({ ...project, isTruncated: true }));
    this.completedCards.sort((a, b) => { return Number(b.id) - Number(a.id)});
    this.standByCards = allProjects.filter(project => project.status === C_PROJECT_STATUS.STAND_BY.en).map(project => ({ ...project, isTruncated: true }));
    this.standByCards.sort((a, b) => { return Number(b.id) - Number(a.id)});
  }

  toggleTruncate(item: I_Project_Data): void {
    item.isTruncated = !item.isTruncated;
  }

  deadline: Date = new Date;

  goToDetails(id: string) {
    this.router.navigate(['/detalhes-solicitacao'], { state: { id: id } });
  }
}
