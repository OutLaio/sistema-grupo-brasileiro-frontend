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


  constructor(private fb: FormBuilder, private signpostService: CreateRequestService, private toastrService: ToastrService) {  }

  ngOnInit(): void {
    this.signPostForm = new FormGroup({
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
      } else {
        this.selectedCompanies.push({ name: otherValue, isCustom: true });
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
      this.signPostForm.get('othersText')?.reset();
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
    const boardType = this.signPostForm.get('boardType')?.value;
    const boardLocation = this.signPostForm.get('signLocation')?.value;
    const sector = this.signPostForm.get('sector')?.value;
    const description = this.signPostForm.get('description')?.value;
    const height = this.signPostForm.get('height')?.value;
    const width = this.signPostForm.get('width')?.value;
    const observation = this.signPostForm.get('observation')?.value;

    if (this.signPostForm.invalid) {
      this.toastrService.error("Erro ao realizar solicitação. Verifique se os campos estão preenchidos corretamente.");
      return;
    }

    this.signpostService.submitSignpostRequest(
      this.sendCompanies,
      this.sendOthersCompanies,
      boardType,
      boardLocation,
      sector,
      description,
      height,
      width,
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
    }, 2000);
  }
}
