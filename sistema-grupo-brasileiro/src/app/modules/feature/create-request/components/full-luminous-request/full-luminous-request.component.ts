import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  connections: string[] = ['Jacobina', 'Itabuna', 'Porto Seguro', 'Ilhéus', 'Eunápolis', 'Maracas', 'Jequié', 'Vitória da Conquista', 'Eunápolis'];

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      description: ['', Validators.required],
      signLocation: ['', Validators.required],
      sharedCompany: [null],
      selectedCompany: [null],
      otherText: [''],
      mainRoute: [null],
      connections: [null],
      observation: [''],
      width: ['', Validators.required],
      height: ['', Validators.required]
    });
  }

  get width() {
    return this.registerForm.get('width');
  }

  get height() {
    return this.registerForm.get('height');
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

  addMainRoute(companyName: string) {
    const selectedMainRoute = this.registerForm.get('mainRoute')?.value;

    if (selectedMainRoute) {
      const company = this.selectedCompanies.find(c => c.name === companyName);
      if (company) {
        const routeExists = company.mainRoutes.includes(selectedMainRoute);
        if (!routeExists) {
          company.mainRoutes.push(selectedMainRoute);
          this.registerForm.get('mainRoute')?.reset();
        }
      }
    }
  }


  removeMainRoute(companyName: string, routeToRemove: string) {
    const company = this.selectedCompanies.find(c => c.name === companyName);
    if (company) {
      const index = company.mainRoutes.indexOf(routeToRemove);
      if (index !== -1) {
        company.mainRoutes.splice(index, 1);
      }
    }
  }



  addConnection(companyName: string) {
    const selectedConnection = this.registerForm.get('connections')?.value;

    if (selectedConnection) {
      const company = this.selectedCompanies.find(c => c.name === companyName);
      if (company) {
        const connectionExists = company.connections.includes(selectedConnection);
        if (!connectionExists) {
          company.connections.push(selectedConnection);
          this.registerForm.get('connections')?.reset();
        }
      }
    }
  }


  removeConnection(companyName: string, connectionToRemove: string) {
    const company = this.selectedCompanies.find(c => c.name === companyName);
    if (company) {
      const index = company.connections.indexOf(connectionToRemove);
      if (index !== -1) {
        company.connections.splice(index, 1);
      }
    }
  }

  submit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      console.log('Selected Companies:', this.selectedCompanies);
    }
  }
}
