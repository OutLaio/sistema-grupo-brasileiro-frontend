import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyDetails } from '../../interface/company-details';
import { CreateRequestService } from '../../services/create-request.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../../../services/storage/storage.service';

import { I_Stickers_Request } from '../../../../shared/interfaces/briefing/stickers/form/stickers-register-form';
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
 * Componente responsável por gerenciar a solicitação de adesivos.
 * Ele permite que o usuário preencha as informações do adesivo, selecione empresas envolvidas, 
 * e envie as informações para o servidor.
 */
@Component({
  selector: 'app-stickers-request',
  templateUrl: './stickers-request.component.html',
  styleUrl: './stickers-request.component.css'
})
export class StickersRequestComponent implements OnInit {
  /**
   * Formulário reativo utilizado para coletar as informações de solicitação de adesivos.
   */
  stickersForm!: FormGroup;
  /**
   * Controle de habilitação do botão de envio para evitar múltiplos cliques.
   */
  isButtonDisabled: boolean = false;

  /**
   * Indica se a solicitação envolve uma única empresa ou múltiplas.
   */
  isSingleCompany: boolean = true;
  /**
   * Lista das empresas selecionadas pelo usuário.
   */
  selectedCompanies: Partial<CompanyDetails>[] = [];
  /**
   * Lista de IDs das empresas selecionadas para enviar.
   */
  sendCompanies: number[] = [];
  /**
   * Lista de empresas customizadas inseridas pelo usuário (não pré-definidas).
   */
  sendOthersCompanies: string[] = [];

  /**
   * Flag que indica se a opção "Outras empresas" foi selecionada.
   */
  isOtherCompaniesSelected = false;

  /**
   * Construtor do componente `StickersRequestComponent`.
   * Inicializa as dependências necessárias para o componente, como o formulário, serviços e feedback do usuário.
   * 
   * @param {FormBuilder} fb - Serviço utilizado para construir o formulário reativo.
   * @param {CreateRequestService} createRequestService - Serviço responsável por enviar a solicitação de adesivo.
   * @param {ToastrService} toastrService - Serviço utilizado para exibir mensagens de feedback (sucesso ou erro).
   * @param {StorageService} storageService - Serviço que acessa os dados armazenados no localStorage, como o ID do usuário.
   */
  constructor(
    private fb: FormBuilder,
    private createRequestService: CreateRequestService,
    private toastrService: ToastrService,
    private storageService: StorageService
  ) { }


  /**
   * Método de ciclo de vida chamado ao inicializar o componente. 
   * Inicializa o formulário com os controles necessários e suas respectivas validações.
   */
  ngOnInit(): void {
    this.stickersForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      width: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      height: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      stickerType: new FormControl('', [Validators.required]),
      stickerInformationType: new FormControl(''),
      selectedCompany: new FormControl('', [Validators.required]),
      sector: new FormControl('', [Validators.required]),
      othersText: new FormControl(''),
      observations: new FormControl(''),
    });
  }

  /** 
   * Getters para facilitar o acesso aos controles do formulário
   *  
  */
  get title() { return this.stickersForm.get('title')!; }
  get width() { return this.stickersForm.get('width')!; }
  get height() { return this.stickersForm.get('height')!; }
  get stickerType() { return this.stickersForm.get('stickerType')!; }
  get description() { return this.stickersForm.get('description')!; }
  get observations() { return this.stickersForm.get('observations')!; }
  get sector() { return this.stickersForm.get('sector')!; }
  get stickerInformationType() { return this.stickersForm.get('stickerInformationType')!; }
  get othersText() { return this.stickersForm.get('othersText')!; }
  get selectedCompany() { return this.stickersForm.get('selectedCompany')!; }

  /**
   * Limpa o formulário e reinicia a lista de empresas selecionadas.
   */
  clearForm() {
    this.stickersForm.reset();
    this.selectedCompanies = [];
  }

  /**
   * Método acionado quando há mudanças no valor de "stickerType".
   * Ajusta as validações para o campo "stickerInformationType" conforme o valor de "stickerType".
   */
  onValueChanged() {
    this.stickersForm.get('stickerType')?.valueChanges.subscribe(value => {
      if (value === '2') {
        this.stickersForm.get('stickerInformationType')?.setValidators([Validators.required]);
      } else {
        this.stickersForm.get('stickerInformationType')?.clearValidators();
      }
      this.stickersForm.get('stickerInformationType')?.updateValueAndValidity();
    });
  }

  /**
   * Limpa a seleção de empresas quando o tipo de empresa for alterado.
   * @param {string} type - O tipo de empresa selecionado.
   */
  onCompanyChange(type: string) {
    this.selectedCompanies = [];
  }

  /**
   * Atualiza a seleção das empresas. Se a empresa já foi selecionada, ela é removida. 
   * Caso contrário, é adicionada à lista de empresas selecionadas.
   * @param {number} selectionType - O tipo de seleção (ex: única ou múltiplas empresas).
   * @param {string} company - O nome da empresa a ser adicionada/removida.
   */
  updateCompanyName(selectionType: number, company: string) {
    const existingCompany = this.selectedCompanies.find(c => c.name === company);
    if (existingCompany) {
      this.selectedCompanies = this.selectedCompanies.filter(c => c.name !== company);
    } else {
      this.selectedCompanies.push({ name: company, isCustom: false });
    }
    if(this.selectedCompanies.length == 0)
      console.log(this.selectedCompanies);
  }

  /**
   * Alterna a seleção da opção "Outras empresas" no formulário.
   */
  onOthersCompanies() {
    this.isOtherCompaniesSelected = !this.isOtherCompaniesSelected;
    if (!this.isOtherCompaniesSelected) {
      this.stickersForm.get('othersText')?.setValue('');
      this.selectedCompanies = this.selectedCompanies.filter(company => company.name !== 'Outras');
    }
  }

  /**
   * Atualiza a seleção de empresas customizadas inseridas pelo usuário.
   */
  updateOthersCompanies() {
    const otherValue = this.stickersForm.get('othersText')?.value;
    if (otherValue) {
      const companyIndex = this.selectedCompanies.findIndex(company => company.name === 'Outras');
      if (companyIndex >= 0) {
        this.selectedCompanies[companyIndex].name = otherValue;
        this.stickersForm.get('othersText')?.reset();
      } else {
        this.selectedCompanies.push({ name: otherValue, isCustom: true });
        this.stickersForm.get('othersText')?.reset();
      }
    }
    if(this.selectedCompanies.length == 0)
      console.log(this.selectedCompanies);
  }

  /**
   * Confirma a adição de uma empresa customizada.
   * @returns {void}
   */
  confirmOtherMultiCompany() {
    const otherCompany = this.stickersForm.get('othersText')?.value;
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
   * @param {Partial<CompanyDetails>} company - A empresa a ser removida.
   */
  removeCompany(company: Partial<CompanyDetails>) {
    const index = this.selectedCompanies.findIndex((c) => c.name === company.name);
    if (index >= 0) {
      this.selectedCompanies.splice(index, 1);
    }
  }

  /**
   * Converte a lista de empresas selecionadas para o formato necessário para enviar a solicitação.
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
   * Envia a solicitação de adesivo após validar o formulário e as empresas selecionadas.
   * Caso haja algum erro, exibe uma mensagem de erro para o usuário.
   */
  submit() {
    this.saveCompanies(this.selectedCompanies);
    if (this.stickersForm.invalid || this.selectedCompanies.length == 0) {
      this.toastrService.error("Erro ao realizar solicitação. Verifique se os campos estão preenchidos corretamente.");
      this.isButtonDisabled = true;
      setTimeout(() => {
        this.isButtonDisabled = false;
      }, 3000);
      return;
    }

    const request: I_Stickers_Request = {
      project: {
        title: this.title.value,
        idClient: this.storageService.getUserId(),
      },
      briefing: {
        detailedDescription: this.description!.value,
        idBriefingType: E_Briefing_Type.ADESIVOS.id,
        companies: this.sendCompanies.map((item) => {
          return { idCompany: item } as I_Company_Briefing_Form_Data;
        }),
        otherCompany: this.sendOthersCompanies.join(', '),
        measurement: {
          height: this.height!.value,
          length: this.width!.value,
        },
      },
      sticker: {
        idStickerType: this.stickerType!.value,
        idStickerInformationType: this.stickerInformationType!.value,
        sector: this.sector!.value,
        observations: this.observations!.value,
      },
    };


    this.createRequestService.submitStickersRequest(request).subscribe({
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
