import { TestBed } from '@angular/core/testing';

import { ServiciosFinderService } from './servicios-finder.service';

describe('ServiciosFinderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiciosFinderService = TestBed.get(ServiciosFinderService);
    expect(service).toBeTruthy();
  });
});
