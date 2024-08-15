import { TestBed } from '@angular/core/testing';

import { RequestDetailsService } from './request-details.service';

describe('RequestDetailsService', () => {
  let service: RequestDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
