import { Component, OnInit } from '@angular/core';
import { ListCollaboratorsService } from '../services/list-collaborators.service';
import { PageEvent } from '@angular/material/paginator';
import { I_Employee_View_Data } from '../../../../shared/interfaces/user/view/employee-view';
import { I_Page } from '../../../../shared/interfaces/pageable/pageable';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * Componente responsável pela exibição e gerenciamento da lista de colaboradores.
 * Inclui funcionalidades de paginação, seleção de colaborador e carregamento dinâmico de dados.
 */
@Component({
  selector: 'app-list-collaborators',
  templateUrl: './list-collaborators.component.html',
  styleUrls: ['./list-collaborators.component.css']
})
export class ListCollaboratorsComponent implements OnInit {
  /**
   * Lista de colaboradores carregados.
   */
  collaborators: I_Employee_View_Data[] = [];
  /**
   * Indica se os dados estão sendo carregados.
   */
  loading: boolean = false;
  /**
   * Mensagem de erro a ser exibida em caso de falha ao carregar os dados.
   */
  errorMessage: string = '';
  /**
   * Total de elementos disponíveis na base de dados.
   */
  totalElements: number = 0;
  /**
   * Número de itens por página.
   */
  itemsPerPage: number = 12;
  /**
   * Página atual na paginação.
   */
  actualPage: number = 1;

  /**
   * Colaborador selecionado.
   */
  selectedCollaborator: any = null;

  /**
   * Construtor que injeta o serviço de listagem de colaboradores.
   * @param listCollaboratorsService Serviço responsável pela obtenção de dados dos colaboradores.
   */
  constructor(private listCollaboratorsService: ListCollaboratorsService) { }

  /**
   * Método de inicialização do componente. 
   * Carrega a lista de colaboradores com os parâmetros padrão de paginação.
   */
  ngOnInit(): void {
    this.loadCollaborators(this.actualPage, this.itemsPerPage);
  }

  /**
   * Carrega a lista de colaboradores a partir do serviço.
   * @param page Número da página (começando de 1).
   * @param size Número de itens por página.
   */
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

  /**
   * Seleciona ou deseleciona um colaborador.
   * @param colaborador Objeto do colaborador selecionado.
   */
  selectCollaborator(colaborador: any) {
    this.selectedCollaborator = this.selectedCollaborator === colaborador ? null : colaborador;
  }

  /**
   * Verifica se o colaborador fornecido está selecionado.
   * @param colaborador Objeto do colaborador.
   * @returns `true` se o colaborador estiver selecionado, caso contrário, `false`.
   */
  isSelected(colaborador: any): boolean {
    return this.selectedCollaborator === colaborador;
  }

  /**
   * Manipula mudanças na paginação.
   * @param event Evento de mudança da página, contendo as informações de index e tamanho da página.
   */
  onPageChange(event: PageEvent): void {
    this.actualPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.loadCollaborators(this.actualPage, this.itemsPerPage);
  }
}
