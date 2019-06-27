import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabecerasComponent } from './cabeceras.component';
import { NgZorroAntdModule, NZ_ICONS } from 'ng-zorro-antd';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { PageHeaderComponent } from '@delon/abc';
import { CabecerasTableComponent } from './cabeceras-table/cabeceras-table.component';
import { KeysPipe } from '@delon/theme';
import { RouterTestingModule } from '@angular/router/testing';
import { CabecerasService } from '@core/http/cabeceras/cabeceras.service';
import { of } from 'rxjs';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  SettingOutline,
  PlusOutline,
  ProfileOutline,
} from '@ant-design/icons-angular/icons';

export class FakeCabecerasService {
  paginate() {
    return of({ ok: true, data: [], recordsFiltered: 0 });
  }
}

describe('CabecerasComponent', () => {
  let component: CabecerasComponent;
  let fixture: ComponentFixture<CabecerasComponent>;
  const icons: IconDefinition[] = [SettingOutline, PlusOutline, ProfileOutline];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CabecerasComponent,
        CabecerasTableComponent,
        KeysPipe,
        PageHeaderComponent,
      ],
      providers: [
        { provide: NZ_ICONS, useValue: icons },
        { provide: CabecerasService, useClass: FakeCabecerasService },
      ],
      imports: [
        NgZorroAntdModule,
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
    fixture = TestBed.createComponent(CabecerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
