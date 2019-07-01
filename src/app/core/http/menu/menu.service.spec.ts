import { TestBed } from '@angular/core/testing';

import { MenuService } from './menu.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('MenuService', () => {
  let service: MenuService;
  let httpMock: HttpClientTestingModule;

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
  
});
