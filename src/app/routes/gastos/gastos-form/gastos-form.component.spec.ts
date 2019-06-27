import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosFormComponent } from './gastos-form.component';
import { NzDrawerRef, NgZorroAntdModule } from 'ng-zorro-antd';
import { of } from 'rxjs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { I18nHttpLoaderFactory, LANG_PROVIDES } from 'app/app.module';
import { GastosService } from '@core/http/gastos/gastos.service';

export class FakeGastosService {
  paginate() {
    return of({ ok: true, data: [], recordsFiltered: 0 });
  }
}

describe('GastosFormComponent', () => {
  let component: GastosFormComponent;
  let fixture: ComponentFixture<GastosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GastosFormComponent],
      providers: [
        { provide: NzDrawerRef, useValue: { afterOpen: of('mockObservable') } },
        { provide: GastosService, useClass: FakeGastosService },
        LANG_PROVIDES,
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgZorroAntdModule,
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
    fixture = TestBed.createComponent(GastosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
