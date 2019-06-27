import { TestBed } from '@angular/core/testing';

import { BackendErrorMessageBuilderService } from './backend-error-message-builder.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgZorroAntdModule } from 'ng-zorro-antd';

describe('BackendErrorMessageBuilderService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [OverlayModule, NgZorroAntdModule],
    }),
  );

  it('should be created', () => {
    const service: BackendErrorMessageBuilderService = TestBed.get(
      BackendErrorMessageBuilderService,
    );
    expect(service).toBeTruthy();
  });
});
