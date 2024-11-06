import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyDetails } from '../../interface/company-details';
import { CreateRequestService } from '../../services/create-request.service';

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
export class SignpostRequestComponent {
  registerForm!: FormGroup;

  isSingleCompany: boolean = true;
  selectedCompanies: Partial<CompanyDetails>[] = [];
  sendCompanies: number[] = [];
  sendOthersCompanies: string[] = [];

  isOtherCompaniesSelected = false;


  constructor(private fb: FormBuilder, private signpostService: CreateRequestService) {
    this.registerForm = this.fb.group({
      description: ['', Validators.required],
      signLocation: ['', Validators.required],
      width: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      height: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      selectedCompany: ['', Validators.required],
      sector: ['', Validators.required],
      othersText: ['', Validators.required],
      boardType: ['', Validators.required]
    });
  }

  get width() { return this.registerForm.get('width')!; }
  get height() { return this.registerForm.get('height')!; }
  get description() { return this.registerForm.get('description')!; }
  get signLocation() { return this.registerForm.get('signLocation')!; }
  get sector() { return this.registerForm.get('sector')!; }
  get boardType() { return this.registerForm.get('boardType')!; }
  get othersText() { return this.registerForm.get('othersText')!; }
  get selectedCompany() { return this.registerForm.get('selectedCompany')!; }

  clearForm() {
    this.registerForm.reset();
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
      this.registerForm.get('othersText')?.setValue('');
      this.selectedCompanies = this.selectedCompanies.filter(company => company.name !== 'Outras');
    }
  }

  updateOthersCompanies() {
    const otherValue = this.registerForm.get('othersText')?.value;
    if (otherValue) {
      const companyIndex = this.selectedCompanies.findIndex(company => company.name === 'Outras');
      if (companyIndex >= 0) {
        this.selectedCompanies[companyIndex].name = otherValue;
      } else {
        this.selectedCompanies.push({ name: otherValue, isCustom: true });
      }
    }
  }

  confirmOtherMultiCompany() {
    const otherCompany = this.registerForm.get('othersText')?.value;
    if (otherCompany && !this.selectedCompanies.some(c => c.name === otherCompany)) {
      this.selectedCompanies.push({
        name: otherCompany,
        isCustom: true
      });
      this.registerForm.get('othersText')?.reset();
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
    const boardType = this.registerForm.get('boardType')?.value;
    const boardLocation = this.registerForm.get('signLocation')?.value;
    const sector = this.registerForm.get('sector')?.value;
    const description = this.registerForm.get('description')?.value;
    const height = this.registerForm.get('height')?.value;
    const width = this.registerForm.get('width')?.value;

    this.signpostService.submitSignpostRequest(
      this.sendCompanies,
      this.sendOthersCompanies,
      boardType,
      boardLocation,
      sector,
      description,
      height,
      width
    ).subscribe({
      next: (response) => {
        console.log('Requisição enviada com sucesso:', response);
      },
      error: (error) => {
        console.error('Erro ao enviar a requisição:', error);
      }
    });
  }


}
