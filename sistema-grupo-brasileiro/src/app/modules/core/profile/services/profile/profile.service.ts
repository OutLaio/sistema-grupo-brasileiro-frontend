import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { I_Employee_View_Data } from '../../../../shared/interfaces/user/view/employee-view';
import { I_Change_Password_Request } from '../../../../shared/interfaces/auth/form/password-form';
import { I_Employee_Form_Data } from '../../../../shared/interfaces/user/form/employee-form';
import { StorageService } from '../../../../services/storage/storage.service';
import { I_Api_Response } from '../../../../shared/interfaces/api-response';

/**
 * Serviço responsável por gerenciar as operações relacionadas ao perfil do usuário.
 * Este serviço permite atualizar dados do perfil, alterar a senha e desativar a conta do usuário.
 */
@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  /** URL base para as requisições da service. */
  // private readonly baseUrl = 'http://54.200.23.253:8000/api/v1';
  private readonly baseUrl = 'http://localhost:8080/api/v1';

  /** Token de autenticação obtido da service de armazenamento. */
  private readonly authToken = this.storageService.getToken();

  /**
   * Construtor do serviço de perfil.
   * 
   * @param http Serviço Angular para realizar requisições HTTP.
   * @param storageService Serviço responsável por gerenciar o armazenamento local e de sessão.
   * 
   * O construtor inicializa o serviço `HttpClient` para realizar requisições à API 
   * e o serviço `StorageService` para acessar o token de autenticação armazenado. 
   * O token é utilizado para autenticar todas as operações realizadas pelo serviço.
   */
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  /**
   * Retorna os cabeçalhos HTTP necessários para autenticação e envio de JSON.
   * @returns Cabeçalhos com `Content-Type` e `Authorization`.
   */
  private getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    });
  }

  /**
   * Atualiza os dados do perfil do usuário.
   * @param req Dados do formulário do usuário a serem atualizados.
   * @param userId ID do usuário a ser atualizado.
   * @returns Observable com a resposta da API contendo os dados atualizados do usuário.
   */
  updateProfileUser(req: I_Employee_Form_Data, userId?: string) {
    const headers = this.getHeaders();
    return this.http.put<I_Api_Response<I_Employee_View_Data>>(
      `${this.baseUrl}/employees/${userId}`,
      req,
      {
        headers,
        withCredentials: true,
      }
    );
  }

  /**
   * Desativa a conta do usuário.
   * @param userId ID do usuário cuja conta será desativada.
   * @returns Observable com a resposta da API.
   */
  deleteAccount(userId?: string) {
    const headers = this.getHeaders();
    return this.http.put<I_Api_Response<void>>(`${this.baseUrl}/users/${userId}/deactivate`, {}, {
      headers,
      withCredentials: true,
    }
    );
  }

  /**
   * Altera a senha do usuário.
   * @param req Objeto contendo os dados necessários para alterar a senha.
   * @returns Observable com a resposta da API.
   */
  editPassword(req: I_Change_Password_Request) {
    const headers = this.getHeaders();
    return this.http.post<I_Api_Response<void>>(`${this.baseUrl}/users/changePassword`, req, {
      headers,
      withCredentials: true
    }
    );
  }
}
