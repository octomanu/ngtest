import { TestBed } from '@angular/core/testing';

import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProveedoresService } from './proveedores.service';
import { environment } from '@env/environment';

describe('ProveedoresService', () => {
  let service: ProveedoresService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(ProveedoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debe devovler el path del backend', () => {
    expect(service.getPath()).toBe('proveedores');
  });

  it('Debe buscar por Display', () => {
    const fakeResponse = {
      foo: true,
    };

    service.searchByDisplay('foo').subscribe((res: any) => {
      expect(res.foo).toBeTruthy();
    });

    const req = httpMock.expectOne(
      `${environment.OCTO_API}/${service.getPath()}/buscar?display=foo`,
    );

    expect(req.request.method).toBe('GET');

    req.flush({ data: fakeResponse });
  });

  it('Debe atrapar el error al buscar por Display', () => {
    const fakeError = new ErrorEvent('fake_error');

    service
      .searchByDisplay('foo')
      .subscribe(res => res, error => expect(error.error).toBe(fakeError));

    const req = httpMock.expectOne(
      `${environment.OCTO_API}/${service.getPath()}/buscar?display=foo`,
    );

    expect(req.request.method).toBe('GET');
    req.error(fakeError);
  });
});
