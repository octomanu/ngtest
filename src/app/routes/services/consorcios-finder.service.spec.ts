import { TestBed } from '@angular/core/testing';

import { ConsorciosFinderService } from './consorcios-finder.service';

describe('ConsorciosFinderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsorciosFinderService = TestBed.get(ConsorciosFinderService);
    expect(service).toBeTruthy();
  });
});
