import { TestBed } from '@angular/core/testing';

import { GastosDescripcionesService } from './gastos-descripciones.service';

describe('GastosDescripcionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GastosDescripcionesService = TestBed.get(GastosDescripcionesService);
    expect(service).toBeTruthy();
  });
});
