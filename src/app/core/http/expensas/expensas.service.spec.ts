import { TestBed } from '@angular/core/testing';

import { ExpensasService } from './expensas.service';

describe('ExpensasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpensasService = TestBed.get(ExpensasService);
    expect(service).toBeTruthy();
  });
});
