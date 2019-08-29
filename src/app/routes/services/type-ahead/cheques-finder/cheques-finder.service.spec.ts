import { TestBed } from '@angular/core/testing';

import { ChequesFinderService } from './cheques-finder.service';

describe('ChequesFinderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChequesFinderService = TestBed.get(ChequesFinderService);
    expect(service).toBeTruthy();
  });
});
