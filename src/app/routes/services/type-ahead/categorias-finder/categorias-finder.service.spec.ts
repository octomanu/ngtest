import { TestBed } from '@angular/core/testing';

import { CategoriasFinderService } from './categorias-finder.service';

describe('CategoriasFinderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoriasFinderService = TestBed.get(CategoriasFinderService);
    expect(service).toBeTruthy();
  });
});
