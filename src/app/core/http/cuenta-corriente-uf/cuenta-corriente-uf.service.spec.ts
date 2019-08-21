import { TestBed } from '@angular/core/testing';

import { CuentaCorrienteUfService } from './cuenta-corriente-uf.service';

describe('CuentaCorrienteUfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CuentaCorrienteUfService = TestBed.get(CuentaCorrienteUfService);
    expect(service).toBeTruthy();
  });
});
