import { Component } from '@angular/core';
import { SidebarService } from '../../../services/sidebar/sidebar.service';
import { StorageService } from '../../../services/storage/storage.service';
import { I_Employee_View_Data } from '../../../shared/interfaces/user/view/employee-view';

/**
 * Componente responsável pelo cabeçalho da aplicação.
 * 
 * Este componente exibe informações do usuário ativo e permite alternar a visibilidade da barra lateral (sidebar).
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

  /**
   * Dados do usuário ativo obtidos a partir da sessão.
   * 
   * @type {I_Employee_View_Data}
   */
  activeUser!: I_Employee_View_Data;

  /**
   * Construtor do componente.
   * 
   * @param {SidebarService} sidebarService Serviço responsável por controlar o estado da barra lateral.
   * @param {StorageService} storageService Serviço responsável por acessar dados do armazenamento local, como o perfil do usuário.
   */
  constructor(
    private sidebarService: SidebarService,
    private storageService: StorageService
  ) { }

  /**
   * Método do ciclo de vida executado ao inicializar o componente.
   * 
   * Obtém os dados do perfil do usuário ativo a partir do serviço de armazenamento.
   */
  ngOnInit(): void {
    this.activeUser = this.storageService.getSessionProfile();
  }

  /**
   * Alterna a visibilidade da barra lateral (sidebar).
   * 
   * Utiliza o serviço de controle da sidebar para atualizar o estado de visibilidade.
   */
  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
