import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { I_Employee_View_Data } from '../../../../shared/interfaces/user/view/employee-view';
import { I_Page } from '../../../../shared/interfaces/pageable/pageable';
import { StorageService } from '../../../../services/storage/storage.service';
import { I_Api_Response } from '../../../../shared/interfaces/api-response';

/**
 * Serviço responsável pela comunicação com a API para gerenciar a listagem de colaboradores.
 */
@Injectable({
  providedIn: 'root'
})
export class ListCollaboratorsService {
  /**
   * URL base da API para obter a lista de colaboradores.
   */
  private apiUrl = 'http://localhost:8080/api/v1/employees/allCollaborators';

  /**
   * Construtor que injeta dependências necessárias.
   * @param http Serviço Angular para realizar requisições HTTP.
   * @param storageService Serviço responsável por gerenciar o armazenamento local, como tokens.
   */
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) { }

  /**
   * Obtém os cabeçalhos HTTP necessários para autenticação.
   * Inclui o token de autenticação no cabeçalho `Authorization`.
   * @returns Um objeto `HttpHeaders` configurado.
   */
  private getHeaders() {
    const token = this.storageService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  /**
   * Obtém todos os colaboradores com suporte à paginação.
   * @param page Número da página (baseado em zero).
   * @param size Número de itens por página.
   * @returns Um `Observable` com os dados paginados dos colaboradores.
   */
  getAllCollaborators(page: number, size: number) {
    let url = `${this.apiUrl}?page=${page}&size=${size}`;
    return this.http.get<I_Api_Response<I_Page<I_Employee_View_Data>>>(url, { headers: this.getHeaders() });
  }
}