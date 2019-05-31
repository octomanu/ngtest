import { TestBed } from '@angular/core/testing';

import { UnidadesFuncionalesService } from './unidades-funcionales.service';

describe('UnidadesFuncionalesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnidadesFuncionalesService = TestBed.get(UnidadesFuncionalesService);
    expect(service).toBeTruthy();
  });
});
