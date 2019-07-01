import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteTableComponent } from './cuenta-corriente-table.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { I18nHttpLoaderFactory, LANG_PROVIDES } from 'app/app.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NgZorroAntdModule, NZ_ICONS } from 'ng-zorro-antd';
import { KeysPipe } from '@delon/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ProveedoresService } from '@core/http/proveedores/proveedores.service';
import { ConsorciosService } from '@core/http/consorcios/consorcios.service';
import { CuentaCorrienteService } from '@core/http/cuenta-corriente/cuenta-corriente.service';
import {
  SettingOutline,
  PlusOutline,
  ProfileOutline,
} from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';

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

export class FakeCuentaCorrienteService {
  paginate() {
    return of({ ok: true, data: [], recordsFiltered: 0, totals: [] });
  }
}

describe('CuentaCorrienteTableComponent', () => {
  let component: CuentaCorrienteTableComponent;
  let fixture: ComponentFixture<CuentaCorrienteTableComponent>;
  const icons: IconDefinition[] = [SettingOutline, PlusOutline, ProfileOutline];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CuentaCorrienteTableComponent, KeysPipe],
      providers: [
        {
          provide: CuentaCorrienteService,
          useClass: FakeCuentaCorrienteService,
        },
        { provide: ConsorciosService, useClass: FakeConsorciosService },
        { provide: ProveedoresService, useClass: FakeProveedorService },
        { provide: NZ_ICONS, useValue: icons },
        LANG_PROVIDES,
      ],
      imports: [
        NgZorroAntdModule,
        BrowserAnimationsModule,
        FormsModule,
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
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
