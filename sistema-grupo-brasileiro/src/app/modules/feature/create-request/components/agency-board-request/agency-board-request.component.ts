import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyDetails } from '../../interface/company-details';
import { CreateRequestService } from '../../services/create-request.service';
import { I_Agency_Board_Request } from '../../../../shared/interfaces/briefing/agency-board/form/agency-board-register-form';
import { I_Briefing_Request } from '../../../../shared/interfaces/project/form/briefing-form';
import { I_Project_Request } from '../../../../shared/interfaces/project/form/project-form';
import { I_Agency_Board_Data } from '../../../../shared/interfaces/briefing/agency-board/form/agency-board-form';
import { I_Company_Briefing_Form_Data } from '../../../../shared/interfaces/company/form/company-briefing-form';
import { I_Agency_Board_Routes } from '../../../../shared/interfaces/briefing/agency-board/form/agency-board-routes-form';
import { I_Agency_Board_Others_Routes } from '../../../../shared/interfaces/briefing/agency-board/form/agency-board-others-routes-form';

enum Cities {
  'SÃO PAULO' = '1',
  'RIO DE JANEIRO' = '2',
  'BELO HORIZONTE' = '3',
  'PORTO ALEGRE' = '4',
  'CURITIBA' = '5',
  'FORTALEZA' = '6',
  'SALVADOR' = '7',
  'BRASÍLIA' = '8',
  'RECIFE' = '9',
  'GOIÂNIA' = '10',
}

enum Company {
  'Rota Transportes' = '1',
  'Cidade Sol' = '2',
  'Via Metro' = '3',
  'Brasileiro' = '4',
}

@Component({
  selector: 'app-agency-board-request',
  templateUrl: './agency-board-request.component.html',
  styleUrls: ['./agency-board-request.component.css']
})
export class AgencyBoardRequestComponent {
  registerForm: FormGroup;
  isSingleCompany: boolean = true;
  companies: CompanyDetails[] = [];

  selectedCompanies: I_Company_Briefing_Form_Data[] = [];
  selectedOthersCompanies: string[] = [];

  isOtherCompaniesSelected = false;
  showCompanyFields: boolean = false;

  mainRoutes: string[] = ['SÃO PAULO', 'RIO DE JANEIRO', 'BELO HORIZONTE', 'PORTO ALEGRE', 'CURITIBA', 'FORTALEZA', 'SALVADOR', 'BRASÍLIA', 'RECIFE', 'GOIÂNIA'];
  connections: string[] = ['SÃO PAULO', 'RIO DE JANEIRO', 'BELO HORIZONTE', 'PORTO ALEGRE', 'CURITIBA', 'FORTALEZA', 'SALVADOR', 'BRASÍLIA', 'RECIFE', 'GOIÂNIA'];

  // TODO: Adicionar ID para identificação da imagem
  files: { name: string, url: string }[] = [];

  constructor(private fb: FormBuilder, private createRequestService: CreateRequestService) {
    this.registerForm = this.fb.group({
      description: ['', Validators.required],
      signLocation: ['', Validators.required],
      length: ['', Validators.required],
      height: ['', Validators.required],
      sharedCompany: [false],
      selectedCompany: [''],
      mainRoute: [''],
      connections: [''],
      observation: ['', Validators.required],
      otherText: [''],
      othersText: [''],
      agencyBoardType: ['', Validators.required],
      boardType: ['']
    });
  }

  get length() {
    return this.registerForm.get('length');
  }

  get height() {
    return this.registerForm.get('height');
  }

  clearForm() {
    this.registerForm.reset();
    this.companies = [];
    this.showCompanyFields = false;
    this.files = [];
  }

  onCompanyChange(type: string) {
    this.isSingleCompany = (type === 'single');
    this.companies = [];
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
      this.companies = [{ name: company, mainRoutes: [], connections: [], isCustom: false }];
    } else {
      const existingCompany = this.companies.find(c => c.name === company);
      if (existingCompany) {
        this.companies = this.companies.filter(c => c.name !== company);
      } else {
        this.companies.push({ name: company, mainRoutes: [], connections: [], isCustom: false });
      }
    }
  }

  onOtherCompany() {
    if (this.companies.length > 0)
      this.companies = [];
    this.registerForm.get('otherText')?.setValue('');
  }

  updateOtherCompany() {
    const otherValue = this.registerForm.get('otherText')?.value;
    this.companies = [];
    this.companies.push({ name: otherValue, mainRoutes: [], connections: [], isCustom: true });
  }

  confirmOtherSingleCompany() {
    const otherCompany = this.registerForm.get('otherText')?.value;
    if (otherCompany && !this.companies.some(c => c.name === otherCompany)) {
      this.companies.push({ name: otherCompany, mainRoutes: [], connections: [], isCustom: true });
      this.registerForm.get('otherText')?.reset();
    }
  }


  onOthersCompanies() {
    this.isOtherCompaniesSelected = !this.isOtherCompaniesSelected;
    if (!this.isOtherCompaniesSelected) {
      this.registerForm.get('othersText')?.setValue('');
      this.companies = this.companies.filter(company => company.name !== 'Outras');
    }
  }

  updateOthersCompanies() {
    const otherValue = this.registerForm.get('othersText')?.value;
    if (otherValue) {
      const companyIndex = this.companies.findIndex(company => company.name === 'Outras');
      if (companyIndex >= 0) {
        this.companies[companyIndex].name = otherValue;
      } else {
        this.companies.push({ name: otherValue, mainRoutes: [], connections: [], isCustom: true });
      }
    }
  }

  confirmOtherMultiCompany() {
    const otherCompany = this.registerForm.get('othersText')?.value;
    if (otherCompany && !this.companies.some(c => c.name === otherCompany)) {
      this.companies.push({
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
    const companyIndex = this.companies.findIndex(c => c.name === companyName && c.isCustom);
    if (companyIndex >= 0) {
      this.companies.splice(companyIndex, 1);
    }
  }

  addMainRoute(companyName: string) {
    const selectedMainRoute = this.registerForm.get('mainRoute')?.value;

    if (selectedMainRoute) {
      const company = this.companies.find(c => c.name === companyName);
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
    const company = this.companies.find(c => c.name === companyName);
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
      const company = this.companies.find(c => c.name === companyName);
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
    const company = this.companies.find(c => c.name === companyName);
    if (company) {
      const index = company.connections.indexOf(connectionToRemove);
      if (index !== -1) {
        company.connections.splice(index, 1);
      }
    }
  }

  onFilesLoaded(newFiles: { name: string, url: string }[]): void {
    this.files = newFiles;
  }

  separateCompanies() {
    this.selectedCompanies = this.companies.filter(company => !company.isCustom).map(company => {
      const companyName = company.name as keyof typeof Company;
      const companyInt: I_Company_Briefing_Form_Data = {
        idCompany: Company[companyName as keyof typeof Company], // Isso usará o valor numérico
      };
      return companyInt;
    });

    this.selectedOthersCompanies = this.companies.filter(company => company.isCustom).map(company => company.name);
  }


  prepareSubmit(): I_Agency_Board_Request {
    this.separateCompanies();

    const projectForm: I_Project_Request = {
      idClient: sessionStorage.getItem('idUser')!.toString(),
      title: 'Placa de Agência',
    }

    const briefingForm: I_Briefing_Request = {
      expectedDate: '2023-10-25',
      detailedDescription: this.registerForm.get('description')?.value,
      companies: this.selectedCompanies,
      otherCompany: this.selectedOthersCompanies.join(', '),
      idBriefingType: '1',
      measurement: {
        length: this.registerForm.get('length')?.value,
        height: this.registerForm.get('height')?.value,
      },
    }


    const mainRoutes: I_Agency_Board_Routes[] = this.companies.flatMap(company => {
      if (!company.isCustom) {
        return [{
          idCompany: Company[company.name as keyof typeof Company],
          idCities: company.mainRoutes.map(route => Cities[route as keyof typeof Cities]),
          type: 'main',
        }];
      } else {
        return [];
      }
    });


    const connections: I_Agency_Board_Routes[] = this.companies.flatMap(company => {
      if (!company.isCustom) {
        return [{
          idCompany: Company[company.name as keyof typeof Company],
          idCities: company.connections.map(connection => Cities[connection as keyof typeof Cities]),
          type: 'connection',
        }];
      } else {
        return [];
      }
    });


    const agencyBoardRoutes: I_Agency_Board_Routes[] = [...mainRoutes, ...connections];

    const mainOthersRoutes: I_Agency_Board_Others_Routes[] = this.companies.flatMap(company => {
      if (company.isCustom) {
        return company.mainRoutes.map(route => ({
          company: company.name,
          city: route,
          type: 'main',
        }));
      } else {
        return [];
      }
    });

    const othersConnections: I_Agency_Board_Others_Routes[] = this.companies.flatMap(company => {
      if (company.isCustom) {
        return company.connections.map(route => ({
          company: company.name,
          city: route,
          type: 'connection',
        }));
      } else {
        return [];
      }
    });

    const agencyBoardOthersRoutes: I_Agency_Board_Others_Routes[] = [...mainOthersRoutes, ...othersConnections];

    const bAgencyBoardsForm: I_Agency_Board_Data = {
      idAgencyBoardType: this.registerForm.get('agencyBoardType')?.value.toString(),
      boardLocation: this.registerForm.get('signLocation')?.value,
      observation: this.registerForm.get('observation')?.value,
      idBoardType: this.registerForm.get('boardType')?.value.toString(),
      routes: agencyBoardRoutes,
      othersRoutes: agencyBoardOthersRoutes,
    }

    return { projectForm: projectForm, briefingForm: briefingForm, bAgencyBoardsForm: bAgencyBoardsForm };


  }


  submit() {
    const requestData = this.prepareSubmit();
    this.createRequestService.submitAgencyBoardRequest(requestData.projectForm, requestData.briefingForm, requestData.bAgencyBoardsForm)
      .subscribe({
        next: (response) => {
          console.log('Requisição enviada com sucesso:', response);
        },
        error: (error) => {
          console.error('Erro ao enviar a requisição:', error);
        }
      });
    console.log(requestData.projectForm, requestData.briefingForm, requestData.bAgencyBoardsForm)
  }

}