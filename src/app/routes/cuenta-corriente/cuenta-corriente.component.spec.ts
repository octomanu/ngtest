import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteComponent } from './cuenta-corriente.component';
import { NgZorroAntdModule, NZ_ICONS } from 'ng-zorro-antd';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { PageHeaderComponent } from '@delon/abc';
import { KeysPipe } from '@delon/theme';
import { CuentaCorrienteAllTableComponent } from './cuenta-corriente-all-table/cuenta-corriente-all-table.component';
import { CuentaCorrienteTableComponent } from './cuenta-corriente-table/cuenta-corriente-table.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ConsorciosService } from '@core/http/consorcios/consorcios.service';
import { EstadoFinancieroService } from '@core/http/estado-financiero/estado-financiero.service';
import { ProveedoresService } from '@core/http/proveedores/proveedores.service';
import { CuentaCorrienteService } from '@core/http/cuenta-corriente/cuenta-corriente.service';
import {
  SettingOutline,
  PlusOutline,
  ProfileOutline,
} from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';

export class FakeEstadoFinancieroService {
  paginate() {
    return of({ ok: true, data: [], recordsFiltered: 0, totals: [] });
  }
}
export class FakeCuentaCorrienteService {
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

describe('CuentaCorrienteComponent', () => {
  let component: CuentaCorrienteComponent;
  let fixture: ComponentFixture<CuentaCorrienteComponent>;
  const icons: IconDefinition[] = [SettingOutline, PlusOutline, ProfileOutline];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NZ_ICONS, useValue: icons },
        {
          provide: CuentaCorrienteService,
          useClass: FakeCuentaCorrienteService,
        },
        {
          provide: EstadoFinancieroService,
          useClass: FakeEstadoFinancieroService,
        },
        { provide: ConsorciosService, useClass: FakeConsorciosService },
        { provide: ProveedoresService, useClass: FakeProveedorService },
      ],
      declarations: [
        CuentaCorrienteComponent,
        PageHeaderComponent,
        KeysPipe,
        CuentaCorrienteAllTableComponent,
        CuentaCorrienteTableComponent,
      ],
      imports: [
        NgZorroAntdModule,
        BrowserAnimationsModule,
        HttpClientModule,
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
    fixture = TestBed.createComponent(CuentaCorrienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe swichear entre componentes de tablas.', () => {
    expect(component.tabii).toBe(0);

    component.change(true);
    expect(component.tabii).toBe(1);

    component.change(false);
    expect(component.tabii).toBe(0);
  });
});
