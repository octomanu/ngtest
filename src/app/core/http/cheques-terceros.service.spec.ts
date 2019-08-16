import { TestBed } from '@angular/core/testing';

import { ChequesTercerosService } from './cheques-terceros.service';

describe('ChequesTercerosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChequesTercerosService = TestBed.get(ChequesTercerosService);
    expect(service).toBeTruthy();
  });
});
