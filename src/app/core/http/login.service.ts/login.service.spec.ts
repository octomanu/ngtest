import { TestBed } from '@angular/core/testing';

import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login.service';
import { environment } from '@env/environment';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debe poder loguearse. ', () => {
    const fakeResponse = {
      ok: true,
    };

    service.login('foo@bar.com', '123456').subscribe((res: any) => {
      expect(res.ok).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.OCTO_API}/auth/login`);
    expect(req.request.method).toBe('POST');

    req.flush(fakeResponse);
  });

  it('Debe renovar el token expirado. ', () => {
    const fakeResponse = {
      ok: true,
    };

    service.renovarToken().subscribe((res: any) => {
      expect(res.ok).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.OCTO_API}/auth/renovar`);
    expect(req.request.method).toBe('GET');

    req.flush(fakeResponse);
  });
});
