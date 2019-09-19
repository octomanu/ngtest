import { TestBed } from '@angular/core/testing';

import { DescripcionesFinderService } from './descripciones-finder.service';

describe('DescripcionesFinderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DescripcionesFinderService = TestBed.get(DescripcionesFinderService);
    expect(service).toBeTruthy();
  });
});
