import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsorcioFormComponent } from './consorcio-form.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { I18nHttpLoaderFactory } from 'app/app.module';
import {
  NgZorroAntdModule,
  NzDrawerRef,
  NzMessageService,
} from 'ng-zorro-antd';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ConsorciosService } from '@core/http/consorcios/consorcios.service';

export class FakeNzDrawerRef {
  close(result?: any) {
    return of('muehehe');
  }
}

export class FakeConsorciosService {
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
        id,
        calle: 'test',
        cantidad_pisos: 'test',
        cantidad_ufs: 'test',
        codigo: 'test',
        codigo_postal: 'test',
        codigo_siro: 'test',
        codigo_suterh: 'test',
        cuit: 'test',
        dia_comienzo: 'test',
        estado: 'test',
        id_provincia: 'test',
        nombre_fantasia: 'test',
        numero_verificacion_siro: 'test',
        razon_social: 'test',
        tipo_edificio: 'test',
        numero: 'test',
      },
    });
  }
}

describe('ConsorcioFormComponent', () => {
  let component: ConsorcioFormComponent;
  let fixture: ComponentFixture<ConsorcioFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConsorcioFormComponent],
      providers: [
        { provide: NzDrawerRef, useClass: FakeNzDrawerRef },
        { provide: ConsorciosService, useClass: FakeConsorciosService },
      ],
      imports: [
        ReactiveFormsModule,
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
    fixture = TestBed.createComponent(ConsorcioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe crear un registro', () => {
    const service = TestBed.get(ConsorciosService);
    const msg = TestBed.get(NzMessageService);

    const spy = spyOn(service, 'create').and.returnValue(of([]));
    const spyMsg = spyOn(msg, 'success').and.returnValue(of([]));

    component.submit();
    expect(spy).toHaveBeenCalled();
    expect(spyMsg).toHaveBeenCalled();
  });

  it('debe editar un registro', () => {
    const service = TestBed.get(ConsorciosService);
    const msg = TestBed.get(NzMessageService);

    const spy = spyOn(service, 'update').and.returnValue(of([]));
    const spyMsg = spyOn(msg, 'success').and.returnValue(of([]));
    component.id = 4;
    component.ngOnInit();
    component.submit();
    expect(spy).toHaveBeenCalled();
    expect(spyMsg).toHaveBeenCalled();
  });

  it('debe devolver los colores necesarios', () => {
    let color: string;
    color = component.getNzColor('PENDIENTE');
    expect(color).toBe('processing');
    color = component.getNzColor('ACTIVO');
    expect(color).toBe('success');
    color = component.getNzColor('INACTIVO');
    expect(color).toBe('warning');
    color = component.getNzColor('BORRADO');
    expect(color).toBe('error');
    color = component.getNzColor('FOOBAR');
    expect(color).toBe('default');
  });
});
