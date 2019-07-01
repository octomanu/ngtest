import { TestBed } from '@angular/core/testing';

import { PorcentajesConsorciosService } from './porcentajes-consorcios.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '@env/environment';

describe('PorcentajesConsorciosService', () => {
  let service: PorcentajesConsorciosService;
  let httpMock: HttpTestingController;

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

  it('Debe devovler el path del backend', () => {
    expect(() => {
      service.getPath();
    }).toThrow(new Error('No hay consorcio seteado.'));

    service.setConsorcio('4');
    expect(service.getPath()).toBe('porcentajes-consorcios/4');
  });

  it('Debe buscar por Display', () => {
    const fakeResponse = {
      foo: true,
    };
    service.setConsorcio('4');
    service.searchByDisplay('foo').subscribe((res: any) => {
      expect(res.foo).toBeTruthy();
    });
    const req = httpMock.expectOne(
      `${environment.OCTO_API}/${service.getPath()}/buscar?display=foo`,
    );
    expect(req.request.method).toBe('GET');

    req.flush({ data: fakeResponse });
  });
});
