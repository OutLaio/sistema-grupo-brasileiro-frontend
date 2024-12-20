import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { CompanyDetails } from '../../interface/company-details';
import { StorageService } from '../../../../services/storage/storage.service';
import { E_Briefing_Type } from '../../../../shared/enums/briefing-types';

import { I_Agency_Board_Request } from '../../../../shared/interfaces/briefing/agency-board/form/agency-board-register-form';
import { I_Briefing_Request } from '../../../../shared/interfaces/project/form/briefing-form';
import { I_Project_Request } from '../../../../shared/interfaces/project/form/project-form';
import { I_Agency_Board_Data } from '../../../../shared/interfaces/briefing/agency-board/form/agency-board-form';
import { I_Company_Briefing_Form_Data } from '../../../../shared/interfaces/company/form/company-briefing-form';
import { I_Agency_Board_Routes } from '../../../../shared/interfaces/briefing/agency-board/form/agency-board-routes-form';
import { I_Agency_Board_Others_Routes } from '../../../../shared/interfaces/briefing/agency-board/form/agency-board-others-routes-form';
import { I_City_Data } from '../../../../shared/interfaces/briefing/agency-board/view/city-view';


import { CreateRequestService } from '../../services/create-request.service';
import { map } from 'rxjs';
import { DataService } from '../../../../services/data/data.service';

enum Company {
  'Rota Transportes' = 1,
  'Cidade Sol' = 2,
  'Via Metro' = 3,
  'Brasileiro' = 4,
}

/**
 * @component AgencyBoardRequestComponent
 * Componente responsável pelo gerenciamento das solicitações de placa de agências, incluindo seleção de empresas, rotas e conexões.
 */
@Component({
  selector: 'app-agency-board-request',
  templateUrl: './agency-board-request.component.html',
  styleUrls: ['./agency-board-request.component.css']
})
export class AgencyBoardRequestComponent implements OnInit {
  /**
   * Indicador de desabilitação do botão de envio.
   */
  isButtonDisabled = false;

  /**
   * Formulário de solicitação de quadro publicitário.
   */
  agencyBoardForm!: FormGroup;

  /**
   * Flag para indicar se há apenas uma empresa selecionada.
   */
  isSingleCompany: boolean = true;

  /**
   * Lista de empresas disponíveis para seleção.
   */
  companies: CompanyDetails[] = [];

  /**
   * Empresas selecionadas para o briefing.
   */
  selectedCompanies: I_Company_Briefing_Form_Data[] = [];

  /**
   * Empresas adicionais selecionadas.
   */
  selectedOthersCompanies: string[] = [];

  /**
   * Flag para indicar se uma empresa "Outras" foi selecionada.
   */
  isOtherCompanySelected = false;

  /**
   * Flag para indicar se múltiplas empresas foram selecionadas.
   */
  isOtherCompaniesSelected = false;

  /**
   * Flag para exibir os campos de empresa.
   */
  showCompanyFields: boolean = false;

  /**
   * Lista de rotas principais disponíveis.
   */
  listMainRoutes: I_City_Data[] = [];

  /**
   * Lista de conexões disponíveis.
   */
  listConnections: I_City_Data[] = [];

  // TODO: Adicionar ID para identificação da imagem
  /**
   * Lista de arquivos carregados.
   */
  files: { name: string, url: string }[] = [];

  /**
   * Construtor para inicializar o componente de painel de agência.
   * 
   * Este construtor injeta os serviços necessários no componente:
   * - `FormBuilder`: Para criar e gerenciar formulários reativos.
   * - `CreateRequestService`: Para enviar as solicitações de painel de agências.
   * - `ToastrService`: Para exibir mensagens de sucesso ou erro para o usuário.
   * - `StorageService`: Para gerenciar dados persistentes do usuário.
   * - `DataService`: Para acessar dados adicionais necessários no componente.
   * - `Router`: Para navegação entre rotas.
   * 
   * @param {FormBuilder} fb Serviço para construção de formulários reativos.
   * @param {CreateRequestService} createRequestService Serviço para criação de solicitações de painel de agências.
   * @param {ToastrService} toastrService Serviço para exibição de notificações de sucesso ou erro.
   * @param {StorageService} storageService Serviço para gerenciamento de dados persistentes.
   * @param {DataService} dataService Serviço para acesso a dados adicionais.
   * @param {Router} router Serviço para navegação entre rotas.
   */
  constructor(
    private fb: FormBuilder,
    private createRequestService: CreateRequestService,
    private toastrService: ToastrService,
    private storageService: StorageService,
    private dataService: DataService,
    private router: Router) { }


  /**
   * Método de ciclo de vida do Angular.
   * Inicialização do componente. Carrega as cidades e configura o formulário.
   */
  ngOnInit(): void {
    this.dataService.getCities().pipe(
      map(cities => cities.data!.map(city => ({ id: city.id, name: city.name })))
    ).subscribe(cities => {
      this.listMainRoutes = cities.sort((a, b) => { return a.name.localeCompare(b.name) });
      this.listConnections = cities;
    });

    this.agencyBoardForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      signLocation: new FormControl('', [Validators.required]),
      length: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')]),
      height: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')]),
      sharedCompany: new FormControl('', [Validators.required]),
      selectedCompany: new FormControl('', [Validators.required]),
      mainRoute: new FormControl(''),
      connections: new FormControl(''),
      observation: new FormControl(''),
      otherText: new FormControl(''),
      othersText: new FormControl(''),
      agencyBoardType: new FormControl('', [Validators.required]),
      boardType: new FormControl('')
    });
    this.agencyBoardForm.get('agencyBoardType')?.valueChanges.subscribe(value => {
      if (value === '2') {
        this.agencyBoardForm.get('boardType')?.setValidators([Validators.required]);
      } else {
        this.agencyBoardForm.get('boardType')?.clearValidators();
      }
      this.agencyBoardForm.get('boardType')?.updateValueAndValidity();
    });
  }

  /**
   * Métodos de acesso aos campos do formulário.
   */
  get title() { return this.agencyBoardForm.get('title')!; }
  get length() { return this.agencyBoardForm.get('length')!; }
  get height() { return this.agencyBoardForm.get('height')!; }
  get description() { return this.agencyBoardForm.get('description')!; }
  get signLocation() { return this.agencyBoardForm.get('signLocation')!; }
  get agencyBoardType() { return this.agencyBoardForm.get('agencyBoardType')!; }
  get boardType() { return this.agencyBoardForm.get('boardType')!; }
  get sharedCompany() { return this.agencyBoardForm.get('sharedCompany')!; }
  get selectedCompany() { return this.agencyBoardForm.get('selectedCompany')!; }
  get mainRoute() { return this.agencyBoardForm.get('mainRoute')!; }
  get connection() { return this.agencyBoardForm.get('connection')!; }
  get observation() { return this.agencyBoardForm.get('observation')!; }


  /**
   * Método para limpar os campos do formulário.
   */
  clearForm() {
    this.agencyBoardForm.reset();
    this.companies = [];
    this.files = [];
    this.showCompanyFields = false;
    this.isSingleCompany = true;
    this.isOtherCompanySelected = false;
    this.isOtherCompanySelected = false;
    this.isOtherCompaniesSelected = false;
    this.selectedCompanies = [];
    this.selectedOthersCompanies = [];
  }

  /**
   * Método para alterar o tipo de seleção de empresa (única ou múltiplas).
   * @param type Tipo de seleção (single ou multiple).
   */
  onCompanyChange(type: string) {
    this.isSingleCompany = (type === 'single');
    this.companies = [];
    this.showCompanyFields = true;

    if (this.isSingleCompany) {
      this.agencyBoardForm.patchValue({ selectedCompany: null, otherText: '' });
      this.agencyBoardForm.patchValue({ mainRoute: null, connections: null });

    } else {
      this.agencyBoardForm.patchValue({ mainRoute: null, connections: null });
      this.agencyBoardForm.patchValue({ selectedCompany: null, othersText: '' });
    }
  }

  /**
   * Método para atualizar o nome da empresa selecionada.
   * @param selectionType Tipo de seleção.
   * @param company Nome da empresa.
   */
  updateCompanyName(selectionType: number, company: string) {
    this.isOtherCompanySelected = !this.isOtherCompanySelected;
    this.isOtherCompanySelected = !this.isOtherCompanySelected;
    if (selectionType === 1) {
      this.companies = [{ name: company, companyMainRoutes: [], companyConnections: [], isCustom: false }];
    } else {
      const existingCompany = this.companies.find(c => c.name === company);
      if (existingCompany) {
        this.companies = this.companies.filter(c => c.name !== company);
      } else {
        this.companies.push({ name: company, companyMainRoutes: [], companyConnections: [], isCustom: false });
      }
    }
  }

  /**
   * Método para lidar com a seleção da empresa "Outras".
   */
  onOtherCompany() {
    this.isOtherCompanySelected = !this.isOtherCompanySelected;
    this.isOtherCompanySelected = !this.isOtherCompanySelected;
    if (this.companies.length > 0)
      this.companies = [];
    this.agencyBoardForm.get('otherText')?.setValue('');
  }

  /**
   * Método para adicionar uma nova empresa "Outras".
   */
  updateOtherCompany() {
    const otherValue = this.agencyBoardForm.get('otherText')?.value;
    this.companies = [];
    this.companies.push({ name: otherValue, companyMainRoutes: [], companyConnections: [], isCustom: true });
    this.agencyBoardForm.get('otherText')?.reset();
    this.agencyBoardForm.get('otherText')?.reset();
  }

  /**
   * Método para confirmar a adição de uma empresa "Outras".
   */
  confirmOtherSingleCompany() {
    const otherCompany = this.agencyBoardForm.get('otherText')?.value;
    if (otherCompany && !this.companies.some(c => c.name === otherCompany)) {
      this.companies.push({ name: otherCompany, companyMainRoutes: [], companyConnections: [], isCustom: true });
      this.agencyBoardForm.get('otherText')?.reset();
      this.isOtherCompanySelected = false;
      this.isOtherCompanySelected = false;
    }

  }


  /**
   * Método para lidar com a seleção de múltiplas empresas "Outras".
   */
  onOthersCompanies() {
    this.isOtherCompaniesSelected = !this.isOtherCompaniesSelected;
    if (!this.isOtherCompaniesSelected) {
      this.agencyBoardForm.get('othersText')?.setValue('');
      this.companies = this.companies.filter(company => company.name !== 'Outras');
    }
  }

  /**
   * Método para atualizar as empresas "Outras".
   */
  updateOthersCompanies() {
    const otherValue = this.agencyBoardForm.get('othersText')?.value;
    if (otherValue) {
      const companyIndex = this.companies.findIndex(company => company.name === 'Outras');
      if (companyIndex >= 0) {
        this.companies[companyIndex].name = otherValue;
        this.agencyBoardForm.get('othersText')?.reset();
        this.agencyBoardForm.get('othersText')?.reset();
      } else {
        this.companies.push({ name: otherValue, companyMainRoutes: [], companyConnections: [], isCustom: true });
        this.agencyBoardForm.get('othersText')?.reset();
        this.agencyBoardForm.get('othersText')?.reset();
      }
    }
  }

  /**
   * Método para confirmar a adição de múltiplas empresas "Outras".
   */
  confirmOtherMultiCompany() {
    const otherCompany = this.agencyBoardForm.get('othersText')?.value;
    if (otherCompany && !this.companies.some(c => c.name === otherCompany)) {
      this.companies.push({
        name: otherCompany,
        companyMainRoutes: [],
        companyConnections: [],
        isCustom: true
      });
      this.agencyBoardForm.get('othersText')?.reset();
      this.isOtherCompaniesSelected = false;
    }
  }

  /**
   * Método para remover uma empresa selecionada.
   * @param companyName Nome da empresa a ser removida.
   */
  removeCompany(companyName: string) {
    const companyIndex = this.companies.findIndex(c => c.name === companyName && c.isCustom);
    if (companyIndex >= 0) {
      this.companies.splice(companyIndex, 1);
    }
  }

  /**
   * Método para adicionar uma rota principal a uma empresa.
   * @param companyName Nome da empresa.
   */
  addMainRoute(companyName: string) {
    const selectedMainRoute: I_City_Data | null = this.agencyBoardForm.get('mainRoute')?.value;

    if (selectedMainRoute) {
      const company = this.companies.find(c => c.name === companyName);
      if (company) {
        const routeExists = company.companyMainRoutes.some(route => route.id === selectedMainRoute.id);
        if (!routeExists) {
          company.companyMainRoutes.push(selectedMainRoute);
          this.agencyBoardForm.get('mainRoute')?.reset();
        }
      }
    }
  }


  /**
   * Método para remover uma rota principal de uma empresa.
   * @param companyName Nome da empresa.
   * @param routeIdToRemove ID da rota a ser removida.
   */
  removeMainRoute(companyName: string, routeIdToRemove: string) {
    const company = this.companies.find(c => c.name === companyName);
    if (company) {
      const index = company.companyMainRoutes.findIndex(route => route.id === routeIdToRemove);
      if (index !== -1) {
        company.companyMainRoutes.splice(index, 1);
      }
    }
  }


  /**
   * Método para adicionar uma conexão a uma empresa.
   * @param companyName Nome da empresa.
   */
  addConnection(companyName: string) {
    const selectedConnection: I_City_Data | null = this.agencyBoardForm.get('connections')?.value;

    if (selectedConnection) {
      const company = this.companies.find(c => c.name === companyName);
      if (company) {
        const connectionExists = company.companyConnections.some(connection => connection.id === selectedConnection.id);
        if (!connectionExists) {
          company.companyConnections.push(selectedConnection);
          this.agencyBoardForm.get('connections')?.reset();
        }
      }
    }
  }



  /**
   * Método para remover uma conexão de uma empresa.
   * @param companyName Nome da empresa.
   * @param connectionIdToRemove ID da conexão a ser removida.
   */
  removeConnection(companyName: string, connectionIdToRemove: string) {
    const company = this.companies.find(c => c.name === companyName);
    if (company) {
      const index = company.companyConnections.findIndex(connection => connection.id === connectionIdToRemove);
      if (index !== -1) {
        company.companyConnections.splice(index, 1);
      }
    }
  }


  /**
   * Método para carregar arquivos.
   * @param newFiles Lista de arquivos carregados.
   */
  onFilesLoaded(newFiles: { name: string, url: string }[]): void {
    this.files = newFiles;
  }

  /**
   * Método para separar as empresas selecionadas.
   */
  separateCompanies() {
    this.selectedCompanies = this.companies.filter(company => !company.isCustom).map(company => {
      const companyName = company.name as keyof typeof Company;
      const companyInt: I_Company_Briefing_Form_Data = {
        idCompany: Company[companyName as keyof typeof Company],
      };
      return companyInt;
    });

    this.selectedOthersCompanies = this.companies.filter(company => company.isCustom).map(company => company.name);
  }

  /**
   * Método para preparar os dados para envio.
   * @returns Dados preparados para o envio.
   */
  prepareSubmit(): I_Agency_Board_Request {
    this.separateCompanies();

    const projectForm: I_Project_Request = {
      idClient: this.storageService.getUserId(),
      title: this.title.value,
    }

    const briefingForm: I_Briefing_Request = {
      detailedDescription: this.agencyBoardForm.get('description')?.value,
      companies: this.selectedCompanies,
      otherCompany: this.selectedOthersCompanies.join(', '),
      idBriefingType: E_Briefing_Type.ITINERARIOS.id,
      measurement: {
        length: this.length.value,
        height: this.height.value,
      }
    }

    const companyMainRoutes: I_Agency_Board_Routes[] = this.companies.flatMap(company => {
      if (!company.isCustom) {
        return [{
          idCompany: Company[company.name as keyof typeof Company],
          idCities: company.companyMainRoutes.map(route => route.id),
          type: 'main',
        }];
      } else {
        return [];
      }
    });


    const connections: I_Agency_Board_Routes[] = this.companies.flatMap(company => {
      if (!company.isCustom) {
        return [{
          idCompany: Company[company.name as keyof typeof Company],
          idCities: company.companyConnections.map(connection => connection.id),
          type: 'connection',
        }];
      } else {
        return [];
      }
    });

    const agencyBoardRoutes: I_Agency_Board_Routes[] = [...companyMainRoutes, ...connections];

    const mainOthersRoutes: I_Agency_Board_Others_Routes[] = this.companies.flatMap(company => {
      if (company.isCustom) {
        return company.companyMainRoutes.map(route => ({
          company: company.name,
          city: route.name,
          type: 'main',
        }));
      } else {
        return [];
      }
    });

    const othersConnections: I_Agency_Board_Others_Routes[] = this.companies.flatMap(company => {
      if (company.isCustom) {
        return company.companyConnections.map(route => ({
          company: company.name,
          city: route.name,
          type: 'connection',
        }));
      } else {
        return [];
      }
    });

    const agencyBoardOthersRoutes: I_Agency_Board_Others_Routes[] = [...mainOthersRoutes, ...othersConnections];

    const bAgencyBoardsForm: I_Agency_Board_Data = {
      idAgencyBoardType: this.agencyBoardType?.value.toString(),
      boardLocation: this.signLocation?.value,
      observation: this.observation!.value,
      idBoardType: this.boardType?.value.toString(),
      routes: agencyBoardRoutes,
      othersRoutes: agencyBoardOthersRoutes,
    }

    return { projectForm: projectForm, briefingForm: briefingForm, bAgencyBoardsForm: bAgencyBoardsForm }
  }


  /**
   * Valida se todos os campos necessários em cada empresa foram preenchidos corretamente.
   * 
   * Este método verifica se as empresas têm os seguintes campos obrigatórios preenchidos:
   * - `name`: nome da empresa.
   * - `companyMainRoutes`: deve conter ao menos uma rota principal.
   * - `companyConnections`: deve conter ao menos uma conexão.
   * - `isCustom`: deve ser do tipo booleano.
   * 
   * @returns {boolean} Retorna `true` se todas as empresas passarem na validação, caso contrário, retorna `false`.
   */
  validateCompanies(): boolean {
    return this.companies.every(company =>
      company.name &&
      company.companyMainRoutes.length > 0 &&
      company.companyConnections.length > 0 &&
      typeof company.isCustom === 'boolean'
    );
  }

  /**
   * Envia a solicitação de criação do painel de agência.
   * 
   * Este método verifica se o formulário está válido e se a validação das empresas foi concluída com sucesso.
   * Se algum dos requisitos falhar, uma mensagem de erro será exibida. Caso contrário, os dados serão preparados e enviados ao servidor.
   * Após o envio bem-sucedido, a página será recarregada após um tempo de espera.
   * 
   * @returns {void} Nada é retornado.
   */
  submit() {
    if (this.agencyBoardForm.invalid || !this.validateCompanies()) {
      this.toastrService.error("Erro ao realizar solicitação. Verifique se os campos estão preenchidos corretamente.");
      this.isButtonDisabled = true;
      setTimeout(() => {
        this.isButtonDisabled = false;
      }, 3000);
      return;
    }
    const requestData = this.prepareSubmit();
    this.createRequestService.submitAgencyBoardRequest(requestData)
      .subscribe({
        next: (response) => {
          this.toastrService.success(response.message);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        },
        error: (err: HttpErrorResponse) => {
          this.toastrService.error(err.error.message);
        }
      });
    this.isButtonDisabled = true;
    setTimeout(() => {
      this.isButtonDisabled = false;
    }, 3000);
  }
}
