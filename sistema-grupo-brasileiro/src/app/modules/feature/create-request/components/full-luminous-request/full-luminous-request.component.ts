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
  isSingleCompany: boolean = true;
  selectedCompanies: CompanyDetails[] = [];

  isOtherCompaniesSelected = false;
  showCompanyFields: boolean = false;

  mainRoutes: string[] = ['Salvador', 'Feira de Santana', 'Capim Grosso', 'Juazeiro', 'Irecê', 'Xique Xique', 'Barra'];
  connections: string[] = ['Jacobina', 'Itabuna', 'Porto Seguro', 'Ilhéus', 'Eunápolis', 'Maracas', 'Jequié', 'Vitória da Conquista', 'Eunápolis'];


  // TODO: Adicionar ID para identificação da imagem
  files: { name: string, url: string }[] = [];

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      description: ['', Validators.required],
      signLocation: ['', Validators.required],
      width: ['', Validators.required],
      height: ['', Validators.required],
      sharedCompany: [false],
      selectedCompany: [''],
      mainRoute: [''],
      connections: [''],
      observation: ['', Validators.required],
      otherText: [''],
      othersText: [''],
    });
  }

  get width() {
    return this.registerForm.get('width');
  }

  get height() {
    return this.registerForm.get('height');
  }


  clearForm() {
    this.registerForm.reset();
    this.selectedCompanies = [];
    this.showCompanyFields = false;
    this.files = [];
  }

  onCompanyChange(type: string) {
    this.isSingleCompany = (type === 'single');
    this.selectedCompanies = [];
    this.showCompanyFields = true;

    if (this.isSingleCompany) {
      this.registerForm.patchValue({ selectedCompany: null, otherText: '' });
      this.registerForm.patchValue({ mainRoute: null, connections: null });

    } else {
      this.registerForm.patchValue({ mainRoute: null, connections: null });
      this.registerForm.patchValue({ selectedCompany: null, othersText: '' });
    }
  }

  updateCompanyName(selectionType: number, company: string) {
    if (selectionType === 1) {
      this.selectedCompanies = [{ name: company, mainRoutes: [], connections: [], isCustom: false }];
    } else {
      const existingCompany = this.selectedCompanies.find(c => c.name === company);
      if (existingCompany) {
        this.selectedCompanies = this.selectedCompanies.filter(c => c.name !== company);
      } else {
        this.selectedCompanies.push({ name: company, mainRoutes: [], connections: [], isCustom: false });
      }
    }
  }

  onOtherCompany() {
    this.selectedCompanies = [];
    this.registerForm.get('otherText')?.setValue('');
  }

  updateOtherCompany() {
    const otherValue = this.registerForm.get('otherText')?.value;
    this.selectedCompanies = [];
    this.selectedCompanies.push({ name: otherValue, mainRoutes: [], connections: [], isCustom: true });
  }

  confirmOtherSingleCompany() {
    const otherCompany = this.registerForm.get('otherText')?.value;
    if (otherCompany && !this.selectedCompanies.some(c => c.name === otherCompany)) {
      this.selectedCompanies.push({ name: otherCompany, mainRoutes: [], connections: [], isCustom: true });
      this.registerForm.get('otherText')?.reset();
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
        this.selectedCompanies.push({ name: otherValue, mainRoutes: [], connections: [], isCustom: true });
      }
    }
  }

  confirmOtherMultiCompany() {
    const otherCompany = this.registerForm.get('othersText')?.value;
    if (otherCompany && !this.selectedCompanies.some(c => c.name === otherCompany)) {
      this.selectedCompanies.push({
        name: otherCompany,
        mainRoutes: [],
        connections: [],
        isCustom: true
      });
      this.registerForm.get('othersText')?.reset();
      this.isOtherCompaniesSelected = false;
    }
  }

  removeCompany(companyName: string) {
    const companyIndex = this.selectedCompanies.findIndex(c => c.name === companyName && c.isCustom);
    if (companyIndex >= 0) {
      this.selectedCompanies.splice(companyIndex, 1);
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

  onFileSelected(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // TODO: this.files.push({id: service[NameService].createId(), name: file.name, url: e.target.result });
        this.files.push({ name: file.name, url: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files) {
      this.onFileSelected({ target: { files } });
    }
  }

  submit() {
    console.log(this.registerForm.value);
    console.log(this.files); 
  }
}
