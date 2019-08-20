import { TestBed } from '@angular/core/testing';

import { CuentaCorrienteConsorcioService } from './cuenta-corriente-consorcio.service';

describe('CuentaCorrienteConsorcioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CuentaCorrienteConsorcioService = TestBed.get(CuentaCorrienteConsorcioService);
    expect(service).toBeTruthy();
  });
});
