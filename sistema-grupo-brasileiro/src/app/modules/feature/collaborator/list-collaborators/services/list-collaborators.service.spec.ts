import { TestBed } from '@angular/core/testing';

import { ListCollaboratorsService } from './list-collaborators.service';

describe('ListCollaboratorsService', () => {
  let service: ListCollaboratorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListCollaboratorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
