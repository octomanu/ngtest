import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequerasTableComponent } from './chequeras-table.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { KeysPipe } from '@delon/theme';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { I18nHttpLoaderFactory } from 'app/app.module';

describe('ChequerasTableComponent', () => {
  let component: ChequerasTableComponent;
  let fixture: ComponentFixture<ChequerasTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChequerasTableComponent, KeysPipe],
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
    fixture = TestBed.createComponent(ChequerasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
