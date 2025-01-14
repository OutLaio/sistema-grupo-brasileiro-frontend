import { Component, HostListener } from '@angular/core';
import { LoginRegisterService } from '../../../../services/login-register/login-register.service';
import { Router } from '@angular/router';
import { StorageService } from '../../../../services/storage/storage.service';

/**
 * Componente responsável pelo sistema de colaboradores.
 * Controla a exibição de formulários, navegação com base em permissões de usuário,
 * e a responsividade para dispositivos móveis.
 */
@Component({
	selector: 'app-collaborator-system',
	templateUrl: './collaborator-system.component.html',
	styleUrl: './collaborator-system.component.css'
})
export class CollaboratorSystemComponent {
	/**
	 * Controla a visibilidade do formulário.
	 * Quando verdadeiro, o formulário é exibido; caso contrário, exibe a lista.
	 */
	isFormVisible: boolean = true;
  /**
   * Indica se o dispositivo atual é classificado como mobile.
   */
	isMobile: boolean = false;

  /**
   * Construtor que injeta os serviços necessários.
   * @param storageService Serviço para gerenciar o armazenamento local e verificar informações do usuário.
   * @param router Serviço para navegação entre rotas.
   */
	constructor(
		private storageService: StorageService,
		private router: Router
	) { }

  /**
   * Método de inicialização do componente. 
   * Verifica o papel do usuário e redireciona caso ele não seja supervisor.
   * Também chama a função para determinar se o dispositivo é mobile.
   */
	ngOnInit() {
		if (this.storageService.getUserRole() !== 'ROLE_SUPERVISOR') {
			this.router.navigate(['/acompanhamento']);
		}
		this.checkIfMobile(); // Verificar se é mobile ao iniciar
	}

  /**
   * Escuta eventos de redimensionamento da janela.
   * Atualiza a propriedade `isMobile` sempre que a janela é redimensionada.
   */
	@HostListener('window:resize', [])
	onResize() {
		this.checkIfMobile();
	}

  /**
   * Verifica se o dispositivo é mobile com base na largura da janela.
   * Define 768px como ponto de corte para dispositivos móveis.
   */
	private checkIfMobile() {
		this.isMobile = window.innerWidth <= 768; // Define 768px como ponto de corte para mobile
	}

  /**
   * Exibe o formulário no layout, ocultando a lista.
   */
	showForm() {
		this.isFormVisible = true;
	}

  /**
   * Exibe a lista no layout, ocultando o formulário.
   */
	showList() {
		this.isFormVisible = false;
	}
}
