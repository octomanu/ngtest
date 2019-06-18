import { TestBed } from '@angular/core/testing';

import { EstadoFinancieroService } from './estado-financiero.service';

describe('EstadoFinancieroProveedoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstadoFinancieroService = TestBed.get(EstadoFinancieroService);
    expect(service).toBeTruthy();
  });
});
