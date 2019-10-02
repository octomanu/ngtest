import { TestBed } from '@angular/core/testing';

import { ProvinciasFinderService } from './provincias-finder.service';

describe('ProvinciasFinderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProvinciasFinderService = TestBed.get(ProvinciasFinderService);
    expect(service).toBeTruthy();
  });
});
