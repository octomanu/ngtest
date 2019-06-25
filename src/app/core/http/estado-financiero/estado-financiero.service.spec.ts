import { TestBed } from '@angular/core/testing';

import { EstadoFinancieroService } from './estado-financiero.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('EstadoFinancieroProveedoresService', () => {
  let service: EstadoFinancieroService;
  let httpMock: HttpClientTestingModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(EstadoFinancieroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
