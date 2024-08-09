import { Component, OnInit } from '@angular/core';
import { CollaboratorService } from '../../services/collaborator.service'; 
@Component({
  selector: 'app-list-collaborators',
  templateUrl: './list-collaborators.component.html',
  styleUrls: ['./list-collaborators.component.css']
})
export class ListCollaboratorsComponent implements OnInit {
  colaboradores: any[] = [];
  p: number = 1;
  itemsPerPage: number = 5;
  selectedColaborador: any = null;

  constructor(private collaboratorService: CollaboratorService) {}

  ngOnInit() {
    this.loadCollaborators();
  }

  loadCollaborators() {
    this.collaboratorService.getCollaborators(this.p - 1, this.itemsPerPage)
      .subscribe(data => {
        this.colaboradores = data;
      });
  }

  selectColaborador(colaborador: any) {
    this.selectedColaborador = this.selectedColaborador === colaborador ? null : colaborador;
  }

  isSelected(colaborador: any): boolean {
    return this.selectedColaborador === colaborador;
  }

  onPageChange(page: number) {
    this.p = page;
    this.loadCollaborators();
  }
}
