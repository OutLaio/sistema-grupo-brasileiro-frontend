import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { I_Employee_View_Data } from '../../../../shared/interfaces/user/view/employee-view';
import { I_Page } from '../../../../shared/interfaces/pageable/pageable';
import { StorageService } from '../../../../services/storage/storage.service';
import { I_Api_Response } from '../../../../shared/interfaces/api-response';
import { environment } from '../../../../../../environments/environment';

/**
 * Serviço para gerenciar operações relacionadas à listagem de clientes.
 * Inclui funcionalidades para buscar colaboradores e gerar links de cadastro.
 */
@Injectable({
  providedIn: 'root',
})
export class ListClientsService {
  /**
   * URL base da API utilizada pelo serviço.
   */
  private apiUrl = environment.apiUrl + '/api/v1';

  /**
   * Construtor que injeta as dependências necessárias para o funcionamento do serviço.
   * @param http Serviço Angular para realizar requisições HTTP.
   * @param storageService Serviço para gerenciamento de armazenamento local e recuperação de tokens.
   */
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  /**
   * Gera os cabeçalhos necessários para as requisições HTTP.
   * @returns Um objeto HttpHeaders com o tipo de conteúdo e token de autorização.
   */
  private getHeaders() {
    const token = this.storageService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  /**
   * Busca todos os colaboradores com paginação.
   * @param page Número da página (0-indexado).
   * @param size Quantidade de itens por página.
   * @returns Observable com a resposta da API, contendo os dados paginados de colaboradores.
   */
  getAllClients(page: number, size: number) {
    let url = `${this.apiUrl}/employees/allEmployees?page=${page}&size=${size}`;
    return this.http.get<I_Api_Response<I_Page<I_Employee_View_Data>>>(url, {
      headers: this.getHeaders(),
    });
  }

  /**
   * Obtém o link para solicitação de cadastro.
   * @returns Observable com a resposta da API, contendo o link gerado.
   */
  getLink() {
    const header = this.getHeaders();
    return this.http.get<I_Api_Response<string>>(
      `${this.apiUrl}/auth/requestRegister`,
      { headers: header }
    );
  }
}
