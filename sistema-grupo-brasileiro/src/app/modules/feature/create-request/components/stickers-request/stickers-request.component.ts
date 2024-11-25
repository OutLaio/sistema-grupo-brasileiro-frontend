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
@Component({
  selector: 'app-stickers-request',
  templateUrl: './stickers-request.component.html',
  styleUrl: './stickers-request.component.css'
})
export class StickersRequestComponent implements OnInit {
  stickersForm!: FormGroup;
  isButtonDisabled: boolean = false;

  isSingleCompany: boolean = true;
  selectedCompanies: Partial<CompanyDetails>[] = [];
  sendCompanies: number[] = [];
  sendOthersCompanies: string[] = [];

  isOtherCompaniesSelected = false;


  constructor(
    private fb: FormBuilder,
    private createRequestService: CreateRequestService,
    private toastrService: ToastrService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.stickersForm = new FormGroup({
      description: new FormControl('', [Validators.required]),
      width: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      height: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      stickerType: new FormControl('', [Validators.required]),
      stickerInformationType: new FormControl('', [Validators.required]),
      selectedCompany: new FormControl('', [Validators.required]),
      sector: new FormControl('', [Validators.required]),
      othersText: new FormControl(''),
      observations: new FormControl('', [Validators.required]),
    });
    this.stickersForm.get('stickerType')?.valueChanges.subscribe(value => {
      if (value === '2') {
        this.stickersForm.get('stickerInformationType')?.setValidators([Validators.required]);
      } else {
        this.stickersForm.get('stickerInformationType')?.clearValidators();
      }
      this.stickersForm.get('stickerInformationType')?.updateValueAndValidity();
    });
  }

  get width() { return this.stickersForm.get('width')!; }
  get height() { return this.stickersForm.get('height')!; }
  get stickerType() { return this.stickersForm.get('stickerType')!; }
  get description() { return this.stickersForm.get('description')!; }
  get observations() { return this.stickersForm.get('observations')!; }
  get sector() { return this.stickersForm.get('sector')!; }
  get stickerInformationType() { return this.stickersForm.get('stickerInformationType')!; }
  get othersText() { return this.stickersForm.get('othersText')!; }
  get selectedCompany() { return this.stickersForm.get('selectedCompany')!; }

  clearForm() {
    this.stickersForm.reset();
    this.selectedCompanies = [];
  }

  onCompanyChange(type: string) {
    this.selectedCompanies = [];
  }

  updateCompanyName(selectionType: number, company: string) {
    const existingCompany = this.selectedCompanies.find(c => c.name === company);
    if (existingCompany) {
      this.selectedCompanies = this.selectedCompanies.filter(c => c.name !== company);
    } else {
      this.selectedCompanies.push({ name: company, isCustom: false });
    }
  }

  onOthersCompanies() {
    this.isOtherCompaniesSelected = !this.isOtherCompaniesSelected;
    if (!this.isOtherCompaniesSelected) {
      this.stickersForm.get('othersText')?.setValue('');
      this.selectedCompanies = this.selectedCompanies.filter(company => company.name !== 'Outras');
    }
  }

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
  }

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

  removeCompany(company: Partial<CompanyDetails>) {
    const index = this.selectedCompanies.findIndex((c) => c.name === company.name);
    if (index >= 0) {
      this.selectedCompanies.splice(index, 1);
    }
  }

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

  submit() {
    this.saveCompanies(this.selectedCompanies);
    if (this.stickersForm.invalid) {
      this.toastrService.error("Erro ao realizar solicitação. Verifique se os campos estão preenchidos corretamente.");
      this.isButtonDisabled = true;
      setTimeout(() => {
        this.isButtonDisabled = false;
      }, 3000);
      return;
    }

    const request: I_Stickers_Request = {
      project: {
        title: 'Adesivos',
        idClient: this.storageService.getUserId(),
      },
      briefing: {
        detailedDescription: this.description!.value,
        idBriefingType: E_Briefing_Type.ADESIVOS.id,
        companies: this.sendCompanies.map((item) => {
          return { idCompany: item.toString() } as I_Company_Briefing_Form_Data;
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
