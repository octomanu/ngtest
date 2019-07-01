import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { CrudService } from './crud-service.class';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root',
})
export class FakeCrudService extends CrudService {
  constructor(http: HttpClient) {
    super(http);
  }
}
@Injectable({
  providedIn: 'root',
})
export class FakeCrudServiceTwo extends CrudService {
  constructor(http: HttpClient) {
    super(http);
  }

  getPath() {
    return 'fake/endpoint';
  }
}

describe('CrudService', () => {
  let service: CrudService;
  let serviceTwo: FakeCrudServiceTwo;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: FakeCrudService, useClass: FakeCrudService },
        { provide: FakeCrudServiceTwo, useClass: FakeCrudServiceTwo },
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.get(FakeCrudService);
    serviceTwo = TestBed.get(FakeCrudServiceTwo);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('el metodo getpath debe arrojar un error si no se sobreescribe', () => {
    expect(() => {
      service.getPath();
    }).toThrow(new Error('Method getPath of CrudService not implemented.'));
  });

  it('Verifico del metodo Paginate la Respuesta, la URL, y el metodo ', () => {
    const fakeResponse = {
      ok: true,
      data: [],
      recordsFiltered: 0,
    };

    serviceTwo
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
      }/${serviceTwo.getPath()}?foo=bar&page=1&page_size=1&sort_field=id&sort_order=desc`,
    );
    expect(req.request.method).toBe('GET');

    req.flush(fakeResponse);
  });

  it('Verifico del metodo Delete, la URL, y el metodo ', () => {
    serviceTwo.delete(1).subscribe((res: any) => {});
    const req = httpMock.expectOne(
      `${environment.OCTO_API}/${serviceTwo.getPath()}/1`,
    );
    expect(req.request.method).toBe('DELETE');
  });

  it('Verifico del metodo Create, la URL,Respuesta, y el metodo ', () => {
    const mockData = {
      name: 'foo',
      apellido: 'bar',
    };

    serviceTwo.create(mockData).subscribe((res: any) => {
      expect(res.name).toBe('foo');
      expect(res.apellido).toBe('bar');
    });

    const req = httpMock.expectOne(
      `${environment.OCTO_API}/${serviceTwo.getPath()}`,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockData);
  });

  it('Verifico del metodo Update, la URL, Respuesta, y el metodo ', () => {
    const mockData = {
      name: 'foo',
      apellido: 'bar',
    };

    serviceTwo.update(1, mockData).subscribe((res: any) => {
      expect(res.name).toBe('foo');
      expect(res.apellido).toBe('bar');
    });

    const req = httpMock.expectOne(
      `${environment.OCTO_API}/${serviceTwo.getPath()}/1`,
    );
    expect(req.request.method).toBe('PUT');
    req.flush(mockData);
  });

  it('Verifico del metodo Find, la URL, Respuesta, y el metodo ', () => {
    const mockData = {
      id: 43,
      name: 'foo',
      apellido: 'bar',
    };

    serviceTwo.find(43).subscribe((res: any) => {
      expect(res.name).toBe('foo');
      expect(res.apellido).toBe('bar');
      expect(res.id).toBe(43);
    });

    const req = httpMock.expectOne(
      `${environment.OCTO_API}/${serviceTwo.getPath()}/mostrar/43`,
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
