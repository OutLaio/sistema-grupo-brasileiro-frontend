import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyDetails } from '../../interface/company-details';

@Component({
  selector: 'app-full-luminous-request',
  templateUrl: './full-luminous-request.component.html',
  styleUrls: ['./full-luminous-request.component.css']
})
export class FullLuminousRequestComponent {
  registerForm: FormGroup;
  isSingleCompany: boolean = false;
  selectedCompany: CompanyDetails | null = null;
  companies: CompanyDetails[] = [];

  mainRoutes: string[] = ['Salvador', 'Feira de Santana', 'Capim Grosso', 'Juazeiro', 'Irecê', 'Xique Xique', 'Barra'];
  connections: string[] = ['Jacobina', 'Itabuna', 'Porto Seguro', 'Ilhéus', 'Eunápolis', 'Maracas', 'Jequié', 'Vt. Conquistas', 'Eunápolis'];

  addedMainRoutes: string[] = [];
  addedConnections: string[] = [];

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
    if (!this.isSingleCompany) {
      this.registerForm.patchValue({ selectedCompany: null, otherText: '' });
    }
  }

  updateCompanyName(companyName: string) {
    this.selectedCompany = { name: companyName, mainRoutes: [], connections: [] };
  }

  onOtherCompany() {
    this.registerForm.get('otherText')?.setValue('');
    this.selectedCompany = null;
  }

  updateOtherCompany() {
    const otherCompany = this.registerForm.get('otherText')?.value;
    this.selectedCompany = { name: otherCompany, mainRoutes: [], connections: [] };
  }

  confirmCompany() {
    const selectedCompany = this.registerForm.get('selectedCompany')?.value;
    if (selectedCompany === 'Outro') {
      this.updateOtherCompany();
    } else {
      this.updateCompanyName(selectedCompany);
    }
  }

  addMainRoute() {
    const selectedMainRoute = this.registerForm.get('mainRoute')?.value;
    if (selectedMainRoute && this.selectedCompany && !this.selectedCompany.mainRoutes.includes(selectedMainRoute)) {
      this.selectedCompany.mainRoutes.push(selectedMainRoute);
      this.registerForm.get('mainRoute')?.reset();
    }
  }

  addConnection() {
    const selectedConnection = this.registerForm.get('connections')?.value;
    if (selectedConnection && this.selectedCompany && !this.selectedCompany.connections.includes(selectedConnection)) {
      this.selectedCompany.connections.push(selectedConnection);
      this.registerForm.get('connections')?.reset();
    }
  }

  submit() {
    if (this.registerForm.valid && this.selectedCompany) {
      this.companies.push(this.selectedCompany);
      console.log('Form values:', this.registerForm.value);
      console.log('Companies:', this.companies);
    }
  }
}
