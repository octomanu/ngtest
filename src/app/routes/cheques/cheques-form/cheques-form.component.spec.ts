import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequesFormComponent } from './cheques-form.component';
import { NgZorroAntdModule, NzDrawerRef } from 'ng-zorro-antd';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChequerasService } from '@core/http/chequeras/chequeras.service';

export class FakeChequerasService {
  searchCheckbook(display: string) {
    return of('');
  }
}

describe('ChequesFormComponent', () => {
  let component: ChequesFormComponent;
  let fixture: ComponentFixture<ChequesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChequesFormComponent],
      providers: [
        { provide: NzDrawerRef, useValue: { afterOpen: of('mockObservable') } },
        { provide: ChequerasService, useClass: FakeChequerasService },
      ],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgZorroAntdModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: I18nHttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
