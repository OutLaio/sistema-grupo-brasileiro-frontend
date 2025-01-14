import { Component, Input, OnInit } from '@angular/core';
import { I_Signpost_Response } from '../../../../shared/interfaces/briefing/signpost/view/signpost-detailed-view';
import { I_Any_Briefing } from '../../../../shared/interfaces/briefing/any-briefing';
import { I_Version_Data } from '../../../../shared/interfaces/project/view/version-view';
import { StorageService } from '../../../../services/storage/storage.service';
import { UtilsService } from '../../services/utils/utils.service';
import { C_PROJECT_STATUS } from '../../../../shared/enums/project-status';

/**
 * Componente responsável por exibir informações detalhadas sobre o briefing de placas de sinalização
 * e permitir a alteração de título, status e data, além de gerenciar versões.
 */
@Component({
  selector: 'app-signpost',
  templateUrl: './signpost.component.html',
  styleUrl: './signpost.component.css',
})
export class SignpostComponent implements OnInit {
  /**
   * Briefing associado ao signpost.
   * @type {I_Any_Briefing}
   */
  @Input() briefing!: I_Any_Briefing;
  /**
   * Dados detalhados do signpost.
   * @type {I_Signpost_Response}
   */
  data!: I_Signpost_Response;
  /**
   * Lista de outras empresas relacionadas ao signpost.
   * @type {string[]}
   */
  otherCompanies!: string[];
  /**
   * Flag para controle de abertura/fechamento do modal de nova versão.
   * @type {boolean}
   */
  isNewVersionModalOpen = false;
  /**
   * Flag para controle de abertura/fechamento do modal de versão.
   * @type {boolean}
   */
  isVersionModalOpen = false;
  /**
     * Título da arte do signpost.
     * @type {string}
     */
  artTitle: string = '';
  /**
   * Descrição da arte do signpost.
   * @type {string}
   */
  artDescription: string = '';
  /**
   * Imagem da arte do signpost.
   * @type {File | null}
   */
  artImage: File | null = null;
  /**
     * Versão selecionada.
     * @type {I_Version_Data | undefined}
     */
  selectedVersion: I_Version_Data | undefined;

  /**
   * Construtor do componente. Inicializa os serviços de armazenamento e utilitários.
   * @param {StorageService} storageService Serviço de armazenamento de dados (ex.: cookies, sessão).
   * @param {UtilsService} utilsService Serviço utilitário para funções gerais.
   */
  constructor(
    private storageService: StorageService,
    private utilsService: UtilsService
  ) { }

  /**
   * Ciclo de vida do componente angular chamado ao inicializar o componente.
   * Ele processa os dados do briefing, extraindo as outras empresas e armazenando-os em uma lista.
   */
  ngOnInit(): void {
    this.data = this.briefing.type as I_Signpost_Response;
    this.otherCompanies = this.data.briefing.otherCompanies!.length > 1 ? this.data.briefing.otherCompanies!.split(', ') : [];
  }

  /**
   * Retorna o nível do usuário da sessão.
   * @returns {string} nível do usuário.
   */
  getSessionProfile() {
    return this.storageService.getUserRole(); // Alterado para buscar o papel do usuário dos cookies
  }

  /**
   * Alterna o estado de visibilidade do modal para criar uma nova versão.
   */
  toggleNewVersionModal() {
    this.isNewVersionModalOpen = !this.isNewVersionModalOpen;
  }

  /**
   * Alterna o estado de visibilidade do modal para exibir uma versão específica.
   * @param {I_Version_Data} [version] Dados da versão a ser exibida no modal.
   */
  toggleVersionModal(version?: I_Version_Data) {
    this.selectedVersion = version;
    this.isVersionModalOpen = !this.isVersionModalOpen;
  }

  /**
   * Método chamado ao selecionar um arquivo (imagem) para a arte do signpost.
   * Armazena o arquivo selecionado na variável `artImage`.
   * @param {Event} event Evento disparado ao selecionar o arquivo.
   */
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.artImage = fileInput.files[0];
    }
  }

  /**
   * Verifica se o usuário tem permissão para editar o projeto.
   * Não permite edição para clientes ou se o projeto já está concluído.
   * @returns {boolean} Retorna `true` se o usuário puder editar, `false` caso contrário.
   */
  canEdit() {
    return (
      !this.storageService.isClient() &&
      this.data.project.status !== C_PROJECT_STATUS.COMPLETED.en
    );
  }

  /**
   * Verifica se o usuário é um cliente.
   * @returns {boolean} Retorna `true` se o usuário for um cliente, `false` caso contrário.
   */
  isClient() {
    return this.storageService.isClient();
  }

  /**
   * Altera o título do projeto, usando o serviço de utilitários.
   * @returns {string} Novo título alterado.
   */
  alterTitle() {
    return this.utilsService.alterTitle(this.data.project.id);
  }

  /**
   * Altera a data do projeto, usando o serviço de utilitários.
   * @returns {string} Nova data alterada.
   */
  alterDate() {
    return this.utilsService.alterDate(this.data.project.id);
  }

  /**
   * Altera o status do projeto, usando o serviço de utilitários.
   * @returns {string} Novo status alterado.
   */
  alterStatus() {
    return this.utilsService.alterStatus(
      this.data.project.id,
      this.data.project.status
    );
  }

  /**
   * Obtém a descrição do status do projeto em português, a partir do código de status.
   * @returns {string | null} Descrição do status do projeto em português, ou `null` se não encontrado.
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
   * Verifica se o projeto está concluído com base no status.
   * @returns {boolean} Retorna `true` se o projeto estiver concluído, `false` caso contrário.
   */
  isFinished() {
    return this.data.project.status === C_PROJECT_STATUS.COMPLETED.en;
  }
}
