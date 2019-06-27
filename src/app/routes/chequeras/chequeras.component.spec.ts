import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequerasComponent } from './chequeras.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { PageHeaderComponent } from '@delon/abc';
import { KeysPipe } from '@delon/theme';
import { ChequerasTableComponent } from './chequeras-table/chequeras-table.component';

describe('ChequerasComponent', () => {
  let component: ChequerasComponent;
  let fixture: ComponentFixture<ChequerasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChequerasComponent, ChequerasTableComponent, KeysPipe, PageHeaderComponent],
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
    fixture = TestBed.createComponent(ChequerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
