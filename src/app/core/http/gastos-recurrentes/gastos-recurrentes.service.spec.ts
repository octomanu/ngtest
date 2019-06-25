import { TestBed } from '@angular/core/testing';

import { GastosRecurrentesService } from './gastos-recurrentes.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('GastosRecurrentesService', () => {
  let service: GastosRecurrentesService;
  let httpMock: HttpClientTestingModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(GastosRecurrentesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
