import { TestBed } from '@angular/core/testing';

import { UfFinderService } from './uf-finder.service';

describe('UfFinderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UfFinderService = TestBed.get(UfFinderService);
    expect(service).toBeTruthy();
  });
});
