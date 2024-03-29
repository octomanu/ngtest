import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequesTableComponent } from './cheques-table.component';
import { NgZorroAntdModule, NZ_ICONS, NzDrawerService } from 'ng-zorro-antd';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { KeysPipe } from '@delon/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChequesService } from '@core/http/cheques/cheques.service';
import { of, empty, Observable, Subscriber } from 'rxjs';
import { ChequesFormComponent } from '../cheques-form/cheques-form.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import {
  SettingOutline,
  PlusOutline,
  ProfileOutline,
} from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';

export class FakeChequesService {
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

describe('ChequesTableComponent', () => {
  let component: ChequesTableComponent;
  let fixture: ComponentFixture<ChequesTableComponent>;
  const icons: IconDefinition[] = [SettingOutline, PlusOutline, ProfileOutline];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChequesTableComponent, KeysPipe, ChequesFormComponent],
      providers: [
        { provide: ChequesService, useClass: FakeChequesService },
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
        entryComponents: [ChequesFormComponent],
      },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequesTableComponent);
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
    const chequesService = TestBed.get(ChequesService);
    const spy = spyOn(chequesService, 'delete').and.returnValue(of('test'));
    component.eliminar(2);
    expect(spy).toHaveBeenCalled();
  });
});
