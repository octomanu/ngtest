import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcentualesFormComponent } from './procentuales-form.component';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {
  NgZorroAntdModule,
  NzDrawerRef,
  NzMessageService,
} from 'ng-zorro-antd';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { PorcentajesConsorciosService } from '@core/http/porcentajes_consorcios/porcentajes-consorcios.service';

export class FakeNzDrawerRef {
  close(result?: any) {
    return of('muehehe');
  }
}

export class FakePorcentajesConsorciosService {
  paginate() {
    return of({ ok: true, data: [], recordsFiltered: 0 });
  }

  create(data) {
    return of([]);
  }

  update(id, data) {
    return of([]);
  }

  setConsorcio(id) {}

  find(id) {
    return of({
      data: {
        id,
        nombre: 'test',
        descripcion: 'test',
        oculto_en_expensa: false,
        posicion: 1,
        es_gasto_particular: false,
        oculto_en_prorateo: false,
        ocultar_porcentaje: false,
      },
    });
  }
}

describe('ProcentualesFormComponent', () => {
  let component: ProcentualesFormComponent;
  let fixture: ComponentFixture<ProcentualesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProcentualesFormComponent],
      providers: [
        { provide: NzDrawerRef, useClass: FakeNzDrawerRef },
        {
          provide: PorcentajesConsorciosService,
          useClass: FakePorcentajesConsorciosService,
        },
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
    fixture = TestBed.createComponent(ProcentualesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe crear un registro', () => {
    const service = TestBed.get(PorcentajesConsorciosService);
    const msg = TestBed.get(NzMessageService);

    const spy = spyOn(service, 'create').and.returnValue(of([]));
    const spyMsg = spyOn(msg, 'success').and.returnValue(of([]));

    component.submit();
    expect(spy).toHaveBeenCalled();
    expect(spyMsg).toHaveBeenCalled();
  });

  it('debe editar un registro', () => {
    const service = TestBed.get(PorcentajesConsorciosService);
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
