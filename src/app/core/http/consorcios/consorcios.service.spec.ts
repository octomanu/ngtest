import { TestBed } from '@angular/core/testing';

import { ConsorciosService } from './consorcios.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '@env/environment';

describe('ConsorciosService', () => {
  let service: ConsorciosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(ConsorciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debe devovler el path del backend', () => {
    expect(service.getPath()).toBe('consorcios');
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
});
