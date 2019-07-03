import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosRecurrentesTableComponent } from './gastos-recurrentes-table.component';
import { KeysPipe } from '@delon/theme';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NgZorroAntdModule, NzDrawerService } from 'ng-zorro-antd';
import { of, empty, Observable } from 'rxjs';
import { GastosRecurrentesService } from '@core/http/gastos-recurrentes/gastos-recurrentes.service';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { GastosRecurrentesFormComponent } from '../gastos-recurrentes-form/gastos-recurrentes-form.component';
import { ReactiveFormsModule } from '@angular/forms';

export class FakeGastosRecurrentesService {
  paginate() {
    return of({ ok: true, data: [], recordsFiltered: 0 });
  }
  delete(id: any) {}
}

export class FakeNzDrawerService {
  create(options) {
    return { afterClose: empty(), afterOpen: empty() };
  }
}

describe('GastosRecurrentesTableComponent', () => {
  let component: GastosRecurrentesTableComponent;
  let fixture: ComponentFixture<GastosRecurrentesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: GastosRecurrentesService,
          useClass: FakeGastosRecurrentesService,
        },
      ],
      declarations: [
        GastosRecurrentesTableComponent,
        KeysPipe,
        GastosRecurrentesFormComponent,
      ],
      imports: [
        NgZorroAntdModule,
        ReactiveFormsModule,
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
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [GastosRecurrentesFormComponent],
      },
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

  it('Debe abrir el drawer del formulario', () => {
    const fakeDrawerRef = TestBed.get(NzDrawerService);

    const afterOpenObservable = new Observable(subscriber => {
      subscriber.next(null);
    });

    const aferCloseObservable = new Observable(subscriber => {
      subscriber.next(null);
      subscriber.next({ submit: true });
    });

    const spy = spyOn(fakeDrawerRef, 'create').and.returnValue({
      afterClose: aferCloseObservable,
      afterOpen: afterOpenObservable,
    });

    component._openForm();
    expect(spy).toHaveBeenCalled();
  });
});
