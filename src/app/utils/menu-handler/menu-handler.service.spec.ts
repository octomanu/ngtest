import { TestBed } from '@angular/core/testing';

import { MenuHandlerService } from './menu-handler.service';

describe('MenuHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuHandlerService = TestBed.get(MenuHandlerService);
    expect(service).toBeTruthy();
  });
});
