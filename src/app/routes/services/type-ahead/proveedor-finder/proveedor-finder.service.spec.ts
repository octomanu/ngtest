import { TestBed } from '@angular/core/testing';

import { ProveedorFinderService } from './proveedor-finder.service';

describe('ProveedorFinderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProveedorFinderService = TestBed.get(ProveedorFinderService);
    expect(service).toBeTruthy();
  });
});
