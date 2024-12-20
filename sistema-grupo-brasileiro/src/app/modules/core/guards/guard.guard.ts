import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginRegisterService } from '../../services/login-register/login-register.service';
import { StorageService } from '../../services/storage/storage.service';

/**
 * Guard de autenticação (AuthGuard)
 * 
 * Este serviço atua como um mecanismo de proteção de rotas no Angular, garantindo que 
 * apenas usuários autenticados possam acessar rotas específicas. Caso um usuário 
 * não autenticado tente acessar uma rota protegida, ele será redirecionado para a 
 * página de login.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /**
   * Construtor do AuthGuard.
   * 
   * @param storageService Serviço para manipulação dos dados de sessão.
   * @param router Serviço Angular para navegação entre rotas.
   */
  constructor(private storageService: StorageService, private router: Router) { }

   /**
   * Determina se uma rota pode ser ativada com base no status de autenticação do usuário.
   * 
   * @param route O snapshot da rota que está sendo avaliada.
   * @param state O estado atual do roteamento, incluindo a URL da rota solicitada.
   * @returns `true` se o usuário estiver autenticado; caso contrário, redireciona para `/login` e retorna `false`.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.storageService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
