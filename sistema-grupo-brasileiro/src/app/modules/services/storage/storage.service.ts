import { Injectable } from '@angular/core';
import { I_Employee_View_Data } from '../../shared/interfaces/user/view/employee-view';
import { CookieService } from 'ngx-cookie-service';

/**
 * Serviço `StorageService`
 * 
 * Gerencia informações do perfil do usuário e autenticação utilizando cookies.
 * Proporciona métodos 'pa'ra acessar dados do perfil do usuário, verificar permissões e obter o token de autenticação.
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  /**
   * Construtor do componente `StorageService`.
   * 
   * @param cookieService - Serviço para manipulação de cookies, utilizado para coletar os dados do usuário.
   */
  constructor(private cookieService: CookieService) { }

  /**
   * Obtém o perfil do usuário ativo da sessão.
   * @returns O perfil do usuário ativo (`I_Employee_View_Data`).
   * @throws Erro se o perfil do usuário não estiver armazenado nos cookies.
   */
  getSessionProfile(): I_Employee_View_Data {
    const activeUser = this.cookieService.get('activeUser');
    if (!activeUser) {
      throw new Error('User profile not found in cookies');
    }
    return JSON.parse(activeUser) as I_Employee_View_Data;
  }

  /**
   * Define o perfil do usuário ativo na sessão e o armazena nos cookies.
   * @param profile O perfil do usuário (`I_Employee_View_Data`).
   */
  setSessionProfile(profile: I_Employee_View_Data) {
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    this.cookieService.set(
      'activeUser',
      JSON.stringify(profile),
      expiration,
      '/'
    );
  }

  /**
    * Obtém o nome completo do usuário ativo.
    * @returns O nome completo no formato "Nome Sobrenome".
    */
  getUserFullName(): string {
    return `${this.getSessionProfile().name} ${this.getSessionProfile().lastname}`;
  }

  /**
   * Verifica se o usuário tem o nível de cliente.
   * @returns `true` se o nível for 'ROLE_CLIENT', caso contrário `false`.
   */
  isClient(): boolean {
    return this.getSessionProfile().user.profile.description === 'ROLE_CLIENT';
  }

  /**
   * Verifica se o usuário tem o nível de colaborador.
   * @returns `true` se o nível for 'ROLE_COLLABORATOR', caso contrário `false`.
   */
  isCollaborator(): boolean {
    return this.getSessionProfile().user.profile.description === 'ROLE_COLLABORATOR';
  }

  /**
   * Verifica se o usuário tem o nível de supervisor.
   * @returns `true` se o nível for 'ROLE_SUPERVISOR', caso contrário `false`.
   */
  isSupervisor(): boolean {
    return this.getSessionProfile().user.profile.description === 'ROLE_SUPERVISOR';
  }

  /**
   * Obtém a descrição do nível do usuário.
   * @returns Uma string representando o nível do usuário.
   */
  getUserRole(): string {
    return this.getSessionProfile().user.profile.description;
  }

  /**
   * Obtém o ID do usuário ativo.
   * @returns O ID do usuário.
   */
  getUserId(): string {
    return this.getSessionProfile().id;
  }

  /**
   * Obtém o token de autenticação armazenado nos cookies.
   * @returns O token de autenticação ou uma string vazia se não estiver disponível.
   */
  getToken(): string {
    return this.cookieService.get('auth-token') || '';
  }

  /**
  * Verifica se o usuário está autenticado.
  * @returns `true` se o token de autenticação estiver presente, caso contrário `false`.
  */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
