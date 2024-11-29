import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { CompanyDetails } from '../../interface/company-details';
import { StorageService } from '../../../../services/storage/storage.service';
import { E_Briefing_Type } from '../../../../shared/enums/briefing-types';

import { I_Agency_Board_Request } from '../../../../shared/interfaces/briefing/agency-board/form/agency-board-register-form';
import { I_Briefing_Request } from '../../../../shared/interfaces/project/form/briefing-form';
import { I_Project_Request } from '../../../../shared/interfaces/project/form/project-form';
import { I_Agency_Board_Data } from '../../../../shared/interfaces/briefing/agency-board/form/agency-board-form';
import { I_Company_Briefing_Form_Data } from '../../../../shared/interfaces/company/form/company-briefing-form';
import { I_Agency_Board_Routes } from '../../../../shared/interfaces/briefing/agency-board/form/agency-board-routes-form';
import { I_Agency_Board_Others_Routes } from '../../../../shared/interfaces/briefing/agency-board/form/agency-board-others-routes-form';
import { I_City_Data } from '../../../../shared/interfaces/briefing/agency-board/view/city-view';


import { CreateRequestService } from '../../services/create-request.service';
import { map } from 'rxjs';
import { DataService } from '../../../../services/data/data.service';

enum Company {
  'Rota Transportes' = 1,
  'Cidade Sol' = 2,
  'Via Metro' = 3,
  'Brasileiro' = 4,
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

  isOtherCompanySelected = false;
  isOtherCompaniesSelected = false;
  showCompanyFields: boolean = false;

  listMainRoutes: I_City_Data[] = [];
  listConnections: I_City_Data[] = [];

  // TODO: Adicionar ID para identificação da imagem
  files: { name: string, url: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private createRequestService: CreateRequestService,
    private toastrService: ToastrService,
    private storageService: StorageService,
    private dataService: DataService,
    private router: Router) { }

  ngOnInit(): void {
    this.dataService.getCities().pipe(
      map(cities => cities.data!.map(city => ({ id: city.id, name: city.name })))
    ).subscribe(cities => {
      this.listMainRoutes = cities.sort((a, b) => { return a.name.localeCompare(b.name) });
      this.listConnections = cities;
    });

    this.agencyBoardForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      signLocation: new FormControl('', [Validators.required]),
      length: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')]),
      height: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')]),
      sharedCompany: new FormControl('', [Validators.required]),
      selectedCompany: new FormControl('', [Validators.required]),
      mainRoute: new FormControl(''),
      connections: new FormControl(''),
      observation: new FormControl(''),
      otherText: new FormControl(''),
      othersText: new FormControl(''),
      agencyBoardType: new FormControl('', [Validators.required]),
      boardType: new FormControl('')
    });
    this.agencyBoardForm.get('agencyBoardType')?.valueChanges.subscribe(value => {
      if (value === '2') {
        this.agencyBoardForm.get('boardType')?.setValidators([Validators.required]);
      } else {
        this.agencyBoardForm.get('boardType')?.clearValidators();
      }
      this.agencyBoardForm.get('boardType')?.updateValueAndValidity();
    });
  }

  get title() { return this.agencyBoardForm.get('title')!; }
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
  get observation() { return this.agencyBoardForm.get('observation')!; }


  clearForm() {
    this.agencyBoardForm.reset();
    this.companies = [];
    this.files = [];
    this.showCompanyFields = false;
    this.isSingleCompany = true;
    this.isOtherCompanySelected = false;
    this.isOtherCompanySelected = false;
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
    this.isOtherCompanySelected = !this.isOtherCompanySelected;
    this.isOtherCompanySelected = !this.isOtherCompanySelected;
    if (selectionType === 1) {
      this.companies = [{ name: company, companyMainRoutes: [], companyConnections: [], isCustom: false }];
    } else {
      const existingCompany = this.companies.find(c => c.name === company);
      if (existingCompany) {
        this.companies = this.companies.filter(c => c.name !== company);
      } else {
        this.companies.push({ name: company, companyMainRoutes: [], companyConnections: [], isCustom: false });
      }
    }
  }

  onOtherCompany() {
    this.isOtherCompanySelected = !this.isOtherCompanySelected;
    this.isOtherCompanySelected = !this.isOtherCompanySelected;
    if (this.companies.length > 0)
      this.companies = [];
    this.agencyBoardForm.get('otherText')?.setValue('');
  }

  updateOtherCompany() {
    const otherValue = this.agencyBoardForm.get('otherText')?.value;
    this.companies = [];
    this.companies.push({ name: otherValue, companyMainRoutes: [], companyConnections: [], isCustom: true });
    this.agencyBoardForm.get('otherText')?.reset();
    this.agencyBoardForm.get('otherText')?.reset();
  }

  confirmOtherSingleCompany() {
    const otherCompany = this.agencyBoardForm.get('otherText')?.value;
    if (otherCompany && !this.companies.some(c => c.name === otherCompany)) {
      this.companies.push({ name: otherCompany, companyMainRoutes: [], companyConnections: [], isCustom: true });
      this.agencyBoardForm.get('otherText')?.reset();
      this.isOtherCompanySelected = false;
      this.isOtherCompanySelected = false;
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
        this.agencyBoardForm.get('othersText')?.reset();
        this.agencyBoardForm.get('othersText')?.reset();
      } else {
        this.companies.push({ name: otherValue, companyMainRoutes: [], companyConnections: [], isCustom: true });
        this.agencyBoardForm.get('othersText')?.reset();
        this.agencyBoardForm.get('othersText')?.reset();
      }
    }
  }

  confirmOtherMultiCompany() {
    const otherCompany = this.agencyBoardForm.get('othersText')?.value;
    if (otherCompany && !this.companies.some(c => c.name === otherCompany)) {
      this.companies.push({
        name: otherCompany,
        companyMainRoutes: [],
        companyConnections: [],
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
    const selectedMainRoute: I_City_Data | null = this.agencyBoardForm.get('mainRoute')?.value;

    if (selectedMainRoute) {
      const company = this.companies.find(c => c.name === companyName);
      if (company) {
        const routeExists = company.companyMainRoutes.some(route => route.id === selectedMainRoute.id);
        if (!routeExists) {
          company.companyMainRoutes.push(selectedMainRoute);
          this.agencyBoardForm.get('mainRoute')?.reset();
        }
      }
    }
  }


  removeMainRoute(companyName: string, routeIdToRemove: string) {
    const company = this.companies.find(c => c.name === companyName);
    if (company) {
      const index = company.companyMainRoutes.findIndex(route => route.id === routeIdToRemove);
      if (index !== -1) {
        company.companyMainRoutes.splice(index, 1);
      }
    }
  }


  addConnection(companyName: string) {
    const selectedConnection: I_City_Data | null = this.agencyBoardForm.get('connections')?.value;

    if (selectedConnection) {
      const company = this.companies.find(c => c.name === companyName);
      if (company) {
        const connectionExists = company.companyConnections.some(connection => connection.id === selectedConnection.id);
        if (!connectionExists) {
          company.companyConnections.push(selectedConnection);
          this.agencyBoardForm.get('connections')?.reset();
        }
      }
    }
  }



  removeConnection(companyName: string, connectionIdToRemove: string) {
    const company = this.companies.find(c => c.name === companyName);
    if (company) {
      const index = company.companyConnections.findIndex(connection => connection.id === connectionIdToRemove);
      if (index !== -1) {
        company.companyConnections.splice(index, 1);
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
      idClient: this.storageService.getUserId(),
      title: this.title.value,
    }

    const briefingForm: I_Briefing_Request = {
      detailedDescription: this.agencyBoardForm.get('description')?.value,
      companies: this.selectedCompanies,
      otherCompany: this.selectedOthersCompanies.join(', '),
      idBriefingType: E_Briefing_Type.ITINERARIOS.id,
      measurement: {
        length: this.length.value,
        height: this.height.value,
      }
    }

    const companyMainRoutes: I_Agency_Board_Routes[] = this.companies.flatMap(company => {
      if (!company.isCustom) {
        return [{
          idCompany: Company[company.name as keyof typeof Company],
          idCities: company.companyMainRoutes.map(route => route.id),
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
          idCities: company.companyConnections.map(connection => connection.id),
          type: 'connection',
        }];
      } else {
        return [];
      }
    });

    const agencyBoardRoutes: I_Agency_Board_Routes[] = [...companyMainRoutes, ...connections];

    const mainOthersRoutes: I_Agency_Board_Others_Routes[] = this.companies.flatMap(company => {
      if (company.isCustom) {
        return company.companyMainRoutes.map(route => ({
          company: company.name,
          city: route.name,
          type: 'main',
        }));
      } else {
        return [];
      }
    });

    const othersConnections: I_Agency_Board_Others_Routes[] = this.companies.flatMap(company => {
      if (company.isCustom) {
        return company.companyConnections.map(route => ({
          company: company.name,
          city: route.name,
          type: 'connection',
        }));
      } else {
        return [];
      }
    });

    const agencyBoardOthersRoutes: I_Agency_Board_Others_Routes[] = [...mainOthersRoutes, ...othersConnections];

    const bAgencyBoardsForm: I_Agency_Board_Data = {
      idAgencyBoardType: this.agencyBoardType?.value.toString(),
      boardLocation: this.signLocation?.value,
      observation: this.observation!.value,
      idBoardType: this.boardType?.value.toString(),
      routes: agencyBoardRoutes,
      othersRoutes: agencyBoardOthersRoutes,
    }

    return { projectForm: projectForm, briefingForm: briefingForm, bAgencyBoardsForm: bAgencyBoardsForm }
  }

  validateCompanies(): boolean {
    return this.companies.every(company =>
      company.name &&
      company.companyMainRoutes.length > 0 &&
      company.companyConnections.length > 0 &&
      typeof company.isCustom === 'boolean'
    );
  }

  submit() {
    if (this.agencyBoardForm.invalid || !this.validateCompanies()) {
      this.toastrService.error("Erro ao realizar solicitação. Verifique se os campos estão preenchidos corretamente.");
      this.isButtonDisabled = true;
      setTimeout(() => {
        this.isButtonDisabled = false;
      }, 3000);
      return;
    }
    const requestData = this.prepareSubmit();
    this.createRequestService.submitAgencyBoardRequest(requestData)
      .subscribe({
        next: (response) => {
          this.toastrService.success(response.message);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        },
        error: (err: HttpErrorResponse) => {
          this.toastrService.error(err.error.message);
        }
      });
    this.isButtonDisabled = true;
    setTimeout(() => {
      this.isButtonDisabled = false;
    }, 3000);
  }
}
