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

@Component({
  selector: 'app-signpost-request',
  templateUrl: './signpost-request.component.html',
  styleUrl: './signpost-request.component.css'
})
export class SignpostRequestComponent implements OnInit {
  signPostForm!: FormGroup;
  isButtonDisabled: boolean = false;

  isSingleCompany: boolean = true;
  selectedCompanies: Partial<CompanyDetails>[] = [];
  sendCompanies: number[] = [];
  sendOthersCompanies: string[] = [];

  isOtherCompaniesSelected = false;


  constructor(
    private fb: FormBuilder,
    private signpostService: CreateRequestService,
    private toastrService: ToastrService,
    private storageService: StorageService
  ) {  }

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

  get title() { return this.signPostForm.get('title')!; }
  get width() { return this.signPostForm.get('width')!; }
  get height() { return this.signPostForm.get('height')!; }
  get description() { return this.signPostForm.get('description')!; }
  get signLocation() { return this.signPostForm.get('signLocation')!; }
  get sector() { return this.signPostForm.get('sector')!; }
  get boardType() { return this.signPostForm.get('boardType')!; }
  get othersText() { return this.signPostForm.get('othersText')!; }
  get selectedCompany() { return this.signPostForm.get('selectedCompany')!; }

  clearForm() {
    this.signPostForm.reset();
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
      this.signPostForm.get('othersText')?.setValue('');
      this.selectedCompanies = this.selectedCompanies.filter(company => company.name !== 'Outras');
    }
  }

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
          return { idCompany: item.toString() } as I_Company_Briefing_Form_Data;
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
