import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasFormComponent } from './notas-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {
  NgZorroAntdModule,
  NzDrawerRef,
  NzMessageService,
} from 'ng-zorro-antd';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { I18nHttpLoaderFactory, LANG_PROVIDES } from 'app/app.module';
import { of, Subject } from 'rxjs';
import { NotasService } from '@core/http/notas/notas.service';
import { ChangeDetectorRef } from '@angular/core';

export class FakeNotasService {
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
        titulo: 'test',
        contenido: 'test',
        es_nota_de_deuda: false,
        es_pie_prorrateo: false,
        fecha_limite: '2019-01-01',
      },
    });
  }
}

describe('NotasFormComponent', () => {
  let component: NotasFormComponent;
  let fixture: ComponentFixture<NotasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotasFormComponent],
      providers: [
        { provide: NzDrawerRef, useValue: { afterOpen: of('mockObservable') } },
        { provide: ChangeDetectorRef, useValue: { detectChanges: () => {} } },
        { provide: NotasService, useClass: FakeNotasService },
        LANG_PROVIDES,
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
    fixture = TestBed.createComponent(NotasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe crear un registro', () => {
    const service = TestBed.get(NotasService);
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
    const service = TestBed.get(NotasService);
    const msg = TestBed.get(NzMessageService);

    const spy = spyOn(service, 'update').and.returnValue(of([]));
    const spyMsg = spyOn(msg, 'success').and.returnValue(of([]));

    component.valueChange = new Subject();
    component.id = 4;
    component.ngOnInit();
    component.valueChange.subscribe(data => {
      expect(data.submit).toBeTruthy();
    });

    component.submit();
    expect(spy).toHaveBeenCalled();
    expect(spyMsg).toHaveBeenCalled();
  });
});
