import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteFormComponent } from './cuenta-corriente-form.component';
import { NzDrawerRef, NgZorroAntdModule, NZ_ICONS } from 'ng-zorro-antd';
import { of } from 'rxjs';
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

export class FakeConsorciosService {
  searchByDisplay() {
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
});
