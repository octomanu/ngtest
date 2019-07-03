import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsorcioTableComponent } from './consorcio-table.component';
import { NgZorroAntdModule, NzDrawerService } from 'ng-zorro-antd';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { KeysPipe } from '@delon/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConsorciosService } from '@core/http/consorcios/consorcios.service';
import { of, Observable } from 'rxjs';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ConsorcioFormComponent } from '../consorcio-form/consorcio-form.component';

export class FakeConsorciosService {
  paginate() {
    return of({ ok: true, data: [], recordsFiltered: 0 });
  }

  delete(id: any) {}
}

describe('ConsorcioTableComponent', () => {
  let component: ConsorcioTableComponent;
  let fixture: ComponentFixture<ConsorcioTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConsorcioTableComponent, KeysPipe, ConsorcioFormComponent],
      providers: [
        { provide: ConsorciosService, useClass: FakeConsorciosService },
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
        entryComponents: [ConsorcioFormComponent],
      },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsorcioTableComponent);
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

  it('Debe abrir el drawer del Filtro', () => {
    const fakeDrawerRef = TestBed.get(NzDrawerService);

    const fakeFilterApplied = {
      razon_social: 'test',
      calle: 'test',
      numero: 'test',
      cuit: 'test',
      estado: 'test',
    };

    const afterOpenObservable = new Observable(subscriber => {
      subscriber.next(null);
    });

    const aferCloseObservable = new Observable(subscriber => {
      subscriber.next(null);
      subscriber.next(fakeFilterApplied);
    });

    const spy = spyOn(fakeDrawerRef, 'create').and.returnValue({
      afterClose: aferCloseObservable,
      afterOpen: afterOpenObservable,
    });

    component._openFilter();

    expect(component.filtroForm).toBe(fakeFilterApplied);
    expect(spy).toHaveBeenCalled();
  });

  it('debe eliminar un registro', () => {
    const chequesService = TestBed.get(ConsorciosService);
    const spy = spyOn(chequesService, 'delete').and.returnValue(of('test'));
    component.eliminar(2);
    expect(spy).toHaveBeenCalled();
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
