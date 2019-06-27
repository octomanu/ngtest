import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoFinancieroTableComponent } from './estado-financiero-table.component';
import { KeysPipe } from '@delon/theme';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EstadoFinancieroService } from '@core/http/estado-financiero/estado-financiero.service';
import { of } from 'rxjs';
import { ConsorciosService } from '@core/http/consorcios/consorcios.service';

export class FakeEstadoFinancieroService {
  setSource() {
    return;
  }
  paginate() {
    return of({ ok: true, data: [], recordsFiltered: 0 });
  }
}

export class FakeConsorciosService {
  searchByDisplay() {
    return of([]);
  }
}

describe('EstadoFinancieroTableComponent', () => {
  let component: EstadoFinancieroTableComponent;
  let fixture: ComponentFixture<EstadoFinancieroTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EstadoFinancieroTableComponent, KeysPipe],
      providers: [
        {
          provide: EstadoFinancieroService,
          useClass: FakeEstadoFinancieroService,
        },
        {
          provide: ConsorciosService,
          useClass: FakeConsorciosService,
        },
      ],
      imports: [
        NgZorroAntdModule,
        HttpClientModule,
        BrowserAnimationsModule,
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
    fixture = TestBed.createComponent(EstadoFinancieroTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
