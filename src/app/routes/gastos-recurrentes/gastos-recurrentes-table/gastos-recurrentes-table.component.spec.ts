import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosRecurrentesTableComponent } from './gastos-recurrentes-table.component';
import { KeysPipe } from '@delon/theme';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NgZorroAntdModule } from 'ng-zorro-antd';

describe('GastosRecurrentesTableComponent', () => {
  let component: GastosRecurrentesTableComponent;
  let fixture: ComponentFixture<GastosRecurrentesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GastosRecurrentesTableComponent, KeysPipe],
      imports: [
        NgZorroAntdModule,
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
    fixture = TestBed.createComponent(GastosRecurrentesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
