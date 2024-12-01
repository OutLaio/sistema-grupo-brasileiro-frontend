import { Component, OnInit } from '@angular/core';
import { ListClientsService } from '../../services/list-clients.service';
import { PageEvent } from '@angular/material/paginator';
import { I_Employee_View_Data } from '../../../../../shared/interfaces/user/view/employee-view';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrl: './list-clients.component.css',
})
export class ListClientsComponent {
  clients: I_Employee_View_Data[] = [];
  loading: boolean = false;
  errorMessage: string = '';
  totalElements: number = 0;
  itemsPerPage: number = 12;
  actualPage: number = 1;

  selectedClient!: I_Employee_View_Data | null;

  constructor(
    private listClientsService: ListClientsService,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.loadClients(this.actualPage, this.itemsPerPage);
  }

  loadClients(page: number, size: number): void {
    this.listClientsService.getAllClients(page - 1, size).subscribe({
      next: (response) => {
        this.clients = response.data!.content!.sort((a, b) => a.name.localeCompare(b.name));
        this.totalElements = response.data?.totalElements!;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error.message;
        this.loading = false;
      },
      complete: () => {},
    });
  }

  selectClient(colaborador: I_Employee_View_Data) {
    this.selectedClient =
      this.selectedClient === colaborador ? null : colaborador;
  }

  isSelected(colaborador: any): boolean {
    return this.selectedClient === colaborador;
  }

  onPageChange(event: PageEvent): void {
    this.actualPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.loadClients(this.actualPage, this.itemsPerPage);
  }

  getLink() {
    this.listClientsService.getLink().subscribe({
      next: (res) => {
        Swal.fire({
          html: `
            <h4 class="">${res.message}</h4>
            <p class="text-success">Copie o link abaixo e compartilhe o acesso ao cadastro</p>
            <input readonly type="text" value="${res.data}" class="form-control p-3 alert alert-success" />`,
          showConfirmButton: false,
          showCloseButton: true,
          width: '70%',
        });
      },
      error: (err: HttpErrorResponse) => {
        this.toastrService.error(err.error.message);
      },
    });
  }
}
