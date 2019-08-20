import { TestBed } from '@angular/core/testing';

import { CuentaCorrienteProveedorService } from './cuenta-corriente-proveedor.service';

describe('CuentaCorrienteProveedorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CuentaCorrienteProveedorService = TestBed.get(CuentaCorrienteProveedorService);
    expect(service).toBeTruthy();
  });
});
