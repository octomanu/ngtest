import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TabPorcentualesComponent } from './tab-porcentuales.component';
import { NgZorroAntdModule, NzDrawerService } from 'ng-zorro-antd';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { KeysPipe } from '@delon/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of, Observable } from 'rxjs';
import { PorcentajesConsorciosService } from '@core/http/porcentajes_consorcios/porcentajes-consorcios.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProcentualesFormComponent } from './procentuales-form/procentuales-form.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

export class FakePorcentajesConsorciosService {
  setConsorcio(id: string) {}
  paginate() {
    return of({ ok: true, data: [], recordsFiltered: 0 });
  }

  delete(id) {}
}

describe('TabPorcentualesComponent', () => {
  let component: TabPorcentualesComponent;
  let fixture: ComponentFixture<TabPorcentualesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TabPorcentualesComponent,
        KeysPipe,
        ProcentualesFormComponent,
      ],
      providers: [
        {
          provide: PorcentajesConsorciosService,
          useClass: FakePorcentajesConsorciosService,
        },
      ],
      imports: [
        NgZorroAntdModule,
        FormsModule,
        ReactiveFormsModule,
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
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ProcentualesFormComponent],
      },
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

  it('debe eliminar un registro', () => {
    const serviceMock = TestBed.get(PorcentajesConsorciosService);
    const spy = spyOn(serviceMock, 'delete').and.returnValue(of('test'));
    component.eliminar(2);
    expect(spy).toHaveBeenCalled();
  });
});
