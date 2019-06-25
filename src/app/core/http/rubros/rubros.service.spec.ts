import { TestBed } from '@angular/core/testing';

import { RubrosService } from './rubros.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('RubrosService', () => {
  let service: RubrosService;
  let httpMock: HttpClientTestingModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(RubrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
