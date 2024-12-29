import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { I_Agency_Board_Request } from '../../../shared/interfaces/briefing/agency-board/form/agency-board-register-form';
import { I_Signpost_Request } from '../../../shared/interfaces/briefing/signpost/form/signpost-register-form';
import { I_Stickers_Request } from '../../../shared/interfaces/briefing/stickers/form/stickers-register-form';

import { StorageService } from '../../../services/storage/storage.service';
import { I_Api_Response } from '../../../shared/interfaces/api-response';
import { I_Sticker_Request } from '../../../shared/interfaces/briefing/sticker/form/register-sticker-form';

/**
 * Serviço responsável por criar solicitações (requests) relacionadas a diferentes tipos de briefings,
 * como placas de sinalização, placas de agência e adesivos.
 */
@Injectable({
  providedIn: 'root',
})
export class CreateRequestService {
  /**
   * URL base para as chamadas à API.
   */
  // private readonly apiUrl = 'http://54.200.23.253:8000/api/v1';
  private readonly apiUrl = 'http://localhost:8080/api/v1';

  /**
   * Token de autenticação JWT.
   */
  private readonly authToken = this.storageService.getToken();

  /**
   * ID do usuário autenticado.
   */
  private readonly idUser = this.storageService.getUserId();

  /**
   * Construtor do serviço.
   * @param http Serviço Angular para realizar chamadas HTTP.
   * @param storageService Serviço para gerenciar token e informações do usuário.
   */
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  /**
   * Obtém os cabeçalhos HTTP necessários para autenticação.
   * Inclui o token de autenticação no cabeçalho `Authorization`.
   * @returns Um objeto `HttpHeaders` configurado.
   */
  private getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    });
  }

  /**
   * Envia uma solicitação de criação de placa de sinalização (signpost).
   * @param req Objeto contendo os dados da solicitação (`I_Signpost_Request`).
   * @returns Um `Observable` contendo a resposta da API.
   */
  submitSignpostRequest(req: I_Signpost_Request) {
    const headers = this.getHeaders();
    return this.http.post<I_Api_Response<void>>(
      `${this.apiUrl}/signposts`,
      req,
      {
        headers,
        withCredentials: true,
      }
    );
  }

  /**
   * Envia uma solicitação de criação de agência (agency board).
   * @param req Objeto contendo os dados da solicitação (`I_Agency_Board_Request`).
   * @returns Um `Observable` contendo a resposta da API.
   */
  submitAgencyBoardRequest(req: I_Agency_Board_Request) {
    const headers = this.getHeaders();
    return this.http.post<I_Api_Response<void>>(
      `${this.apiUrl}/agency-boards`,
      req,
      {
        headers,
        withCredentials: true,
      }
    );
  }

  /**
   * Envia uma solicitação de criação de adesivos (stickers).
   * @param req Objeto contendo os dados da solicitação (`I_Stickers_Request`).
   * @returns Um `Observable` contendo a resposta da API.
   */
  submitStickersRequest(req: I_Stickers_Request) {
    const headers = this.getHeaders();
    return this.http.post<I_Api_Response<void>>(
      `${this.apiUrl}/stickers`,
      req,
      {
        headers,
        withCredentials: true,
      }
    );
  }
}
