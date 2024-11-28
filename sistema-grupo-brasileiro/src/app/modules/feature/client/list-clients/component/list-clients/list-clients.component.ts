import { Component, OnInit } from '@angular/core';
import { ListClientsService } from '../../services/list-clients.service';
import { PageEvent } from '@angular/material/paginator';
import { I_Employee_View_Data } from '../../../../../shared/interfaces/user/view/employee-view';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrl: './list-clients.component.css'
})
export class ListClientsComponent {
  clients: I_Employee_View_Data[] = [];
  loading: boolean = false;
  errorMessage: string = '';
  totalElements: number = 0;
  itemsPerPage: number = 12;
  actualPage: number = 1;

  selectedClient!: I_Employee_View_Data | null;

  constructor(private listClientsService: ListClientsService) { }

  ngOnInit(): void {
    this.loadClients(this.actualPage, this.itemsPerPage);
  }

  loadClients(page: number, size: number): void {
    this.listClientsService.getAllClients(page - 1, size).subscribe({
      next: (response) => {
        this.clients = response.data?.content!;
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

  selectClient(colaborador: I_Employee_View_Data) {
    this.selectedClient = this.selectedClient === colaborador ? null : colaborador;
  }

  isSelected(colaborador: any): boolean {
    return this.selectedClient === colaborador;
  }

  onPageChange(event: PageEvent): void {
    this.actualPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.loadClients(this.actualPage, this.itemsPerPage);
  }
}
