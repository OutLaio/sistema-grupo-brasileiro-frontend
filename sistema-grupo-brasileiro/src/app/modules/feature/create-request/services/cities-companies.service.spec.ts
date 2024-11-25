import { TestBed } from '@angular/core/testing';

import { CitiesCompaniesService } from './cities-companies.service';

describe('CitiesCompaniesService', () => {
  let service: CitiesCompaniesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitiesCompaniesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
