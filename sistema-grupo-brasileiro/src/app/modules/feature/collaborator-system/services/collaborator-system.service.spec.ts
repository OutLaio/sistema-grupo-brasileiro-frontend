import { TestBed } from '@angular/core/testing';

import { CollaboratorSystemService } from './collaborator-system.service';

describe('CollaboratorSystemService', () => {
  let service: CollaboratorSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollaboratorSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
