import { TestBed } from '@angular/core/testing';

import { ChequesService } from './cheques.service';

describe('ChequesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChequesService = TestBed.get(ChequesService);
    expect(service).toBeTruthy();
  });
});
