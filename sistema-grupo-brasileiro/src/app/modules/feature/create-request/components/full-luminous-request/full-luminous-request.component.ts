import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface CompanyDetails {
  name: string;
  mainRoutes: string[];
  connections: string[];
}

@Component({
  selector: 'app-full-luminous-request',
  templateUrl: './full-luminous-request.component.html',
  styleUrls: ['./full-luminous-request.component.css']
})
export class FullLuminousRequestComponent {
  registerForm: FormGroup;
  isSingleCompany: boolean = false;
  selectedCompanies: CompanyDetails[] = [];

  mainRoutes: string[] = ['Salvador', 'Feira de Santana', 'Capim Grosso', 'Juazeiro', 'Irecê', 'Xique Xique', 'Barra'];
  connections: string[] = ['Jacobina', 'Itabuna', 'Porto Seguro', 'Ilhéus', 'Eunápolis', 'Maracas', 'Jequié', 'Vt. Conquistas', 'Eunápolis'];

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      description: ['', Validators.required],
      signLocation: ['', Validators.required],
      singleCompany: [null],
      selectedCompany: [null],
      otherText: [''],
      mainRoute: [null],
      connections: [null],
      observation: [''],
    });
  }

  onCompanyChange(type: string) {
    this.isSingleCompany = (type === 'single');
    this.selectedCompanies = [];
    if (this.isSingleCompany) {
      this.registerForm.patchValue({ selectedCompany: null, otherText: '' });
    } else {
      this.registerForm.patchValue({ mainRoute: null, connections: null });
    }
  }

  updateCompanyName(selectionType: number, company: string) {
    if (selectionType === 1) {
      this.selectedCompanies = [{ name: company, mainRoutes: [], connections: [] }];
    } else {
      const existingCompany = this.selectedCompanies.find(c => c.name === company);
      if (existingCompany) {
        this.selectedCompanies = this.selectedCompanies.filter(c => c.name !== company);
      } else {
        this.selectedCompanies.push({ name: company, mainRoutes: [], connections: [] });
      }
    }
  }
  onOtherCompany() {
    this.selectedCompanies = [];
    this.registerForm.get('otherText')?.setValue('');
  }
  updateOtherCompany() {
    const otherValue = this.registerForm.get('otherText')?.value;
    this.selectedCompanies.push({ name: otherValue, mainRoutes: [], connections: [] });
  }

  confirmCompany() {
    const otherCompany = this.registerForm.get('otherText')?.value;
    if (otherCompany && !this.selectedCompanies.some(c => c.name === otherCompany)) {
      this.selectedCompanies.push({ name: otherCompany, mainRoutes: [], connections: [] });
      this.registerForm.get('otherText')?.reset();
    }
  }

  addMainRoute() {
    const selectedMainRoute = this.registerForm.get('mainRoute')?.value;
    if (selectedMainRoute && this.selectedCompanies.length > 0) {
      this.selectedCompanies[0].mainRoutes.push(selectedMainRoute);
      this.registerForm.get('mainRoute')?.reset();
    }
  }

  addConnection() {
    const selectedConnection = this.registerForm.get('connections')?.value;
    if (selectedConnection && this.selectedCompanies.length > 0) {
      this.selectedCompanies[0].connections.push(selectedConnection);
      this.registerForm.get('connections')?.reset();
    }
  }

  submit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      console.log('Selected Companies:', this.selectedCompanies);
    }
  }
}
