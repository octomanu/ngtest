import { TestBed } from '@angular/core/testing';

import { OrdenesPagoService } from './ordenes-pago.service';

describe('OrdenesPagoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdenesPagoService = TestBed.get(OrdenesPagoService);
    expect(service).toBeTruthy();
  });
});
