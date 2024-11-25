import { Component, OnInit } from '@angular/core';
import { ListCollaboratorsService } from '../services/list-collaborators.service';
import { PageEvent } from '@angular/material/paginator';
import { I_Employee_View_Data } from '../../../../shared/interfaces/user/view/employee-view';
import { I_Page } from '../../../../shared/interfaces/pageable/pageable';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-collaborators',
  templateUrl: './list-collaborators.component.html',
  styleUrls: ['./list-collaborators.component.css']
})

export class ListCollaboratorsComponent implements OnInit {
  collaborators: I_Employee_View_Data[] = [];
  loading: boolean = false;
  errorMessage: string = '';
  totalElements: number = 0;
  itemsPerPage: number = 12;
  actualPage: number = 1;

  selectedCollaborator: any = null;

  constructor(private listCollaboratorsService: ListCollaboratorsService) { }

  ngOnInit(): void {
    this.loadCollaborators(this.actualPage, this.itemsPerPage);
  }

  loadCollaborators(page: number, size: number): void {
    this.listCollaboratorsService.getAllCollaborators(page - 1, size).subscribe({
      next: (response) => {
        this.collaborators = response.data?.content!;
        this.totalElements = response.data?.totalElements!;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error.message;
        this.loading = false;
      },
      complete: () => {
      }
    });
  }

  selectCollaborator(colaborador: any) {
    this.selectedCollaborator = this.selectedCollaborator === colaborador ? null : colaborador;
  }

  isSelected(colaborador: any): boolean {
    return this.selectedCollaborator === colaborador;
  }

  onPageChange(event: PageEvent): void {
    this.actualPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.loadCollaborators(this.actualPage, this.itemsPerPage);
  }
}
