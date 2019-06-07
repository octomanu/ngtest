import { TestBed } from '@angular/core/testing';

import { GastosRecurrentesService } from './gastos-recurrentes.service';

describe('GastosRecurrentesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GastosRecurrentesService = TestBed.get(GastosRecurrentesService);
    expect(service).toBeTruthy();
  });
});
