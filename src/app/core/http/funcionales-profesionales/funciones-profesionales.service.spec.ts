import { TestBed } from '@angular/core/testing';

import { FuncionesProfesionalesService } from './funciones-profesionales.service';

describe('FuncionesProfesionalesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FuncionesProfesionalesService = TestBed.get(FuncionesProfesionalesService);
    expect(service).toBeTruthy();
  });
});
