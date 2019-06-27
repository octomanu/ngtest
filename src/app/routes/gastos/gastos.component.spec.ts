import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosComponent } from './gastos.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { KeysPipe } from '@delon/theme';
import { PageHeaderComponent } from '@delon/abc';
import { GastosTableComponent } from './gastos-table/gastos-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('GastosComponent', () => {
  let component: GastosComponent;
  let fixture: ComponentFixture<GastosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GastosComponent,
        KeysPipe,
        PageHeaderComponent,
        GastosTableComponent,
      ],
      imports: [
        NgZorroAntdModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
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
    fixture = TestBed.createComponent(GastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
