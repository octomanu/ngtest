import { TestBed } from '@angular/core/testing';

import { UnidadesFuncionalesService } from './unidades-funcionales.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('UnidadesFuncionalesService', () => {
  let service: UnidadesFuncionalesService;
  let httpMock: HttpClientTestingModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(UnidadesFuncionalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debe devovler el path del backend', () => {
    service.setConsorcio('4');
    expect(service.getPath()).toBe('unidades-funcionales/4');
  });
});
