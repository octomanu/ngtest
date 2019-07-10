import { TestBed } from '@angular/core/testing';

import { GastosService } from './gastos.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '@env/environment';

describe('GastosService', () => {
  let service: GastosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(GastosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debe devovler el path del backend', () => {
    expect(service.getPath()).toBe('gastos');
  });

  it('Debe buscar el gasto anterior', () => {
    const fakeResponse = {
      id: 4,
      gasto: 'fake_gasto',
    };

    service
      .findPrevious({
        id_proveedor: '4',
        id_consorcio: '1',
        gasto: 'asd',
      })
      .subscribe((res: any) => {
        expect(res.id).toBe(4);
        expect(res.gasto).toBe('fake_gasto');
      });

    const req = httpMock.expectOne(
      `${
        environment.OCTO_API
      }/${service.getPath()}/buscarAnterior?id_proveedor=4&id_consorcio=1&gasto=asd`,
    );

    expect(req.request.method).toBe('GET');
    req.flush({ data: fakeResponse });
  });

  it('Debe atajar el error al buscar el gasto anterior', () => {
    const fakeError = new ErrorEvent('fake_error');

    service
      .findPrevious({
        id_proveedor: '4',
        id_consorcio: '1',
        gasto: 'asd',
      })
      .subscribe(res => res, error => expect(error.error).toBe(fakeError));

    const req = httpMock.expectOne(
      `${
        environment.OCTO_API
      }/${service.getPath()}/buscarAnterior?id_proveedor=4&id_consorcio=1&gasto=asd`,
    );

    expect(req.request.method).toBe('GET');
    req.error(fakeError);
  });
});
