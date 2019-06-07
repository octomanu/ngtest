import { TestBed } from '@angular/core/testing';

import { RubrosService } from './rubros.service';

describe('RubrosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RubrosService = TestBed.get(RubrosService);
    expect(service).toBeTruthy();
  });
});
