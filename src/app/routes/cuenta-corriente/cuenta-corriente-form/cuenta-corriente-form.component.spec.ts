import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteFormComponent } from './cuenta-corriente-form.component';
import {
  NzDrawerRef,
  NgZorroAntdModule,
  NZ_ICONS,
  NzMessageService,
} from 'ng-zorro-antd';
import { of, Subject } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  SettingOutline,
  PlusOutline,
  ProfileOutline,
} from '@ant-design/icons-angular/icons';
import { ConsorciosService } from '@core/http/consorcios/consorcios.service';
import { MovimientosService } from '@core/http/movimientos/movimientos.service';

export class FakeConsorciosService {
  searchByDisplay() {
    return of([]);
  }
}

export class FakeMovimientosService {
  create(data) {
    return of([]);
  }
}

describe('CuentaCorrienteFormComponent', () => {
  let component: CuentaCorrienteFormComponent;
  let fixture: ComponentFixture<CuentaCorrienteFormComponent>;
  const icons: IconDefinition[] = [SettingOutline, PlusOutline, ProfileOutline];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CuentaCorrienteFormComponent],
      providers: [
        { provide: NzDrawerRef, useValue: { afterOpen: of('mockObservable') } },
        { provide: ConsorciosService, useClass: FakeConsorciosService },
        { provide: MovimientosService, useClass: FakeMovimientosService },
        { provide: NZ_ICONS, useValue: icons },
      ],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
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
    fixture = TestBed.createComponent(CuentaCorrienteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe crear un registro', () => {
    const service = TestBed.get(MovimientosService);
    const msg = TestBed.get(NzMessageService);

    const spy = spyOn(service, 'create').and.returnValue(of([]));
    const spyMsg = spyOn(msg, 'success').and.returnValue(of([]));
    const spyAttr = spyOn(component, 'initForm');

    component.valueChange = new Subject();
    component.valueChange.subscribe(data => {
      expect(data.submit).toBeTruthy();
    });
    component.submit();
    expect(spy).toHaveBeenCalled();
    expect(spyMsg).toHaveBeenCalled();
    expect(spyAttr).toHaveBeenCalled();
  });

  it('debe iniciar el formulario', () => {
    component.initForm();

    expect(component.form).not.toBeNull();
  });
});
