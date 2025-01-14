import { Component, Input } from '@angular/core';
import { I_Any_Briefing } from '../../../../shared/interfaces/briefing/any-briefing';
import { I_Sticker_Response } from '../../../../shared/interfaces/briefing/sticker/view/sticker-detailed-view';
import { I_Version_Data } from '../../../../shared/interfaces/project/view/version-view';
import { StorageService } from '../../../../services/storage/storage.service';
import { UtilsService } from '../../services/utils/utils.service';
import { C_PROJECT_STATUS } from '../../../../shared/enums/project-status';

/**
 * Componente responsável por exibir informações detalhadas sobre o briefing de adesivos
 * e permitir a alteração de título, status e data, além de gerenciar versões.
 */
@Component({
  selector: 'app-sticker',
  templateUrl: './sticker.component.html',
  styleUrl: './sticker.component.css',
})
export class StickerComponent {
  /**
   * Briefing a ser exibido no componente.
   * 
   * @type {I_Any_Briefing}
   */
  @Input() briefing!: I_Any_Briefing;
  /**
   * Dados detalhados do briefing, baseados no tipo específico "Sticker".
   * 
   * @type {I_Sticker_Response}
   */
  data!: I_Sticker_Response;
  /**
   * Lista de outras empresas associadas ao briefing.
   * 
   * @type {string[]}
   */
  otherCompanies!: string[];
  /**
   * Flag de controle para exibir ou ocultar o modal de nova versão.
   * 
   * @type {boolean}
   */
  isNewVersionModalOpen = false;
  /**
   * Flag de controle para exibir ou ocultar o modal de versão.
   * 
   * @type {boolean}
   */
  isVersionModalOpen = false;

  /**
   * Título da arte associada ao briefing.
   * 
   * @type {string}
   */
  artTitle: string = '';
  /**
   * Descrição da arte associada ao briefing.
   * 
   * @type {string}
   */
  artDescription: string = '';
  /**
   * Arquivo de imagem associado à arte.
   * 
   * @type {File | null}
   */
  artImage: File | null = null;

  /**
  * Versão selecionada para visualização ou edição.
  * 
  * @type {I_Version_Data | undefined}
  */
  selectedVersion: I_Version_Data | undefined;

  /**
   * Construtor do componente. Inicializa os serviços necessários.
   * 
   * @param {StorageService} storageService Serviço de gerenciamento de armazenamento de dados.
   * @param {UtilsService} utilsService Serviço utilitário para operações diversas.
   */
  constructor(
    private storageService: StorageService,
    private utilsService: UtilsService
  ) { }

  /**
   * Método de ciclo de vida do Angular. Executado quando o componente é inicializado.
   * Popula os dados do briefing e outras empresas.
   */
  ngOnInit(): void {
    this.data = this.briefing.type as I_Sticker_Response;
    this.otherCompanies = this.data.briefing.otherCompanies!.length > 1 ? this.data.briefing.otherCompanies!.split(', ') : [];
  }

  /**
  * Obtém o perfil do usuário da sessão.
  * 
  * @returns {string | null} O perfil do usuário.
  */
  getSessionProfile() {
    return sessionStorage.getItem('userRole');
  }

  /**
   * Alterna a exibição do modal para nova versão.
   */
  toggleNewVersionModal() {
    this.isNewVersionModalOpen = !this.isNewVersionModalOpen;
  }

  /**
   * Alterna a exibição do modal para versão específica.
   * 
   * @param {I_Version_Data} [version] A versão selecionada para visualização.
   */
  toggleVersionModal(version?: I_Version_Data) {
    this.selectedVersion = version;
    this.isVersionModalOpen = !this.isVersionModalOpen;
  }

  /**
   * Método para manipulação do evento de seleção de arquivo.
   * 
   * @param {Event} event O evento de seleção de arquivo.
   */
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.artImage = fileInput.files[0];
    }
  }

  /**
   * Verifica se o usuário tem permissão para editar o briefing.
   * 
   * @returns {boolean} Verdadeiro se o usuário pode editar, falso caso contrário.
   */
  canEdit() {
    return (
      !this.storageService.isClient() &&
      this.data.project.status !== C_PROJECT_STATUS.COMPLETED.en
    );
  }

  /**
   * Verifica se o usuário é um cliente.
   * 
   * @returns {boolean} Verdadeiro se o usuário for cliente, falso caso contrário.
   */
  isClient() {
    return this.storageService.isClient();
  }

  /**
   * Altera o título do projeto associado ao briefing.
   * 
   * @returns {Observable} Retorna um Observable com a operação de alteração do título.
   */
  alterTitle() {
    return this.utilsService.alterTitle(this.data.project.id);
  }

  /**
   * Altera a data do projeto associado ao briefing.
   * 
   * @returns {Observable} Retorna um Observable com a operação de alteração da data.
   */
  alterDate() {
    return this.utilsService.alterDate(this.data.project.id);
  }

  /**
   * Altera o status do projeto associado ao briefing.
   * 
   * @returns {Observable} Retorna um Observable com a operação de alteração do status.
   */
  alterStatus() {
    return this.utilsService.alterStatus(
      this.data.project.id,
      this.data.project.status
    );
  }

  /**
   * Obtém o status atual do projeto, com base no valor do status.
   * 
   * @returns {string | null} O status traduzido do projeto.
   */
  getStatus() {
    const status = this.data.project.status;
    for (const [key, value] of Object.entries(C_PROJECT_STATUS)) {
      if (value.en === status || value.pt === status) {
        return value.pt;
      }
    }
    return null;
  }

  /**
   * Verifica se o projeto está concluído.
   * 
   * @returns {boolean} Verdadeiro se o status do projeto for "COMPLETED", falso caso contrário.
   */
  isFinished() {
    return this.data.project.status === C_PROJECT_STATUS.COMPLETED.en;
  }
}
