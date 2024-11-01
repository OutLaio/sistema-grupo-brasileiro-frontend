import { TestBed } from '@angular/core/testing';

import { CheckRequestsService } from './check-requests.service';

describe('CheckRequestsService', () => {
  let service: CheckRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
