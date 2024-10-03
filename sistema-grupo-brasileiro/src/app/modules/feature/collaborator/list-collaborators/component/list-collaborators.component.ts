import { Component, OnInit } from '@angular/core';
import { ListCollaboratorsService } from '../services/list-collaborators.service';

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
  totalPages: number = 0; 
  itemsPerPage: number = 10;
  p: number = 1;

  pages: number[] = [];
  selectedColaborador: any = null;

  constructor(private listCollaboratorsService: ListCollaboratorsService) {}

  ngOnInit(): void {
    this.loadCollaborators(this.p, this.itemsPerPage);
  }

  loadCollaborators(page: number, size: number): void {
    this.loading = true;
    this.listCollaboratorsService.getCollaborators(page - 1, size, 'name', 'ASC').subscribe(
      response => {
        this.collaborators = response.content;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages; 
        this.updatePageList(); 
        this.loading = false;
      },
      error => {
        this.errorMessage = 'Erro ao carregar colaboradores.';
        this.loading = false;
      }
    );
  }

  updatePageList(): void {
    const currentGroup = Math.floor((this.p - 1) / 3); 
    this.pages = Array.from(
      { length: 3 },
      (_, i) => i + 1 + currentGroup * 3
    ).filter(page => page <= this.totalPages);
  }

  selectColaborador(colaborador: any) {
    this.selectedColaborador = this.selectedColaborador === colaborador ? null : colaborador;
  }

  isSelected(colaborador: any): boolean {
    return this.selectedColaborador === colaborador;
  }

  onPageChange(page: number): void {
    this.p = page;
    this.loadCollaborators(this.p, this.itemsPerPage);
  }

  // Funções para ir para a primeira e última página
  goToFirst(): void {
    this.p = 1;
    this.loadCollaborators(this.p, this.itemsPerPage);
  }

  goToLast(): void {
    this.p = this.totalPages;
    this.loadCollaborators(this.p, this.itemsPerPage);
  }
  previousGroup(): void {
    const firstPageInCurrentGroup = this.pages[0];
    if (firstPageInCurrentGroup > 1) {
      this.p = firstPageInCurrentGroup - 3; // Volta 3 páginas para o grupo anterior
      if (this.p < 1) {
        this.p = 1; // Caso a página atual seja menor que 1, define como 1
      }
      this.loadCollaborators(this.p, this.itemsPerPage);
    }
  }
  
  nextGroup(): void {
    const lastPageInCurrentGroup = this.pages[this.pages.length - 1];
    if (lastPageInCurrentGroup < this.totalPages) {
      this.p = lastPageInCurrentGroup + 1; // Avança para a próxima página após o grupo atual
      if (this.p > this.totalPages) {
        this.p = this.totalPages; // Caso a página atual seja maior que o total de páginas
      }
      this.loadCollaborators(this.p, this.itemsPerPage);
    }
  }
  
}
