import { TestBed } from '@angular/core/testing';

import { PeriodosService } from './periodos.service';

describe('PeriodosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PeriodosService = TestBed.get(PeriodosService);
    expect(service).toBeTruthy();
  });
});
