import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabecerasFormComponent } from './cabeceras-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule, NzDrawerModule, NzDrawerRef } from 'ng-zorro-antd';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { of } from 'rxjs';

export function I18nHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `assets/tmp/i18n/`, '.json');
}

describe('CabecerasFormComponent', () => {
  let component: CabecerasFormComponent;
  let fixture: ComponentFixture<CabecerasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CabecerasFormComponent],
      providers: [
        { provide: NzDrawerRef, useValue: { afterOpen: of('mockObservable') } },
      ],
      imports: [
        ReactiveFormsModule,
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
    fixture = TestBed.createComponent(CabecerasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
