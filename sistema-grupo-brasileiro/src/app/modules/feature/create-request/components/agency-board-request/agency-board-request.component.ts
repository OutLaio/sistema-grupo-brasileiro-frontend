import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
export class AgencyBoardRequestComponent implements OnInit {
  isButtonDisabled = false;
  agencyBoardForm!: FormGroup;
  isSingleCompany: boolean = true;
  companies: CompanyDetails[] = [];

  selectedCompanies: I_Company_Briefing_Form_Data[] = [];
  selectedOthersCompanies: string[] = [];

  isOtherCompaniesSelected = false;
  showCompanyFields: boolean = false;

  mainRoutes: string[] = Object.keys(Cities);
  connections: string[] = Object.keys(Cities);

  // TODO: Adicionar ID para identificação da imagem
  files: { name: string, url: string }[] = [];

  constructor(private fb: FormBuilder, private createRequestService: CreateRequestService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.agencyBoardForm = new FormGroup({
      description: new FormControl('', [Validators.required]),
      signLocation: new FormControl('', [Validators.required]),
      length: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')]),
      height: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')]),
      sharedCompany: new FormControl('', [Validators.required]),
      selectedCompany: new FormControl('', [Validators.required]),
      mainRoute: new FormControl('', [Validators.required]),
      connections: new FormControl('', [Validators.required]),
      observation: new FormControl(''),
      otherText: new FormControl(''),
      othersText: new FormControl(''),
      agencyBoardType: new FormControl('', [Validators.required]),
      boardType: new FormControl('', [Validators.required])
    });
    
  }

  get length() { return this.agencyBoardForm.get('length')!; }
  get height() { return this.agencyBoardForm.get('height')!; }
  get description() { return this.agencyBoardForm.get('description')!; }
  get signLocation() { return this.agencyBoardForm.get('signLocation')!; }
  get agencyBoardType() { return this.agencyBoardForm.get('agencyBoardType')!; }
  get boardType() { return this.agencyBoardForm.get('boardType')!; }
  get sharedCompany() { return this.agencyBoardForm.get('sharedCompany')!; }
  get selectedCompany() { return this.agencyBoardForm.get('selectedCompany')!; }
  get mainRoute() { return this.agencyBoardForm.get('mainRoute')!; }
  get connection() { return this.agencyBoardForm.get('connection')!; }


  clearForm() {
    this.agencyBoardForm.reset();
    this.companies = [];
    this.files = [];
    this.showCompanyFields = false;
    this.isSingleCompany = true;
    this.isOtherCompaniesSelected = false;
    this.selectedCompanies = [];
    this.selectedOthersCompanies = [];
  }

  onCompanyChange(type: string) {
    this.isSingleCompany = (type === 'single');
    this.companies = [];
    this.showCompanyFields = true;

    if (this.isSingleCompany) {
      this.agencyBoardForm.patchValue({ selectedCompany: null, otherText: '' });
      this.agencyBoardForm.patchValue({ mainRoute: null, connections: null });

    } else {
      this.agencyBoardForm.patchValue({ mainRoute: null, connections: null });
      this.agencyBoardForm.patchValue({ selectedCompany: null, othersText: '' });
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
    this.agencyBoardForm.get('otherText')?.setValue('');
  }

  updateOtherCompany() {
    const otherValue = this.agencyBoardForm.get('otherText')?.value;
    this.companies = [];
    this.companies.push({ name: otherValue, mainRoutes: [], connections: [], isCustom: true });
  }

  confirmOtherSingleCompany() {
    const otherCompany = this.agencyBoardForm.get('otherText')?.value;
    if (otherCompany && !this.companies.some(c => c.name === otherCompany)) {
      this.companies.push({ name: otherCompany, mainRoutes: [], connections: [], isCustom: true });
      this.agencyBoardForm.get('otherText')?.reset();
    }
  }


  onOthersCompanies() {
    this.isOtherCompaniesSelected = !this.isOtherCompaniesSelected;
    if (!this.isOtherCompaniesSelected) {
      this.agencyBoardForm.get('othersText')?.setValue('');
      this.companies = this.companies.filter(company => company.name !== 'Outras');
    }
  }

  updateOthersCompanies() {
    const otherValue = this.agencyBoardForm.get('othersText')?.value;
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
    const otherCompany = this.agencyBoardForm.get('othersText')?.value;
    if (otherCompany && !this.companies.some(c => c.name === otherCompany)) {
      this.companies.push({
        name: otherCompany,
        mainRoutes: [],
        connections: [],
        isCustom: true
      });
      this.agencyBoardForm.get('othersText')?.reset();
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
    const selectedMainRoute = this.agencyBoardForm.get('mainRoute')?.value;

    if (selectedMainRoute) {
      const company = this.companies.find(c => c.name === companyName);
      if (company) {
        const routeExists = company.mainRoutes.includes(selectedMainRoute);
        if (!routeExists) {
          company.mainRoutes.push(selectedMainRoute);
          this.agencyBoardForm.get('mainRoute')?.reset();
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
    const selectedConnection = this.agencyBoardForm.get('connections')?.value;

    if (selectedConnection) {
      const company = this.companies.find(c => c.name === companyName);
      if (company) {
        const connectionExists = company.connections.includes(selectedConnection);
        if (!connectionExists) {
          company.connections.push(selectedConnection);
          this.agencyBoardForm.get('connections')?.reset();
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
        idCompany: Company[companyName as keyof typeof Company],
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
      detailedDescription: this.agencyBoardForm.get('description')?.value,
      companies: this.selectedCompanies,
      otherCompany: this.selectedOthersCompanies.join(', '),
      idBriefingType: '1',
      measurement: {
        length: this.agencyBoardForm.get('length')?.value,
        height: this.agencyBoardForm.get('height')?.value,
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
      idAgencyBoardType: this.agencyBoardForm.get('agencyBoardType')?.value.toString(),
      boardLocation: this.agencyBoardForm.get('signLocation')?.value,
      observation: this.agencyBoardForm.get('observation')?.value,
      idBoardType: this.agencyBoardForm.get('boardType')?.value.toString(),
      routes: agencyBoardRoutes,
      othersRoutes: agencyBoardOthersRoutes,
    }

    return { projectForm: projectForm, briefingForm: briefingForm, bAgencyBoardsForm: bAgencyBoardsForm };


  }

  submit() {
    if (this.agencyBoardForm.invalid) { return }
    const requestData = this.prepareSubmit();
    this.createRequestService.submitAgencyBoardRequest(requestData.projectForm, requestData.briefingForm, requestData.bAgencyBoardsForm)
      .subscribe({
        next: (response) => {
          this.toastrService.success("Solicitação realizada com sucesso!");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          this.clearForm();
        },
        error: (error) => {
          this.toastrService.error("Erro ao realizar solicitação. Verifique se os campos estão preenchidos corretamente.");
        }
      });
    this.isButtonDisabled = true;
    setTimeout(() => {
      this.isButtonDisabled = false;
    }, 3000);
  }
}