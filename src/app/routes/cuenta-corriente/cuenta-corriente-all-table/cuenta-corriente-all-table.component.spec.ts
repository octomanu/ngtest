import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { CuentaCorrienteAllTableComponent } from './cuenta-corriente-all-table.component';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NgZorroAntdModule, NZ_ICONS, NzDrawerService } from 'ng-zorro-antd';
import { KeysPipe } from '@delon/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, Observable } from 'rxjs';
import { ConsorciosService } from '@core/http/consorcios/consorcios.service';
import { ProveedoresService } from '@core/http/proveedores/proveedores.service';
import { EstadoFinancieroService } from '@core/http/estado-financiero/estado-financiero.service';
import {
  SettingOutline,
  PlusOutline,
  ProfileOutline,
} from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { CuentaCorrienteFormComponent } from '../cuenta-corriente-form/cuenta-corriente-form.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
export class FakeEstadoFinancieroService {
  paginate() {
    return of({ ok: true, data: [], recordsFiltered: 0, totals: [] });
  }
}

export class FakeProveedorService {
  searchProveedor() {
    return of([]);
  }
}

export class FakeConsorciosService {
  searchByDisplay() {
    return of([]);
  }
}

describe('CuentaCorrienteAllTableComponent', () => {
  let component: CuentaCorrienteAllTableComponent;
  let fixture: ComponentFixture<CuentaCorrienteAllTableComponent>;
  const icons: IconDefinition[] = [SettingOutline, PlusOutline, ProfileOutline];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CuentaCorrienteAllTableComponent,
        KeysPipe,
        CuentaCorrienteFormComponent,
      ],
      providers: [
        {
          provide: EstadoFinancieroService,
          useClass: FakeEstadoFinancieroService,
        },
        { provide: ConsorciosService, useClass: FakeConsorciosService },
        { provide: ProveedoresService, useClass: FakeProveedorService },
        { provide: NZ_ICONS, useValue: icons },
      ],
      imports: [
        NgZorroAntdModule,
        BrowserAnimationsModule,
        FormsModule,
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
        entryComponents: [CuentaCorrienteFormComponent],
      },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteAllTableComponent);
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

  it('Debe buscar las ufs', fakeAsync(() => {
    const spyFunc = spyOn(component, 'searchConsorciosList');
    component.searchConsorcios('');
    tick(400);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.timeout).toBeNull();
      expect(component.isLoading).toBeTruthy();
      expect(spyFunc).toHaveBeenCalled();
    });
  }));

  it('Debe buscar los proveedores', fakeAsync(() => {
    const spyFunc = spyOn(component, 'searchProveedorList');
    component.searchProveedores('');
    tick(400);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.timeout).toBeNull();
      expect(component.isLoading).toBeTruthy();
      expect(spyFunc).toHaveBeenCalled();
    });
  }));

  it('al cambiar la configuracion de la cuenta corriente debe buscar los datos', () => {
    const spyFunc = spyOn(component, 'searchData');
    component.changeCuentaCorrienteConfig();
    expect(spyFunc).toHaveBeenCalled();
  });
});
