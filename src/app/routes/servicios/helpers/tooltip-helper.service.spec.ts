import { TestBed } from '@angular/core/testing';

import { TooltipHelperService } from './tooltip-helper.service';

describe('TooltipHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TooltipHelperService = TestBed.get(TooltipHelperService);
    expect(service).toBeTruthy();
  });
});
