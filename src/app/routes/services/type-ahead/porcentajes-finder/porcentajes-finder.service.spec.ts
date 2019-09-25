import { TestBed } from '@angular/core/testing';

import { PorcentajesFinderService } from './porcentajes-finder.service';

describe('PorcentajesFinderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PorcentajesFinderService = TestBed.get(PorcentajesFinderService);
    expect(service).toBeTruthy();
  });
});
