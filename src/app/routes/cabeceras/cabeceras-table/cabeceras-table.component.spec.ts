import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabecerasTableComponent } from './cabeceras-table.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { KeysPipe } from '@delon/theme';

export function I18nHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `assets/tmp/i18n/`, '.json');
}

describe('CabecerasTableComponent', () => {
  let component: CabecerasTableComponent;
  let fixture: ComponentFixture<CabecerasTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CabecerasTableComponent, KeysPipe],
      imports: [
        NgZorroAntdModule,
        HttpClientModule,
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
    fixture = TestBed.createComponent(CabecerasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
