import { TestBed } from '@angular/core/testing';

import { EstadoFinancieroProveedoresService } from './estado-financiero-proveedores.service';

describe('EstadoFinancieroProveedoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstadoFinancieroProveedoresService = TestBed.get(EstadoFinancieroProveedoresService);
    expect(service).toBeTruthy();
  });
});
