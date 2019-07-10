import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { EstadoFinancieroTableComponent } from './estado-financiero-table.component';
import { KeysPipe } from '@delon/theme';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EstadoFinancieroService } from '@core/http/estado-financiero/estado-financiero.service';
import { of } from 'rxjs';
import { ConsorciosService } from '@core/http/consorcios/consorcios.service';
import { UnidadesFuncionalesService } from '@core/http/unidades-funcionales/unidades-funcionales.service';

export class FakeEstadoFinancieroService {
  setSource() {
    return;
  }
  paginate() {
    return of({ ok: true, data: [], recordsFiltered: 0 });
  }

  setId(id) {}
}

export class FakeConsorciosService {
  searchByDisplay() {
    return of([]);
  }
}

export class FakeUnidadesFuncionalesService {
  searchByDisplay() {
    return of([]);
  }
}

describe('EstadoFinancieroTableComponent', () => {
  let component: EstadoFinancieroTableComponent;
  let fixture: ComponentFixture<EstadoFinancieroTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EstadoFinancieroTableComponent, KeysPipe],
      providers: [
        {
          provide: EstadoFinancieroService,
          useClass: FakeEstadoFinancieroService,
        },
        {
          provide: UnidadesFuncionalesService,
          useClass: FakeUnidadesFuncionalesService,
        },
        {
          provide: ConsorciosService,
          useClass: FakeConsorciosService,
        },
      ],
      imports: [
        NgZorroAntdModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterTestingModule.withRoutes([]),
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
    fixture = TestBed.createComponent(EstadoFinancieroTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Al cambiar el consorcio como no hay uno seteado no debe pedir datos al backend', () => {
    const spyOne = spyOn(component, 'searchData');
    component.changeConsorcio();
    expect(spyOne).not.toHaveBeenCalled();
  });

  it('Al cambiar las ufs como no hay una seteada no debe pedir datos al backend', () => {
    const efservice = TestBed.get(EstadoFinancieroService);
    const spyOne = spyOn(component, 'searchData');
    const spyTwo = spyOn(efservice, 'setId');
    const spyThree = spyOn(efservice, 'setSource');

    component.changeUf();
    expect(spyOne).not.toHaveBeenCalled();
    expect(spyTwo).not.toHaveBeenCalled();
    expect(spyThree).not.toHaveBeenCalled();
  });

  it('Debe buscar las ufs', fakeAsync(() => {
    const spyFunc = spyOn(component, 'searchUfsList');
    component.searchUfs('');
    tick(400);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.timeout).toBeNull();
      expect(component.isLoading).toBeTruthy();
      expect(spyFunc).toHaveBeenCalled();
    });
  }));

  it('Debe bucar el listado de ufs mediante el servicio', () => {
    const service = TestBed.get(UnidadesFuncionalesService);
    const spy = spyOn(service, 'searchByDisplay').and.returnValue(of([]));
    component.searchUfsList('');
    expect(spy).toHaveBeenCalled();
  });

  it('debe buscar los datos al backend', () => {
    const estadoFinancieroService = TestBed.get(EstadoFinancieroService);
    const spy = spyOn(estadoFinancieroService, 'paginate').and.returnValue(
      of({
        ok: true,
        data: [{ id: 1, nombre: 'asd' }],
        recordsFiltered: 1,
        totals: [],
      }),
    );
    component.searchData(true);
    expect(spy).toHaveBeenCalled();
    expect(component.tableLambe.total).toBe(1);
    expect(component.tableLambe.data.length).toBe(1);
    expect(component.tableLambe.loading).toBeFalsy();
    expect(component.tableLambe.data[0].id).toBe(1);
    expect(component.tableLambe.data[0].nombre).toBe('asd');
  });
});
