import { TestBed } from '@angular/core/testing';

import { BackendErrorMessageBuilderService } from './backend-error-message-builder.service';

describe('BackendErrorMessageBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackendErrorMessageBuilderService = TestBed.get(BackendErrorMessageBuilderService);
    expect(service).toBeTruthy();
  });
});
