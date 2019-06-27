import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosRecurrentesComponent } from './gastos-recurrentes.component';
import { KeysPipe } from '@delon/theme';
import { PageHeaderComponent } from '@delon/abc';
import { GastosRecurrentesTableComponent } from './gastos-recurrentes-table/gastos-recurrentes-table.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NgZorroAntdModule } from 'ng-zorro-antd';

describe('GastosRecurrentesComponent', () => {
  let component: GastosRecurrentesComponent;
  let fixture: ComponentFixture<GastosRecurrentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastosRecurrentesComponent, KeysPipe, PageHeaderComponent, GastosRecurrentesTableComponent ],
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
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastosRecurrentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
