import { TestBed } from '@angular/core/testing';

import { JuiciosService } from './juicios.service';

describe('JuiciosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JuiciosService = TestBed.get(JuiciosService);
    expect(service).toBeTruthy();
  });
});
