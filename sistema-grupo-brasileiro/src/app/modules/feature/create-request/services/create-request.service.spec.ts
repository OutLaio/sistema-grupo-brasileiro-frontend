import { TestBed } from '@angular/core/testing';

import { CreateRequestService } from './create-request.service';

describe('CreateRequestService', () => {
  let service: CreateRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
