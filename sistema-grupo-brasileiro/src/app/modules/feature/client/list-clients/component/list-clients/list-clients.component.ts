import { Component, OnInit } from '@angular/core';
import { ListClientsService } from '../../services/list-clients.service';
import { PageEvent } from '@angular/material/paginator';
import { I_Employee_View_Data } from '../../../../../shared/interfaces/user/view/employee-view';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

/**
 * Componente responsável por listar e gerenciar clientes.
 * Fornece funcionalidades para paginação, seleção de clientes e geração de links para cadastro.
 */
@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrl: './list-clients.component.css',
})
export class ListClientsComponent {
  /**
   * Lista de clientes carregados.
   */
  clients: I_Employee_View_Data[] = [];
  /**
   * Indica o estado de carregamento da lista.
   */
  loading: boolean = false;
  /**
   * Mensagem de erro exibida ao usuário, caso ocorra.
   */
  errorMessage: string = '';
  /**
   * Número total de elementos disponíveis para paginação.
   */
  totalElements: number = 0;
  /**
   * Quantidade de itens exibidos por página.
   */
  itemsPerPage: number = 12;
  /**
   * Página atual da listagem.
   */
  actualPage: number = 1;
  /**
   * Cliente selecionado atualmente.
   */
  selectedClient!: I_Employee_View_Data | null;

  /**
   * Construtor que injeta os serviços necessários para o funcionamento do componente.
   * @param listClientsService Serviço para gerenciar operações de clientes.
   * @param toastrService Serviço para exibir notificações ao usuário.
   */
  constructor(
    private listClientsService: ListClientsService,
    private toastrService: ToastrService,
  ) {}

  /**
   * Método de ciclo de vida do Angular. 
   * Carrega a lista de clientes ao inicializar o componente.
   */
  ngOnInit(): void {
    this.loadClients(this.actualPage, this.itemsPerPage);
  }

  /**
   * Carrega a lista de clientes de acordo com a página e o tamanho especificados.
   * @param page Página a ser carregada (1-indexada).
   * @param size Número de itens por página.
   */
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

  /**
   * Seleciona um cliente na lista ou desmarca se já estiver selecionado.
   * @param colaborador O cliente a ser selecionado ou desmarcado.
   */
  selectClient(colaborador: I_Employee_View_Data) {
    this.selectedClient =
      this.selectedClient === colaborador ? null : colaborador;
  }

  /**
   * Verifica se um cliente está selecionado.
   * @param colaborador Cliente a ser verificado.
   * @returns Verdadeiro se o cliente estiver selecionado, falso caso contrário.
   */
  isSelected(colaborador: any): boolean {
    return this.selectedClient === colaborador;
  }

  /**
   * Manipula a troca de página e recarrega a lista de clientes com base nos novos parâmetros.
   * @param event Evento de mudança de página.
   */
  onPageChange(event: PageEvent): void {
    this.actualPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.loadClients(this.actualPage, this.itemsPerPage);
  }

  /**
   * Gera um link para compartilhar o cadastro de clientes.
   * Exibe o link em um modal utilizando o SweetAlert.
   */
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
