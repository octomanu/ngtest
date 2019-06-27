import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteFormComponent } from './cuenta-corriente-form.component';
import { NzDrawerRef, NgZorroAntdModule } from 'ng-zorro-antd';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CuentaCorrienteFormComponent', () => {
  let component: CuentaCorrienteFormComponent;
  let fixture: ComponentFixture<CuentaCorrienteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CuentaCorrienteFormComponent],
      providers: [
        { provide: NzDrawerRef, useValue: { afterOpen: of('mockObservable') } },
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
    fixture = TestBed.createComponent(CuentaCorrienteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
