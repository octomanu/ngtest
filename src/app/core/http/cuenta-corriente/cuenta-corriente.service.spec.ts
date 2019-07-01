import { TestBed } from '@angular/core/testing';

import { CuentaCorrienteService } from './cuenta-corriente.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '@env/environment';

describe('CuentaCorrienteService', () => {
  let service: CuentaCorrienteService;
  let httpMock: HttpTestingController;

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

  it('Verifico del metodo Paginate la Respuesta, la URL, y el metodo ', () => {
    const fakeResponse = {
      ok: true,
      data: [],
      recordsFiltered: 0,
    };

    service
      .paginate(
        {
          page: 1,
          page_size: 1,
          sort_field: 'id',
          sort_order: 'desc',
        },
        { foo: 'bar' },
      )
      .subscribe((res: any) => {
        expect(res.ok).toBeTruthy();
        expect(res.data.length).toBe(0);
        expect(res.recordsFiltered).toBe(0);
      });
    const req = httpMock.expectOne(
      `${
        environment.OCTO_API
      }/cuenta-corriente?foo=bar&page=1&page_size=1&sort_field=id&sort_order=desc`,
    );
    expect(req.request.method).toBe('GET');

    req.flush(fakeResponse);
  });
});
