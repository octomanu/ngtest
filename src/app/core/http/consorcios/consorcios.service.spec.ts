import { TestBed } from '@angular/core/testing';

import { ConsorciosService } from './consorcios.service';

describe('ConsorciosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsorciosService = TestBed.get(ConsorciosService);
    expect(service).toBeTruthy();
  });
});
