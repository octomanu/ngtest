import { TestBed } from '@angular/core/testing';

import { MovimientosService } from './movimientos.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('MovimientosService', () => {
  let service: MovimientosService;
  let httpMock: HttpClientTestingModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(MovimientosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
