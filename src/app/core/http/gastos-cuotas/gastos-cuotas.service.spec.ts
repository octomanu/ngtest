import { TestBed } from '@angular/core/testing';

import { GastosCuotasService } from './gastos-cuotas.service';

describe('GastosCuotasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GastosCuotasService = TestBed.get(GastosCuotasService);
    expect(service).toBeTruthy();
  });
});
