import { TestBed } from '@angular/core/testing';

import { TooltipBuilderService } from './tooltip-builder.service';

describe('TooltipBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TooltipBuilderService = TestBed.get(TooltipBuilderService);
    expect(service).toBeTruthy();
  });
});
