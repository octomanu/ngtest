import { TestBed } from '@angular/core/testing';

import { SueldosService } from './sueldos.service';

describe('SueldosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SueldosService = TestBed.get(SueldosService);
    expect(service).toBeTruthy();
  });
});
