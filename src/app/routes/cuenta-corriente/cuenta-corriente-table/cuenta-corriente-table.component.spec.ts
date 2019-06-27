import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteTableComponent } from './cuenta-corriente-table.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { KeysPipe } from '@delon/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { DelonABCModule } from '@delon/abc';

describe('CuentaCorrienteTableComponent', () => {
  let component: CuentaCorrienteTableComponent;
  let fixture: ComponentFixture<CuentaCorrienteTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CuentaCorrienteTableComponent, KeysPipe],
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
    fixture = TestBed.createComponent(CuentaCorrienteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
