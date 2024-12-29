import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { I_Api_Response } from '../../shared/interfaces/api-response';
import { I_Profile_View_Data } from '../../shared/interfaces/profile/view/profile-view';
import { I_Briefing_Type_Data } from '../../shared/interfaces/project/view/briefing-type-view';
import { I_Agency_Board_Type_Data } from '../../shared/interfaces/briefing/agency-board/view/agency-board-type-view';
import { I_Board_Type_Data } from '../../shared/interfaces/briefing/agency-board/view/board-type-view';
import { I_City_Data } from '../../shared/interfaces/briefing/agency-board/view/city-view';
import { I_Company_Data } from '../../shared/interfaces/company/view/company-view';
import { I_Sticker_Type_Data } from '../../shared/interfaces/briefing/sticker/view/sticker-type-viem';
import { I_Sticker_Information_Type_Data } from '../../shared/interfaces/briefing/sticker/view/sticker-information-type-view';
import { I_Material_Data } from '../../shared/interfaces/briefing/signpost/view/material-view';

/**
 * Serviço `DataService`
 * 
 * Responsável por realizar chamadas HTTP para recuperar dados de perfis, tipos de briefing, tipos de placas,
 * cidades, empresas, tipos de adesivos, informações sobre adesivos e materiais utilizados no sistema.
 */
@Injectable({
  providedIn: 'root',
})
export class DataService {
  /**
   * URL base para as requisições à API.
   */
  private urlBase = 'http://localhost:8080/api/v1/data';

  /**
   * Construtor do serviço `DataService`.
   * 
   * @param http - Instância do serviço HttpClient para realizar requisições HTTP.
   */
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Recupera a lista de perfis.
   * 
   * @returns Observable com a resposta da API contendo os dados dos perfis.
   */
  getProfiles() {
    return this.http.get<I_Api_Response<I_Profile_View_Data[]>>(`${this.urlBase}/profiles`);
  }

  /**
   * Recupera a lista de tipos de briefing.
   * 
   * @returns Observable com a resposta da API contendo os dados dos tipos de briefing.
   */
  getBriefingTypes() {
    return this.http.get<I_Api_Response<I_Briefing_Type_Data[]>>(`${this.urlBase}/briefing-types`);

  }

  /**
   * Recupera a lista de tipos de placas de agência.
   * 
   * @returns Observable com a resposta da API contendo os dados dos tipos de placas de agência.
   */
  getAgencyBoardTypes() {
    return this.http.get<I_Api_Response<I_Agency_Board_Type_Data[]>>(
      `${this.urlBase}/agency-board-types`
    );
  }

  /**
   * Recupera a lista de tipos de placas.
   * 
   * @returns Observable com a resposta da API contendo os dados dos tipos de placas.
   */
  getBoardTypes() {
    return this.http.get<I_Api_Response<I_Board_Type_Data[]>>(
      `${this.urlBase}/board-types`
    );
  }

  /**
   * Recupera a lista de cidades.
   * 
   * @returns Observable com a resposta da API contendo os dados das cidades.
   */
  getCities() {
    return this.http.get<I_Api_Response<I_City_Data[]>>(
      `${this.urlBase}/cities`
    );
  }

  /**
   * Recupera a lista de empresas.
   * 
   * @returns Observable com a resposta da API contendo os dados das empresas.
   */
  getCompanies() {
    return this.http.get<I_Api_Response<I_Company_Data[]>>(
      `${this.urlBase}/companies`
    );
  }

  /**
   * Recupera a lista de tipos de adesivos.
   * 
   * @returns Observable com a resposta da API contendo os dados dos tipos de adesivos.
   */
  getStickerTypes() {
    return this.http.get<I_Api_Response<I_Sticker_Type_Data[]>>(
      `${this.urlBase}/sticker-types`
    );
  }

  /**
   * Recupera a lista de informações sobre tipos de adesivos.
   * 
   * @returns Observable com a resposta da API contendo os dados das informações sobre tipos de adesivos.
   */
  getStickerInformationTypes() {
    return this.http.get<I_Api_Response<I_Sticker_Information_Type_Data[]>>(
      `${this.urlBase}/sticker-information-types`
    );
  }
  
  /**
   * Recupera a lista de materiais.
   * 
   * @returns Observable com a resposta da API contendo os dados dos materiais.
   */
  getMaterials() {
    return this.http.get<I_Api_Response<I_Material_Data[]>>(
      `${this.urlBase}/materials`
    );
  }
}
