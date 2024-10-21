import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-full-luminous-request',
  templateUrl: './full-luminous-request.component.html',
  styleUrls: ['./full-luminous-request.component.css']
})
export class FullLuminousRequestComponent {
  registerForm: FormGroup;
  isSingleCompany: boolean = false;
  selectedCompanyName: string | null = null;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      description: ['', Validators.required],
      signLocation: ['', Validators.required],
      singleCompany: [null],
      selectedCompany: [null],
      otherText: [''],
      mainRoute: [null],
      connections: [null],
    });
  }
  onCompanyChange(type: string) {
    this.isSingleCompany = (type === 'single');
    this.selectedCompanyName = null;
    if (!this.isSingleCompany) {
      this.registerForm.patchValue({ selectedCompany: null, otherText: '' });
    }
  }

  updateCompanyName(company: string) {
    this.selectedCompanyName = company;
  }

  onOtherCompany() {
    this.selectedCompanyName = null;
    this.registerForm.get('otherText')?.setValue('');
  }

  updateOtherCompany() {
    const otherValue = this.registerForm.get('otherText')?.value;
    this.selectedCompanyName = otherValue;
  }

  confirmCompany() {
    const selectedCompany = this.registerForm.get('selectedCompany')?.value;

    if (selectedCompany === 'Outro') {
      this.selectedCompanyName = this.registerForm.get('otherText')?.value;
    } else {
      this.selectedCompanyName = selectedCompany;
    }

  }

  addMainRoute() {
    console.log("Adicionar nova rota principal");
  }

  addConnection() {
    console.log("Adicionar nova conexão");
  }

  submit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    }
  }
}
