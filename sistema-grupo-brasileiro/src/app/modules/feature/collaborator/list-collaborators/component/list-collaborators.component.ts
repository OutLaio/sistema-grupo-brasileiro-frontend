import { Component, OnInit } from '@angular/core';
import { ListCollaboratorsService } from '../services/list-collaborators.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list-collaborators',
  templateUrl: './list-collaborators.component.html',
  styleUrls: ['./list-collaborators.component.css']
})
export class ListCollaboratorsComponent implements OnInit {
  collaborators: any[] = [];
  loading: boolean = false;
  errorMessage: string = '';
  totalElements: number = 0;
  itemsPerPage: number = 10;
  actualPage: number = 1;

  selectedColaborador: any = null;

  constructor(private listCollaboratorsService: ListCollaboratorsService) { }

  ngOnInit(): void {
    this.loadCollaborators(this.actualPage, this.itemsPerPage);
  }

  loadCollaborators(page: number, size: number): void {
    this.listCollaboratorsService.getCollaborators(page - 1, size, 'name', 'ASC').subscribe({
      next: (response) => {
        this.collaborators = response.content;
        this.totalElements = response.totalElements;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar colaboradores.';
        this.loading = false;
      },
      complete: () => {
      }
    });
  }

  selectColaborador(colaborador: any) {
    this.selectedColaborador = this.selectedColaborador === colaborador ? null : colaborador;
  }

  isSelected(colaborador: any): boolean {
    return this.selectedColaborador === colaborador;
  }

  onPageChange(event: PageEvent): void {
    this.actualPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.loadCollaborators(this.actualPage, this.itemsPerPage);
  }
}
