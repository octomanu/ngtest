import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsorciosProfileComponent } from './consorcios-profile.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { PageHeaderComponent } from '@delon/abc';
import { TabUfComponent } from './profile/tab-uf/tab-uf.component';
import { TabPorcentualesComponent } from './profile/tab-porcentuales/tab-porcentuales.component';
import { KeysPipe } from '@delon/theme';
import { FormsModule } from '@angular/forms';
import { UnidadesFuncionalesService } from '@core/http/unidades-funcionales/unidades-funcionales.service';
import { of } from 'rxjs';
import { PorcentajesConsorciosService } from '@core/http/porcentajes_consorcios/porcentajes-consorcios.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export class FakeUnidadesFuncionalesService {
  setConsorcio(id: string) {}
  paginate() {
    return of({ ok: true, data: [], recordsFiltered: 0 });
  }
}

export class FakePorcentajesConsorciosService {
  setConsorcio(id: string) {}
  paginate() {
    return of({ ok: true, data: [], recordsFiltered: 0 });
  }
}

describe('ConsorciosProfileComponent', () => {
  let component: ConsorciosProfileComponent;
  let fixture: ComponentFixture<ConsorciosProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UnidadesFuncionalesService,
          useClass: FakeUnidadesFuncionalesService,
        },
        {
          provide: PorcentajesConsorciosService,
          useClass: FakePorcentajesConsorciosService,
        },
      ],
      declarations: [
        ConsorciosProfileComponent,
        PageHeaderComponent,
        TabUfComponent,
        TabPorcentualesComponent,
        KeysPipe,
      ],
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
    fixture = TestBed.createComponent(ConsorciosProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
