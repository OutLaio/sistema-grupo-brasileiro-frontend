import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../../../services/storage/storage.service';
import { I_Api_Response } from '../../../shared/interfaces/api-response';
import { I_City_Data } from '../../../shared/interfaces/briefing/agency-board/view/city-view';
import { I_Company_Data } from '../../../shared/interfaces/company/view/company-view';

/**
 * Serviço responsável por buscar dados de cidades e empresas.
 * Realiza chamadas HTTP para endpoints protegidos utilizando autenticação via token.
 */
@Injectable({
  providedIn: 'root'
})
export class CitiesCompaniesService {
  /**
   * URL base para chamadas à API.
   */
  private apiUrl = 'http://localhost:8080/api/v1/data';

  /**
   * Construtor do serviço.
   * @param http Serviço Angular para realizar chamadas HTTP.
   * @param storageService Serviço para gerenciar o token de autenticação.
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
  private getHeaders(){
    const token = this.storageService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  /**
   * Busca os dados de cidades da API.
   * @returns Um `Observable` contendo uma lista de dados de cidades (`I_City_Data[]`).
   */
  getCities() {
    let url = `${this.apiUrl}/cities`;
    return this.http.get<I_City_Data[]>(url, { headers: this.getHeaders() });
  }

  /**
   * Busca os dados de empresas da API.
   * @returns Um `Observable` contendo uma lista de dados de empresas (`I_Company_Data[]`).
   */
  getCompanies() {
    let url = `${this.apiUrl}/companies`;
    return this.http.get<I_Company_Data[]>(url, { headers: this.getHeaders() });
  }
}
