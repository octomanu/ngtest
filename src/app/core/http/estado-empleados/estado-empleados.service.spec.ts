import { TestBed } from '@angular/core/testing';

import { EstadoEmpleadosService } from './estado-empleados.service';

describe('EstadoEmpleadosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstadoEmpleadosService = TestBed.get(EstadoEmpleadosService);
    expect(service).toBeTruthy();
  });
});
