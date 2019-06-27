import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPorcentualesComponent } from './tab-porcentuales.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { KeysPipe } from '@delon/theme';
import { FormsModule } from '@angular/forms';
import { UnidadesFuncionalesService } from '@core/http/unidades-funcionales/unidades-funcionales.service';
import { of } from 'rxjs';
import { PorcentajesConsorciosService } from '@core/http/porcentajes_consorcios/porcentajes-consorcios.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export class FakePorcentajesConsorciosService {
  setConsorcio(id: string) {}
  paginate() {
    return of({ ok: true, data: [], recordsFiltered: 0 });
  }
}

describe('TabPorcentualesComponent', () => {
  let component: TabPorcentualesComponent;
  let fixture: ComponentFixture<TabPorcentualesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabPorcentualesComponent, KeysPipe],
      providers: [
        {
          provide: PorcentajesConsorciosService,
          useClass: FakePorcentajesConsorciosService,
        },
      ],
      imports: [
        NgZorroAntdModule,
        FormsModule,
        BrowserAnimationsModule,
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
    fixture = TestBed.createComponent(TabPorcentualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
