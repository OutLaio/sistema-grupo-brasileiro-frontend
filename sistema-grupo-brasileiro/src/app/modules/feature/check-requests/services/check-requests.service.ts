import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../../../services/storage/storage.service';
import { I_Api_Response } from '../../../shared/interfaces/api-response';
import { I_Project_Data } from '../../../shared/interfaces/project/view/project-view';

/**
 * Serviço responsável por gerenciar requisições relacionadas aos projetos.
 * Ele fornece métodos para obter dados de projetos do servidor.
 */
@Injectable({
  providedIn: 'root',
})
export class CheckRequestsService {
  /**
   * Token de autenticação recuperado do armazenamento local.
   */
  private readonly authToken = this.storageService.getToken();
  /**
   * URL base da API para operações relacionadas aos projetos.
   */
  // private apiUrl = 'http://54.200.23.253:8000/api/v1/projects';
  private apiUrl = 'http://localhost:8080/api/v1/projects';

  /**
   * Construtor do serviço que injeta as dependências necessárias.
   * @param http Serviço HttpClient para realizar requisições HTTP.
   * @param storageService Serviço de armazenamento para obter o token de autenticação.
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
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    });
  }

  /**
   * Obtém a lista de projetos do servidor.
   * @returns Um observable com a resposta da API contendo os dados dos projetos.
   */
  getProjects() {
    const headers = this.getHeaders();
    return this.http.get<I_Api_Response<I_Project_Data[]>>(this.apiUrl, {
      headers,
    });
  }
}
