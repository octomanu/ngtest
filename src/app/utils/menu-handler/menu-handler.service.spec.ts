import { TestBed } from '@angular/core/testing';

import { MenuHandlerService } from './menu-handler.service';
import { HttpClientModule } from '@angular/common/http';

describe('MenuHandlerService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }),
  );

  it('should be created', () => {
    const service: MenuHandlerService = TestBed.get(MenuHandlerService);
    expect(service).toBeTruthy();
  });
});
