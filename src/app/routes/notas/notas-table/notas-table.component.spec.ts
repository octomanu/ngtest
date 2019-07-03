import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasTableComponent } from './notas-table.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NgZorroAntdModule, NZ_ICONS, NzDrawerService } from 'ng-zorro-antd';
import { KeysPipe } from '@delon/theme';
import { of, empty, Observable } from 'rxjs';
import { NotasService } from '@core/http/notas/notas.service';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  SettingOutline,
  PlusOutline,
  ProfileOutline,
} from '@ant-design/icons-angular/icons';
import { NotasFormComponent } from '../notas-form/notas-form.component';
import { NotasForm } from '../notas-form/notas.form';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ReactiveFormsModule } from '@angular/forms';

export class FakeNotasService {
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

describe('NotasTableComponent', () => {
  let component: NotasTableComponent;
  let fixture: ComponentFixture<NotasTableComponent>;
  const icons: IconDefinition[] = [SettingOutline, PlusOutline, ProfileOutline];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotasTableComponent, KeysPipe, NotasFormComponent],
      providers: [
        { provide: NotasService, useClass: FakeNotasService },
        { provide: NzDrawerService, useClass: FakeNzDrawerService },
        { provide: NZ_ICONS, useValue: icons },
      ],
      imports: [
        NgZorroAntdModule,
        HttpClientModule,
        ReactiveFormsModule,
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
        entryComponents: [NotasFormComponent],
      },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotasTableComponent);
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
});
