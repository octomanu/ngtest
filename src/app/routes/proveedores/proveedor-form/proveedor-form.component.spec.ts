import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProveedorFormComponent } from './proveedor-form.component';
import {
  NzDrawerRef,
  NgZorroAntdModule,
  NzMessageService,
} from 'ng-zorro-antd';
import { ProveedoresService } from '@core/http/proveedores/proveedores.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { of } from 'rxjs';

export class FakeNzDrawerRef {
  close(result?: any) {
    return of('muehehe');
  }
}

export class FakeProveedorService {
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
      id,
      razon_social: 'test',
      nombre_fantasia: 'test',
      direccion: 'test',
      localidad: 'test',
      provincia: 'test',
      codigo_postal: 'test',
      cuit: 'test',
      nota: 'test',
      matricula: 'test',
      horario_atencion: 'test',
      situacion_fiscal: 'test',
    });
  }
}

describe('ProveedorFormComponent', () => {
  let component: ProveedorFormComponent;
  let fixture: ComponentFixture<ProveedorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProveedorFormComponent],
      providers: [
        { provide: ProveedoresService, useClass: FakeProveedorService },
        { provide: NzDrawerRef, useClass: FakeNzDrawerRef },
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
    fixture = TestBed.createComponent(ProveedorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe crear un registro', () => {
    const service = TestBed.get(ProveedoresService);
    const msg = TestBed.get(NzMessageService);

    const spy = spyOn(service, 'create').and.returnValue(of([]));
    const spyMsg = spyOn(msg, 'success').and.returnValue(of([]));

    component.submit();
    expect(spy).toHaveBeenCalled();
    expect(spyMsg).toHaveBeenCalled();
  });

  it('debe editar un registro', () => {
    const service = TestBed.get(ProveedoresService);
    const msg = TestBed.get(NzMessageService);

    const spy = spyOn(service, 'update').and.returnValue(of([]));
    const spyMsg = spyOn(msg, 'success').and.returnValue(of([]));
    component.id = 4;
    component.ngOnInit();
    component.submit();
    expect(spy).toHaveBeenCalled();
    expect(spyMsg).toHaveBeenCalled();
  });
});
