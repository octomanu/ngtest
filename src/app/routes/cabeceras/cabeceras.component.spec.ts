import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabecerasComponent } from './cabeceras.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DelonABCModule, PageHeaderComponent } from '@delon/abc';
import { CabecerasTableComponent } from './cabeceras-table/cabeceras-table.component';
import { KeysPipe } from '@delon/theme';
import { RouterTestingModule } from '@angular/router/testing';
import { CabecerasService } from '@core/http/cabeceras/cabeceras.service';
import { of } from 'rxjs';
import { I18nHttpLoaderFactory } from 'app/app.module';

export class FakeCabecerasService {
  paginate() {
    return of({ ok: true, data: [], recordsFiltered: 0 });
  }
}

describe('CabecerasComponent', () => {
  let component: CabecerasComponent;
  let fixture: ComponentFixture<CabecerasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CabecerasComponent,
        CabecerasTableComponent,
        KeysPipe,
        PageHeaderComponent,
      ],
      providers: [
        { provide: CabecerasService, useClass: FakeCabecerasService },
      ],
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
    fixture = TestBed.createComponent(CabecerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
