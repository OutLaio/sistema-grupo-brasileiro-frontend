import { TestBed } from '@angular/core/testing';

import { ListClientsService } from './list-clients.service';

describe('ListClientsService', () => {
  let service: ListClientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListClientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
