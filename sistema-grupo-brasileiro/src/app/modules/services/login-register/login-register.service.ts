import { I_Employee_Form_Data } from './../../shared/interfaces/user/form/employee-form';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { I_Api_Response } from '../../shared/interfaces/api-response';
import { I_Token_Response } from '../../shared/interfaces/auth/view/token-view';
import { I_Employee_View_Data } from '../../shared/interfaces/user/view/employee-view';
import { Router } from '@angular/router';
import { I_User_Request } from '../../shared/interfaces/user/form/user-details-form';
import { I_Login_Request } from '../../shared/interfaces/auth/form/login-form';
import { I_Recovery_Password_Request } from '../../shared/interfaces/auth/form/recovery-password-form';
import { I_Reset_Password_Request } from '../../shared/interfaces/auth/form/reset-password-form';
import { StorageService } from '../storage/storage.service';
import { CookieService } from 'ngx-cookie-service';

/**
 * Serviço `LoginRegisterService`
 * 
 * Gerencia operações relacionadas ao login, registro de usuários, recuperação de senha
 * e manipulação de autenticação no sistema.
 */
@Injectable({
  providedIn: 'root',
})
export class LoginRegisterService {
  /**
   * URL base para as operações de autenticação e registro.
   */
  private readonly prefix = 'http://localhost:8080/api/v1/auth';

  /**
   * Construtor do serviço `LoginRegisterService`.
   * 
   * @param router - Serviço de navegação para redirecionar o usuário.
   * @param httpClient - Instância para realizar requisições HTTP.
   * @param cookieService - Serviço para manipulação de cookies, utilizado para armazenar os dados do usuário após o login.
   */
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) { }

  /**
   * Registra um novo usuário no sistema.
   * 
   * @param req - Objeto contendo as informações do usuário.
   * @returns Observable com a resposta da API contendo os dados do funcionário registrado.
   */
  registerUser(req: I_User_Request) {
    return this.httpClient.post<I_Api_Response<I_Employee_View_Data>>(
      `${this.prefix}/register`,
      req
    );
  }

  /**
   * Realiza login do usuário no sistema.
   * 
   * - Armazena o token de autenticação e os dados do usuário nos cookies.
   * - Redireciona para a página de acompanhamento após o login.
   * 
   * @param req - Objeto contendo as credenciais de login.
   * @returns Observable com a resposta da API contendo o token de autenticação e os dados do usuário.
   */
  loginUser(req: I_Login_Request) {
    return this.httpClient
      .post<I_Api_Response<I_Token_Response>>(`${this.prefix}/login`, req)
      .pipe(
        tap((value) => {
          const expiration = new Date();
          expiration.setHours(expiration.getHours() + 1);

          this.cookieService.set('auth-token', value.data?.token!, expiration, '/');
          this.cookieService.set(
            'activeUser',
            JSON.stringify(value.data?.employee!),
            expiration,
            '/'
          );
          this.router.navigate(['/acompanhamento']);
        })
      );
  }

  /**
   * Solicita a recuperação de senha para o email informado.
   * 
   * @param req - Objeto contendo o email do usuário.
   * @returns Observable com a resposta da API.
   */
  recoveryPassword(req: I_Recovery_Password_Request) {
    return this.httpClient.post<I_Api_Response<void>>(
      `${this.prefix}/requestReset`,
      req
    );
  }

  /**
   * Verifica se o token de redefinição de senha é válido.
   * 
   * @param token - Token de redefinição de senha.
   * @returns Observable com a resposta da API.
   */
  verifyToken(token: string) {
    return this.httpClient.get<I_Api_Response<void>>(
      `${this.prefix}/verifyToken?token=${token}`
    );
  }

  /**
   * Redefine a senha do usuário.
   * 
   * @param req - Objeto contendo o token e a nova senha.
   * @returns Observable com a resposta da API.
   */
  resetPassword(req: I_Reset_Password_Request) {
    return this.httpClient.post<I_Api_Response<void>>(
      `${this.prefix}/resetPassword`,
      req
    );
  }

  /**
   * Realiza logout do usuário no sistema.
   * 
   * - Remove os cookies de autenticação e do usuário ativo.
   * - Redireciona para a página de login.
   */
  logout() {
    this.cookieService.delete('auth-token', '/');
    this.cookieService.delete('activeUser', '/');
    this.router.navigate(['/login']);
  }
}
