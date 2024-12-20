import { Component } from '@angular/core';
import { SidebarService } from './modules/services/sidebar/sidebar.service';
import { StorageService } from './modules/services/storage/storage.service';

/**
 * Componente Raiz da Aplicação (AppComponent)
 * 
 * Este componente é o ponto de entrada principal para o front-end da aplicação Angular.
 * Ele gerencia a visibilidade da barra lateral e verifica o estado de autenticação do usuário.
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  /**
   * Título da aplicação.
   */
  title = 'sistema-grupo-brasileiro';
  /**
   * Estado que determina se a barra lateral está visível ou não.
   */
  isSidebarVisible = false;
  /**
   * Construtor do componente `AppComponent`.
   * 
   * @param sidebarService Serviço responsável por gerenciar a visibilidade da barra lateral.
   * @param storageService Serviço responsável por gerenciar o armazenamento local e verificar o estado de autenticação.
   */
  constructor(
    private sidebarService: SidebarService,
    private storageService: StorageService,
  ) { }

  /**
   * Ciclo de vida do componente angular chamado ao inicializar o componente.
   * 
   * Este método se inscreve no Observable `sidebarVisibility$` do serviço `SidebarService`
   * para monitorar mudanças na visibilidade da barra lateral.
   */
  ngOnInit() {
    this.sidebarService.sidebarVisibility$.subscribe((isVisible) => {
      this.isSidebarVisible = isVisible;
    });
  }

  /**
    * Método para verificar se o usuário está autenticado.
    * 
    * @returns `true` se o usuário estiver autenticado; caso contrário, `false`.
    */
  isAuthenticated() {
    return this.storageService.isAuthenticated();
  }

}
