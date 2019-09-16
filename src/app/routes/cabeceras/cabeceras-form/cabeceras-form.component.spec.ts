import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CabecerasFormComponent } from './cabeceras-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NgZorroAntdModule,
  NzDrawerRef,
  NzMessageService,
} from 'ng-zorro-antd';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of, Subject } from 'rxjs';
import { CabecerasService } from '@core/http/cabeceras/cabeceras.service';
import { I18nHttpLoaderFactory } from 'app/app.module';

export class FakeCabecerasService {
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
        cuit: 'test',
        nombre: 'test',
        direccion: 'test',
        email: 'test',
        telefono: 'test',
        situacion_fiscal: 'test',
        codigo_postal: 'test',
        rpa: 'test',
      },
    });
  }
}

describe('CabecerasFormComponent', () => {
  let component: CabecerasFormComponent;
  let fixture: ComponentFixture<CabecerasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CabecerasFormComponent],
      providers: [
        { provide: NzDrawerRef, useValue: { afterOpen: of('mockObservable') } },
        { provide: CabecerasService, useClass: FakeCabecerasService },
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
    fixture = TestBed.createComponent(CabecerasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe crear un registro', () => {
    const service = TestBed.get(CabecerasService);
    const msg = TestBed.get(NzMessageService);

    const spy = spyOn(service, 'create').and.returnValue(of([]));
    const spyMsg = spyOn(msg, 'success').and.returnValue(of([]));

    // component.valueChange = new Subject();
    // component.valueChange.subscribe(data => {
    //   expect(data.submit).toBeTruthy();
    // });
    component.submit();
    expect(spy).toHaveBeenCalled();
    expect(spyMsg).toHaveBeenCalled();
  });

  it('debe editar un registro', () => {
    const service = TestBed.get(CabecerasService);
    const msg = TestBed.get(NzMessageService);

    const spy = spyOn(service, 'update').and.returnValue(of([]));
    const spyMsg = spyOn(msg, 'success').and.returnValue(of([]));
    // component.id = 4;
    component.ngOnInit();
    component.submit();
    expect(spy).toHaveBeenCalled();
    expect(spyMsg).toHaveBeenCalled();
  });
});
