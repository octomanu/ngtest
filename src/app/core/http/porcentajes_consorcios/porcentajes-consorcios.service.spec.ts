import { TestBed } from '@angular/core/testing';

import { PorcentajesConsorciosService } from './porcentajes-consorcios.service';

describe('PorcentajesConsorciosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PorcentajesConsorciosService = TestBed.get(PorcentajesConsorciosService);
    expect(service).toBeTruthy();
  });
});
