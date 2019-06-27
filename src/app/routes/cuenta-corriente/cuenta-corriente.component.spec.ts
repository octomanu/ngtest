import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteComponent } from './cuenta-corriente.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { PageHeaderComponent } from '@delon/abc';
import { KeysPipe } from '@delon/theme';
import { CuentaCorrienteAllTableComponent } from './cuenta-corriente-all-table/cuenta-corriente-all-table.component';
import { CuentaCorrienteTableComponent } from './cuenta-corriente-table/cuenta-corriente-table.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CuentaCorrienteComponent', () => {
  let component: CuentaCorrienteComponent;
  let fixture: ComponentFixture<CuentaCorrienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CuentaCorrienteComponent,
        PageHeaderComponent,
        KeysPipe,
        CuentaCorrienteAllTableComponent,
        CuentaCorrienteTableComponent,
      ],
      imports: [
        NgZorroAntdModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
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
    fixture = TestBed.createComponent(CuentaCorrienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
