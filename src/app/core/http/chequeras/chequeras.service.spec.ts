import { TestBed } from '@angular/core/testing';

import { ChequerasService } from './chequeras.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('ChequerasService', () => {
  let service: ChequerasService;
  let httpMock: HttpClientTestingModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(ChequerasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
