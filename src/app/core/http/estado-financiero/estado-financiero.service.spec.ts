import { TestBed } from '@angular/core/testing';

import { EstadoFinancieroService } from './estado-financiero.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '@env/environment';

describe('EstadoFinancieroService', () => {
  let service: EstadoFinancieroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(EstadoFinancieroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debe devovler el path del backend', () => {
    expect(service.getPath()).toBe('estado-financiero/all');

    service.setSource('source');
    service.setId('5');
    expect(service.getPath()).toBe('estado-financiero/source/5');
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
      }/estado-financiero/all?foo=bar&page=1&page_size=1&sort_field=id&sort_order=desc`,
    );
    expect(req.request.method).toBe('GET');

    req.flush(fakeResponse);
  });

  it('Debe atrapar el error al Paginar', () => {
    const fakeError = new ErrorEvent('fake_error');

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
      .subscribe(res => res, error => expect(error.error).toBe(fakeError));

    const req = httpMock.expectOne(
      `${
        environment.OCTO_API
      }/estado-financiero/all?foo=bar&page=1&page_size=1&sort_field=id&sort_order=desc`,
    );

    expect(req.request.method).toBe('GET');
    req.error(fakeError);
  });
});
