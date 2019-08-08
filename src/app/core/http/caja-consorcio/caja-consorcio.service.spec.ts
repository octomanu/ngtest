import { TestBed } from '@angular/core/testing';

import { CajaConsorcioService } from './caja-consorcio.service';

describe('CajaConsorcioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CajaConsorcioService = TestBed.get(CajaConsorcioService);
    expect(service).toBeTruthy();
  });
});
