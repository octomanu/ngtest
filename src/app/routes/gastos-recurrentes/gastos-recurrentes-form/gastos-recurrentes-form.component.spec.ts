import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosRecurrentesFormComponent } from './gastos-recurrentes-form.component';
import {
  NzDrawerRef,
  NgZorroAntdModule,
  NzMessageService,
} from 'ng-zorro-antd';
import { of, Subject } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { I18nHttpLoaderFactory, LANG_PROVIDES } from 'app/app.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConsorciosService } from '@core/http/consorcios/consorcios.service';
import { ProveedoresService } from '@core/http/proveedores/proveedores.service';
import { GastosRecurrentesService } from '@core/http/gastos-recurrentes/gastos-recurrentes.service';
import { PorcentajesConsorciosService } from '@core/http/porcentajes_consorcios/porcentajes-consorcios.service';

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

export class FakeGastosRecurrentesService {
  paginate() {
    return of({ ok: true, data: [], recordsFiltered: 0 });
  }

  create(data) {
    return of([]);
  }

  update(id, data) {
    return of([]);
  }

  find(id) {
    return of({
      data: {
        name: 'test',
        description: 'test',
        id_consorcio: 'test',
        id_proveedor: 'test',
        id_porcentaje_consorcio: 'test',
        periodicidad: 'test',
        tipo: 'test',
        descripcion: 'test',
        valor: 'test',
        fecha_primer_pago: '2019-10-10',
        fecha_limite: '2019-10-10',
        mes_comienzo: 'test',
      },
    });
  }
}

describe('GastosRecurrentesFormComponent', () => {
  let component: GastosRecurrentesFormComponent;
  let fixture: ComponentFixture<GastosRecurrentesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GastosRecurrentesFormComponent],
      providers: [
        { provide: ConsorciosService, useClass: FakeConsorciosService },
        {
          provide: GastosRecurrentesService,
          useClass: FakeGastosRecurrentesService,
        },
        { provide: ProveedoresService, useClass: FakeProveedorService },
        { provide: NzDrawerRef, useValue: { afterOpen: of('mockObservable') } },
        LANG_PROVIDES,
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
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
    fixture = TestBed.createComponent(GastosRecurrentesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe crear un registro', () => {
    const service = TestBed.get(GastosRecurrentesService);
    const msg = TestBed.get(NzMessageService);

    const spy = spyOn(service, 'create').and.returnValue(of([]));
    const spyMsg = spyOn(msg, 'success').and.returnValue(of([]));

    component.valueChange = new Subject();
    component.valueChange.subscribe(data => {
      expect(data.submit).toBeTruthy();
    });
    component.submit();
    expect(spy).toHaveBeenCalled();
    expect(spyMsg).toHaveBeenCalled();
  });

  it('debe editar un registro', () => {
    const service = TestBed.get(GastosRecurrentesService);
    const msg = TestBed.get(NzMessageService);

    const spy = spyOn(service, 'update').and.returnValue(of([]));
    const spyMsg = spyOn(msg, 'success').and.returnValue(of([]));
    component.id = 4;
    component.ngOnInit();
    component.form.value.id = 4;
    component.submit();
    expect(spy).toHaveBeenCalled();
    expect(spyMsg).toHaveBeenCalled();
  });

  it('Debe cambiar el listado de procentuales al cambiar el consorcio', () => {
    const spyFunc = spyOn(component, 'searchPorcentajesList');
    component.changeConsorcio();
    expect(component.porcentajes.length).toBe(0);
    component.form.get('id_consorcio').setValue(4);
    component.changeConsorcio();
    expect(spyFunc).toHaveBeenCalled();
  });

  it('Debe buscar los consorcios', async(() => {
    const spyFunc = spyOn(component, 'searchConsorciosList');
    component.searchConsorcios('');

    setTimeout(() => {
      expect(component.timeout).toBeNull();
      expect(component.isLoading).toBeTruthy();
      expect(spyFunc).toHaveBeenCalled();
    }, 420);
  }));

  it('Debe buscar los proveedores', async(() => {
    const spyFunc = spyOn(component, 'searchProveedorList');
    component.searchProveedores('');

    setTimeout(() => {
      expect(component.timeout).toBeNull();
      expect(component.isLoading).toBeTruthy();
      expect(spyFunc).toHaveBeenCalled();
    }, 420);
  }));

  it('Debe buscar los porcentajes', async(() => {
    const spyFunc = spyOn(component, 'searchPorcentajesList');
    component.searchPorcentajes('');

    setTimeout(() => {
      expect(component.timeout).toBeNull();
      expect(component.isLoading).toBeTruthy();
      expect(spyFunc).toHaveBeenCalled();
    }, 420);
  }));

  it('Debe bucar el listado de porcentajes mediante el servicio', () => {
    const service = TestBed.get(PorcentajesConsorciosService);
    const spy = spyOn(service, 'searchByDisplay').and.returnValue(of([]));
    component.searchPorcentajesList('');
    expect(spy).toHaveBeenCalled();
  });
});
