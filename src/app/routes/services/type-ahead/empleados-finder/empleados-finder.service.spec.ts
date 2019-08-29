import { TestBed } from '@angular/core/testing';

import { EmpleadosFinderService } from './empleados-finder.service';

describe('EmpleadosFinderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmpleadosFinderService = TestBed.get(EmpleadosFinderService);
    expect(service).toBeTruthy();
  });
});
