import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyDetails } from '../../interface/company-details';
import { CreateRequestService } from '../../services/create-request.service';
import { ToastrService } from 'ngx-toastr';
import { I_Signpost_Request } from '../../../../shared/interfaces/briefing/signpost/form/signpost-register-form';
import { StorageService } from '../../../../services/storage/storage.service';
import { E_Briefing_Type } from '../../../../shared/enums/briefing-types';
import { I_Company_Briefing_Form_Data } from '../../../../shared/interfaces/company/form/company-briefing-form';
import { HttpErrorResponse } from '@angular/common/http';

enum Company {
  'Rota Transportes' = 1,
  'Cidade Sol' = 2,
  'Via Metro' = 3,
  'Brasileiro' = 4,
  'Cidade Real' = 5,
  'Pauma' = 6,
}

/**
 * Componente responsável pela criação de solicitações de sinalização.
 * Permite o preenchimento de um formulário com informações sobre a sinalização, incluindo dados do projeto, tipo de material, empresas selecionadas e outras informações.
 * O formulário valida os campos antes de enviar a solicitação para o serviço de criação de requisição.
 */
@Component({
  selector: 'app-signpost-request',
  templateUrl: './signpost-request.component.html',
  styleUrl: './signpost-request.component.css'
})
export class SignpostRequestComponent implements OnInit {
  /** 
   * O formulário de sinalização que será preenchido pelo usuário. 
   */
  signPostForm!: FormGroup;

  /** 
   * Define se o botão de envio deve ser desabilitado. 
   */
  isButtonDisabled: boolean = false;

  /** 
   * Indica se a solicitação é para uma única empresa. 
   */
  isSingleCompany: boolean = true;
  /** 
   * Lista das empresas selecionadas pelo usuário. 
   */
  selectedCompanies: Partial<CompanyDetails>[] = [];
  /** 
   * Lista das empresas a serem enviadas no formulário. 
   */
  sendCompanies: number[] = [];
  /** 
   * Lista das empresas personalizadas (outros) a serem enviadas no formulário. 
   */
  sendOthersCompanies: string[] = [];

  /** 
   * Indica se a opção "Outras Empresas" foi selecionada. 
   */
  isOtherCompaniesSelected = false;

  /**
   * Construtor que injeta os serviços necessários no componente.
   * @param fb FormBuilder para construir o formulário reativo.
   * @param signpostService Serviço responsável pela criação da requisição de sinalização.
   * @param toastrService Serviço para exibição de mensagens de alerta.
   * @param storageService Serviço para acessar dados armazenados no armazenamento local.
   */
  constructor(
    private fb: FormBuilder,
    private signpostService: CreateRequestService,
    private toastrService: ToastrService,
    private storageService: StorageService
  ) { }


  /**
   * Método de ciclo de vida do componente.
   * Inicializa o formulário com controles e validadores.
   */
  ngOnInit(): void {
    this.signPostForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      signLocation: new FormControl('', [Validators.required]),
      width: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      height: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      selectedCompany: new FormControl('', [Validators.required]),
      sector: new FormControl('', [Validators.required]),
      othersText: new FormControl(''),
      boardType: new FormControl('', [Validators.required]),
    });
  }

  /**
   * Getters para acessar os controles de formulário do componente.
   * Estes métodos retornam as instâncias dos campos do formulário para facilitar a manipulação de seus valores e validações.
   */
  get title() { return this.signPostForm.get('title')!; }
  get width() { return this.signPostForm.get('width')!; }
  get height() { return this.signPostForm.get('height')!; }
  get description() { return this.signPostForm.get('description')!; }
  get signLocation() { return this.signPostForm.get('signLocation')!; }
  get sector() { return this.signPostForm.get('sector')!; }
  get boardType() { return this.signPostForm.get('boardType')!; }
  get othersText() { return this.signPostForm.get('othersText')!; }
  get selectedCompany() { return this.signPostForm.get('selectedCompany')!; }

  /**
   * Limpa o formulário e reseta a lista de empresas selecionadas.
   */
  clearForm() {
    this.signPostForm.reset();
    this.selectedCompanies = [];
  }

  /**
   * Altera a seleção de empresas e limpa a lista de empresas selecionadas.
   * @param type Tipo de seleção.
   */
  onCompanyChange(type: string) {
    this.selectedCompanies = [];
  }

  /**
   * Atualiza a lista de empresas selecionadas com base na escolha do usuário.
   * @param selectionType Tipo de seleção da empresa.
   * @param company Nome da empresa.
   */
  updateCompanyName(selectionType: number, company: string) {
    const existingCompany = this.selectedCompanies.find(c => c.name === company);
    if (existingCompany) {
      this.selectedCompanies = this.selectedCompanies.filter(c => c.name !== company);
    } else {
      this.selectedCompanies.push({ name: company, isCustom: false });
    }
  }

  /**
   * Alterna a seleção da opção "Outras Empresas".
   */
  onOthersCompanies() {
    this.isOtherCompaniesSelected = !this.isOtherCompaniesSelected;
    if (!this.isOtherCompaniesSelected) {
      this.signPostForm.get('othersText')?.setValue('');
      this.selectedCompanies = this.selectedCompanies.filter(company => company.name !== 'Outras');
    }
  }

  /**
   * Atualiza o nome das empresas personalizadas inseridas pelo usuário.
   */
  updateOthersCompanies() {
    const otherValue = this.signPostForm.get('othersText')?.value;
    if (otherValue) {
      const companyIndex = this.selectedCompanies.findIndex(company => company.name === 'Outras');
      if (companyIndex >= 0) {
        this.selectedCompanies[companyIndex].name = otherValue;
        this.signPostForm.get('othersText')?.reset();
      } else {
        this.selectedCompanies.push({ name: otherValue, isCustom: true });
        this.signPostForm.get('othersText')?.reset();
      }
    }
  }

  /**
   * Confirma a seleção de empresas "Outras" e adiciona à lista de empresas selecionadas.
   */
  confirmOtherMultiCompany() {
    const otherCompany = this.signPostForm.get('othersText')?.value;
    if (otherCompany && !this.selectedCompanies.some(c => c.name === otherCompany)) {
      this.selectedCompanies.push({
        name: otherCompany,
        isCustom: true
      });
      this.isOtherCompaniesSelected = false;
    }
  }

  /**
   * Remove uma empresa da lista de empresas selecionadas.
   * @param company Empresa a ser removida.
   */
  removeCompany(company: Partial<CompanyDetails>) {
    const index = this.selectedCompanies.findIndex((c) => c.name === company.name);
    if (index >= 0) {
      this.selectedCompanies.splice(index, 1);
    }
  }

  /**
   * Preenche as listas de empresas para envio.
   * @param companies Lista de empresas selecionadas.
   */
  saveCompanies(companies: Partial<CompanyDetails>[]) {
    this.sendCompanies = [];
    this.sendOthersCompanies = [];

    for (const company of companies) {
      if (company.name) {
        const enumKey = Object.keys(Company).find(key => key === company.name);
        if (enumKey && !company.isCustom) {
          const enumValue = Company[enumKey as keyof typeof Company];
          this.sendCompanies.push(enumValue);
        } else if (company.isCustom) {
          this.sendOthersCompanies.push(company.name);
        }
      }
    }
  }

  /**
   * Submete a solicitação de sinalização após validação do formulário.
   * Exibe mensagens de erro ou sucesso dependendo do resultado.
   */
  submit() {
    this.saveCompanies(this.selectedCompanies);

    if (this.signPostForm.invalid || this.selectedCompanies.length == 0) {
      this.toastrService.error("Erro ao realizar solicitação. Verifique se os campos estão preenchidos corretamente.");
      this.isButtonDisabled = true;
      setTimeout(() => {
        this.isButtonDisabled = false;
      }, 3000);
      return;
    }

    const request: I_Signpost_Request = {
      project: {
        title: this.title.value,
        idClient: this.storageService.getUserId(),
      },
      briefing: {
        detailedDescription: this.description!.value,
        idBriefingType: E_Briefing_Type.SINALIZACAO_INTERNA.id,
        companies: this.sendCompanies.map((item) => {
          return { idCompany: item } as I_Company_Briefing_Form_Data;
        }),
        otherCompany: this.sendOthersCompanies.join(', '),
        measurement: {
          height: this.height!.value,
          length: this.width!.value,
        },
      },
      signpost: {
        boardLocation: this.signLocation!.value,
        idMaterial: this.boardType!.value,
        sector: this.sector!.value,
      },
    };

    this.signpostService.submitSignpostRequest(request).subscribe({
      next: (response) => {
        this.toastrService.success(response.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
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
