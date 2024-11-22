import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyDetails } from '../../interface/company-details';
import { CreateRequestService } from '../../services/create-request.service';
import { ToastrService } from 'ngx-toastr';

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


  constructor(private fb: FormBuilder, private createRequestService: CreateRequestService, private toastrService: ToastrService) { }

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
    const stickerType = this.stickersForm.get('stickerType')?.value;
    const stickerInformationType = this.stickersForm.get('stickerInformationType')?.value;
    const sector = this.stickersForm.get('sector')?.value;
    const description = this.stickersForm.get('description')?.value;
    const height = this.stickersForm.get('height')?.value;
    const width = this.stickersForm.get('width')?.value;
    const observations = this.stickersForm.get('observations')?.value;

    if (this.stickersForm.invalid) {
      this.toastrService.error("Erro ao realizar solicitação. Verifique se os campos estão preenchidos corretamente.");
      this.isButtonDisabled = true;
      setTimeout(() => {
        this.isButtonDisabled = false;
      }, 3000);
      return;
    }

    this.createRequestService.submitStickersRequest(
      this.sendCompanies,
      this.sendOthersCompanies,
      stickerType,
      stickerInformationType,
      sector,
      description,
      height,
      width,
      observations,
    ).subscribe({
      next: (response) => {
        this.toastrService.success("Solicitação realizada com sucesso!");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      error: (error) => {
        this.toastrService.error("Erro ao realizar solicitação.");
      }
    }); 
    this.isButtonDisabled = true;
    setTimeout(() => {
      this.isButtonDisabled = false;
    }, 3000);
  }
}
