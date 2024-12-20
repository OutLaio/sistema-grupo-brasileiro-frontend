import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../services/sidebar/sidebar.service';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../../../services/login-register/login-register.service';
import { StorageService } from '../../../services/storage/storage.service';

/**
 * Componente responsável pela exibição da barra lateral (sidebar).
 * 
 * Este componente controla a visibilidade da barra lateral, navegação de links, 
 * e permite o logout do usuário.
 */
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  /**
   * Indica se a sidebar está visível.
   * @type {boolean}
  */
  isSidebarVisible = false;
  /**
   * Representa o nível do usuário logado.
   * @type {string}
  */
  userRole: string = '';

  /**
  * Construtor do componente.
  * 
  * @param sidebarService Serviço responsável por gerenciar a visibilidade da sidebar.
  * @param storageService Serviço para acessar dados armazenados localmente, como o nível do usuário.
  * @param router Serviço de navegação para manipular as rotas.
  * @param loginRegisterService Serviço responsável por gerenciar autenticação.
  */
  constructor(
    private sidebarService: SidebarService,
    private storageService: StorageService,
    private router: Router,
    private loginRegisterService: LoginRegisterService,
  ) { }

  /**
   * Método executado na inicialização do componente.
   * 
   * - Subscreve-se às alterações de visibilidade da sidebar.
   * - Obtém o nível do usuário armazenado no serviço de armazenamento, para mostrar somente as opções do seu nível
   */
  ngOnInit() {
    this.sidebarService.sidebarVisibility$.subscribe((isVisible) => {
      this.isSidebarVisible = isVisible;
      this.userRole = this.storageService.getUserRole() ?? '';
    });
  }

  /**
  * Alterna a visibilidade da sidebar.
  * 
  * - Atualiza o estado local de visibilidade.
  * - Notifica o serviço responsável sobre a alteração.
  */
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.sidebarService.toggleSidebar();
  }

  /**
   * Verifica se o link correspondente à rota fornecida está ativo.
   * 
   * @param route A rota a ser verificada.
   * @returns {boolean} `true` se a rota estiver ativa, caso contrário `false`.
   */
  isActiveLink(route: string): boolean {
    return this.router.url.includes(route);
  }

  /**
   * Realiza o logout do usuário.
   * 
   * - Chama o método de logout no serviço de autenticação.
   * - Redireciona o usuário para a página de login.
   * - Recarrega a aplicação para limpar o estado.
   */
  logoutUser() {
    this.loginRegisterService.logout();
    this.router.navigate(['/login']);
    location.reload();
  }
}
