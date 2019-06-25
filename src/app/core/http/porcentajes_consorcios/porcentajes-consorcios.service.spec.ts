import { TestBed } from '@angular/core/testing';

import { PorcentajesConsorciosService } from './porcentajes-consorcios.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('PorcentajesConsorciosService', () => {
  let service: PorcentajesConsorciosService;
  let httpMock: HttpClientTestingModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(PorcentajesConsorciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
