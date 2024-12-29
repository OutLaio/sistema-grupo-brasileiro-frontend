import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { I_Dialog_Box_Response } from '../../../../shared/interfaces/dialog-box/view/dialog-box-view';
import { I_Dialog_Box_Request } from '../../../../shared/interfaces/dialog-box/form/dialog-box-form';
import { I_Assign_Collaborator_Request } from '../../../../shared/interfaces/project/form/assign-collaborator-form';
import { I_New_Version_Request } from '../../../../shared/interfaces/project/form/new-version-form';
import { I_Version_Data } from '../../../../shared/interfaces/project/view/version-view';
import { I_Approve_Request } from '../../../../shared/interfaces/project/form/approve-form';
import { I_Alter_Title_Request } from '../../../../shared/interfaces/project/form/alter-title-form';
import { I_Alter_Date_Request } from '../../../../shared/interfaces/project/form/alter-date-form';
import { I_Api_Response } from '../../../../shared/interfaces/api-response';
import { I_Any_Briefing } from '../../../../shared/interfaces/briefing/any-briefing';
import { ListCollaboratorsService } from '../../../collaborator/list-collaborators/services/list-collaborators.service';
import { I_Alter_Status_Request } from '../../../../shared/interfaces/project/form/alter-status-form';
import { I_Upload_Response } from '../../../../shared/interfaces/upload/upload-file-view';
import { CookieService } from 'ngx-cookie-service';

/**
 * Serviço responsável por interagir com a API para obter e modificar informações detalhadas sobre solicitações de projeto.
 * Ele realiza operações como obter detalhes de uma solicitação, adicionar diálogos, atribuir colaboradores, e gerenciar versões e status de projetos.
 */
@Injectable({
  providedIn: 'root',
})
export class RequestDetailsService {

  /** URL base para as requisições da service. */
  // private baseUrl = 'http://54.200.23.253:8000/api/v1';
  private baseUrl = 'http://localhost:8080/api/v1';

  /**
   * Construtor do serviço RequestDetailsService.
   * 
   * @param {HttpClient} http - Serviço HTTP do Angular para realizar requisições à API.
   * @param {ListCollaboratorsService} collaboratorsService - Serviço para manipular dados dos colaboradores.
   * @param {CookieService} cookieService - Serviço para acessar cookies no navegador.
   */
  constructor(
    private http: HttpClient,
    private collaboratorsService: ListCollaboratorsService,
    private cookieService: CookieService
  ) { }

  /**
   * Obtém os cabeçalhos de autorização usando o token de autenticação armazenado no cookie.
   * 
   * @returns {HttpHeaders} - Cabeçalhos de requisição com o token de autenticação.
   */
  private getHeaders() {
    const token = this.cookieService.get('auth-token') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  /**
    * Obtém os detalhes de uma solicitação de projeto usando seu ID.
    * 
    * @param {string} id - ID do projeto.
    * @returns {Observable<I_Api_Response<I_Any_Briefing>>} - Observable contendo a resposta da API com os detalhes do briefing.
  */
  getRequestDetailsById(id: string) {
    const url = `${this.baseUrl}/projects/${id}`;
    return this.http.get<I_Api_Response<I_Any_Briefing>>(url, {
      headers: this.getHeaders(),
    });
  }

  /**
   * Obtém todos os diálogos associados a uma solicitação de projeto usando seu ID.
   * 
   * @param {string} id - ID da solicitação.
   * @returns {Observable<I_Api_Response<I_Dialog_Box_Response[]>>} - Observable contendo a lista de diálogos associados.
   * 
   */
  getDialoguesByRequestId(id: string) {
    const url = `${this.baseUrl}/dialogs/briefing/${id}`;
    return this.http.get<I_Api_Response<I_Dialog_Box_Response[]>>(url, {
      headers: this.getHeaders(),
    });
  }

  /**
   * Cria um novo diálogo associado a uma solicitação de projeto.
   * 
   * @param {I_Dialog_Box_Request} request - Dados do diálogo a ser criado.
   * @returns {Observable<I_Api_Response<I_Dialog_Box_Response>>} - Observable contendo a resposta da API.
   */
  setNewDialogue(request: I_Dialog_Box_Request) {
    const url = `${this.baseUrl}/dialogs`;
    return this.http.post<I_Api_Response<I_Dialog_Box_Response>>(url, request, {
      headers: this.getHeaders(),
    });
  }

  /**
   * Obtém a lista de colaboradores.
   * 
   * @param {number} page - Número da página.
   * @param {number} size - Número de itens por página.
   * @returns {Observable<I_Api_Response<I_Collaborator[]>>} - Observable contendo a lista de colaboradores.
   */
  getAllCollaborators(page: number, size: number) {
    return this.collaboratorsService.getAllCollaborators(page, size);
  }

  /**
   * Atribui um colaborador a um projeto específico.
   * 
   * @param {string} id - ID do projeto.
   * @param {I_Assign_Collaborator_Request} request - Dados do colaborador a ser atribuído.
   * @returns {Observable<I_Api_Response<void>>} - Observable da resposta da API.
   *
   */
  assignCollaborator(id: string, request: I_Assign_Collaborator_Request) {
    const url = `${this.baseUrl}/projects/${id}/assignCollaborator`;
    return this.http.put<I_Api_Response<void>>(url, request, {
      headers: this.getHeaders(),
    });
  }

  /**
   * Cria uma nova versão de um projeto.
   * 
   * @param {string} id - ID do projeto.
   * @param {I_New_Version_Request} request - Dados da nova versão.
   * @returns {Observable<I_Api_Response<I_Version_Data>>} - Observable com os dados da versão criada.
   */
  newVersion(id: string, request: I_New_Version_Request) {
    const url = `${this.baseUrl}/projects/${id}/newVersion`;
    return this.http.put<I_Api_Response<I_Version_Data>>(url, request, {
      headers: this.getHeaders(),
    });
  }

  /**
   * Aprova um projeto por um supervisor.
   * 
   * @param {string} projectId - ID do projeto.
   * @param {I_Approve_Request} request - Dados de aprovação do supervisor.
   * @returns {Observable<I_Api_Response<I_Version_Data>>} - Observable com a versão aprovada.
   */
  supervisorApproval(projectId: string, request: I_Approve_Request) {
    const url = `${this.baseUrl}/projects/${projectId}/approve/supervisor`;
    return this.http.put<I_Api_Response<I_Version_Data>>(url, request, {
      headers: this.getHeaders(),
    });
  }

  /**
   * Aprova um projeto por um cliente.
   * 
   * @param {string} projectId - ID do projeto.
   * @param {I_Approve_Request} request - Dados de aprovação do cliente.
   * @returns {Observable<I_Api_Response<I_Version_Data>>} - Observable com a versão aprovada.
   */
  clientApproval(projectId: string, request: I_Approve_Request) {
    const url = `${this.baseUrl}/projects/${projectId}/approve/client`;
    return this.http.put<I_Api_Response<I_Version_Data>>(url, request, {
      headers: this.getHeaders(),
    });
  }

  /**
   * Atualiza o título de um projeto.
   * 
   * @param {string} id - ID do projeto.
   * @param {I_Alter_Title_Request} request - Dados do novo título.
   * @returns {Observable<I_Api_Response<void>>} - Observable da resposta da API.
   */
  updateTitle(id: string, request: I_Alter_Title_Request) {
    const url = `${this.baseUrl}/projects/${id}/alterTitle`;
    return this.http.put<I_Api_Response<void>>(url, request, {
      headers: this.getHeaders(),
    });
  }

  /**
   * Atualiza a data de um projeto.
   * 
   * @param {string} id - ID do projeto.
   * @param {I_Alter_Date_Request} request - Dados da nova data.
   * @returns {Observable<I_Api_Response<void>>} - Observable da resposta da API.
   */
  updateDate(id: string, request: I_Alter_Date_Request) {
    const url = `${this.baseUrl}/projects/${id}/alterDate`;
    return this.http.put<I_Api_Response<void>>(url, request, {
      headers: this.getHeaders(),
    });
  }

  /**
   * Atualiza o status de um projeto.
   * 
   * @param {string} id - ID do projeto.
   * @param {I_Alter_Status_Request} request - Dados do novo status.
   * @returns {Observable<I_Api_Response<void>>} - Observable da resposta da API.
   */
  updateStatus(id: string, request: I_Alter_Status_Request) {
    const url = `${this.baseUrl}/projects/${id}/alterStatus`;
    return this.http.put<I_Api_Response<void>>(url, request, {
      headers: this.getHeaders(),
    });
  }

  /**
   * Verifica se um projeto tem produção (confecção) associada.
   * 
   * @param {string} id - ID do projeto.
   * @param {boolean} hasConfection - Indicador se há produção.
   * @returns {Observable<I_Api_Response<void>>} - Observable da resposta da API.
   */
  hasProduction(id: string, hasConfection: boolean) {
    const url = `${this.baseUrl}/projects/${id}/hasProduction?hasConfection=${hasConfection}`;
    return this.http.put<I_Api_Response<void>>(url, null, {
      headers: this.getHeaders(),
    });
  }

  /**
   * Finaliza um projeto.
   * 
   * @param {string} id - ID do projeto.
   * @returns {Observable<I_Api_Response<void>>} - Observable da resposta da API.
   */
  finishProject(id: string) {
    const url = `${this.baseUrl}/projects/${id}/finish`;
    return this.http.put<I_Api_Response<void>>(url, null, {
      headers: this.getHeaders(),
    });
  }

  /**
   * Faz o upload de um arquivo.
   * 
   * @param {File} file - Arquivo a ser enviado.
   * @returns {Observable<I_Api_Response<I_Upload_Response>>} - Observable com a resposta do upload.
   */
  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<I_Api_Response<I_Upload_Response>>(
      `${this.baseUrl}/file/uploadFile`,
      formData,
      { headers: this.getHeaders() }
    );
  }
}
