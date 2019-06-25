import { TestBed } from '@angular/core/testing';

import { CuentaCorrienteService } from './cuenta-corriente.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('CuentaCorrienteService', () => {
  let service: CuentaCorrienteService;
  let httpMock: HttpClientTestingModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(CuentaCorrienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
