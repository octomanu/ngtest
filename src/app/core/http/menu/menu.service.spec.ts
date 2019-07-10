import { TestBed } from '@angular/core/testing';

import { MenuService } from './menu.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '@env/environment';

describe('MenuService', () => {
  let service: MenuService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(MenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debe obtener menu', () => {
    const fakeResponse = {
      foo: true,
    };

    service.getMenu().subscribe((res: any) => {
      expect(res.foo).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.OCTO_API}/menu`);
    expect(req.request.method).toBe('GET');
    req.flush({ data: fakeResponse });
  });

  it('debe atajar el error al obtener menu', () => {
    const fakeError = new ErrorEvent('fake_error');

    service
      .getMenu()
      .subscribe(res => res, error => expect(error.error).toBe(fakeError));

    const req = httpMock.expectOne(`${environment.OCTO_API}/menu`);
    expect(req.request.method).toBe('GET');
    req.error(fakeError);
  });

  it('debe actualizar el menu', () => {
    const fakeResponse = {
      foo: true,
    };

    service.update([]).subscribe((res: any) => {
      expect(res.foo).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.OCTO_API}/menu`);
    expect(req.request.method).toBe('POST');
    req.flush(fakeResponse);
  });

  it('debe atajar el error al actualizar el menu', () => {
    const fakeError = new ErrorEvent('fake_error');

    service
      .update([])
      .subscribe(res => res, error => expect(error.error).toBe(fakeError));

    const req = httpMock.expectOne(`${environment.OCTO_API}/menu`);
    expect(req.request.method).toBe('POST');
    req.error(fakeError);
  });
});
