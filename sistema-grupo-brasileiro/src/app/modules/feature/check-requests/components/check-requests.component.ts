import { Component, OnInit } from '@angular/core';
import { LoginRegisterService } from '../../../services/login-register/login-register.service';
import { CheckRequestsService } from '../services/check-requests.service';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage/storage.service';
import { I_Project_Data } from '../../../shared/interfaces/project/view/project-view';

@Component({
  selector: 'app-check-requests',
  templateUrl: './check-requests.component.html',
  styleUrls: ['./check-requests.component.css']
})
export class CheckRequestsComponent implements OnInit {
  userRole: number | undefined;

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
    this.toDoCards = allProjects.filter(project => project.status === 'TO_DO').map(project => ({ ...project, isTruncated: true }));
    this.inProgressCards = allProjects.filter(project => project.status === 'IN_PROGRESS').map(project => ({ ...project, isTruncated: true }));
    this.awaitingApprovalCards = allProjects.filter(project => project.status === 'WAITING_APPROVAL').map(project => ({ ...project, isTruncated: true }));
    this.approvedCards = allProjects.filter(project => project.status === 'APPROVED').map(project => ({ ...project, isTruncated: true }));
    this.inProductionCards = allProjects.filter(project => project.status === 'IN_PRODUCTION').map(project => ({ ...project, isTruncated: true }));
    this.completedCards = allProjects.filter(project => project.status === 'COMPLETED').map(project => ({ ...project, isTruncated: true }));
    this.standByCards = allProjects.filter(project => project.status === 'STAND_BY').map(project => ({ ...project, isTruncated: true }));
  }

  isTruncated: boolean = true;

  toggleTruncate(item: I_Project_Data): void {
    item.isTruncated = !item.isTruncated;
  }

  // showCollaboratorName = false;
  // showClientName = false;

  // toggleTooltip(type: string) {
  //   if (type === 'collaborator') {
  //     this.showCollaboratorName = !this.showCollaboratorName;
  //     this.showClientName = false;
  //   } else if (type === 'client') {
  //     this.showClientName = !this.showClientName;
  //     this.showCollaboratorName = false;
  //   }
  // }

  deadline: Date = new Date;

  goToDetails(id: string) {
    this.router.navigate(['/detalhes-solicitacao'], { state: { id: id } });
  }
}
