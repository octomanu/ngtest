import { TestBed } from '@angular/core/testing';

import { ChequerasService } from './chequeras.service';

describe('ChequerasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChequerasService = TestBed.get(ChequerasService);
    expect(service).toBeTruthy();
  });
});
