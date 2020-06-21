import { TestBed } from '@angular/core/testing';

import { IdentifierService } from './identifier.service';

describe('IdentifierService', () => {
  let service: IdentifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdentifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
