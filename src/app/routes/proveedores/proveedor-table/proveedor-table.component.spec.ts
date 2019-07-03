import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgZorroAntdModule, NZ_ICONS, NzDrawerService } from 'ng-zorro-antd';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { KeysPipe } from '@delon/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, empty, Observable } from 'rxjs';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import {
  SettingOutline,
  PlusOutline,
  ProfileOutline,
} from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { ProveedorTableComponent } from './proveedor-table.component';
import { ProveedorFormComponent } from '../proveedor-form/proveedor-form.component';
import { ProveedoresService } from '@core/http/proveedores/proveedores.service';

export class FakeProveedoresService {
  paginate() {
    return of({ ok: true, data: [], recordsFiltered: 0 });
  }

  delete(id: any) {}
}

export class FakeNzDrawerService {
  create(options) {
    return { afterClose: empty(), afterOpen: empty() };
  }
}
describe('ProveedorTableComponent', () => {
  let component: ProveedorTableComponent;
  let fixture: ComponentFixture<ProveedorTableComponent>;
  const icons: IconDefinition[] = [SettingOutline, PlusOutline, ProfileOutline];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProveedorTableComponent, KeysPipe, ProveedorFormComponent],
      providers: [
        { provide: ProveedoresService, useClass: FakeProveedoresService },
        { provide: NzDrawerService, useClass: FakeNzDrawerService },
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
        entryComponents: [ProveedorFormComponent],
      },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedorTableComponent);
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
      direccion: 'test',
      cuit: 'test',
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
    const chequesService = TestBed.get(ProveedoresService);
    const spy = spyOn(chequesService, 'delete').and.returnValue(of('test'));
    component.eliminar(2);
    expect(spy).toHaveBeenCalled();
  });
});
