import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GastosTableComponent } from './gastos-table.component';
import { KeysPipe } from '@delon/theme';
import { NgZorroAntdModule, NZ_ICONS } from 'ng-zorro-antd';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { I18nHttpLoaderFactory, LANG_PROVIDES } from 'app/app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GastosService } from '@core/http/gastos/gastos.service';
import { of } from 'rxjs';
import { ConsorciosService } from '@core/http/consorcios/consorcios.service';
import { ProveedoresService } from '@core/http/proveedores/proveedores.service';
import {
  SettingOutline,
  PlusOutline,
  ProfileOutline,
} from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
export class FakeGastosService {
  paginate() {
    return of({ ok: true, data: [], recordsFiltered: 0 });
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

describe('GastosTableComponent', () => {
  let component: GastosTableComponent;
  let fixture: ComponentFixture<GastosTableComponent>;
  const icons: IconDefinition[] = [SettingOutline, PlusOutline, ProfileOutline];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GastosTableComponent, KeysPipe],
      providers: [
        { provide: GastosService, useClass: FakeGastosService },
        { provide: ConsorciosService, useClass: FakeConsorciosService },
        { provide: ProveedoresService, useClass: FakeProveedorService },
        { provide: NZ_ICONS, useValue: icons },
        LANG_PROVIDES,
      ],
      imports: [
        NgZorroAntdModule,
        ReactiveFormsModule,
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
    fixture = TestBed.createComponent(GastosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
