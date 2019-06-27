import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteAllTableComponent } from './cuenta-corriente-all-table.component';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { KeysPipe } from '@delon/theme';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CuentaCorrienteAllTableComponent', () => {
  let component: CuentaCorrienteAllTableComponent;
  let fixture: ComponentFixture<CuentaCorrienteAllTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CuentaCorrienteAllTableComponent, KeysPipe],
      imports: [
        NgZorroAntdModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([]),
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
    fixture = TestBed.createComponent(CuentaCorrienteAllTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
