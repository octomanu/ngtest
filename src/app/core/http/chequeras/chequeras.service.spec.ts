import { TestBed } from '@angular/core/testing';

import { ChequerasService } from './chequeras.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '@env/environment';

describe('ChequerasService', () => {
  let service: ChequerasService;
  let httpMock: HttpTestingController;

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

  it('Debe devovler el path del backend', () => {
    expect(service.getPath()).toBe('chequeras');
  });

  it('Debe buscar por Display', () => {
    const fakeResponse = {
      foo: true,
    };

    service.searchCheckbook('foo').subscribe((res: any) => {
      expect(res.foo).toBeTruthy();
    });

    const req = httpMock.expectOne(
      `${environment.OCTO_API}/${service.getPath()}/buscar?display=foo`,
    );

    expect(req.request.method).toBe('GET');

    req.flush({ data: fakeResponse });
  });
});
