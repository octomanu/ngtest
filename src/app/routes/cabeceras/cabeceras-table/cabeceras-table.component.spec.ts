import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabecerasTableComponent } from './cabeceras-table.component';
import { NgZorroAntdModule, NZ_ICONS } from 'ng-zorro-antd';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { KeysPipe } from '@delon/theme';
import { PageHeaderComponent } from '@delon/abc';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { of } from 'rxjs';
import { CabecerasService } from '@core/http/cabeceras/cabeceras.service';
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

describe('CabecerasTableComponent', () => {
  let component: CabecerasTableComponent;
  let fixture: ComponentFixture<CabecerasTableComponent>;
  const icons: IconDefinition[] = [SettingOutline, PlusOutline, ProfileOutline];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CabecerasTableComponent, KeysPipe, PageHeaderComponent],
      providers: [
        { provide: CabecerasService, useClass: FakeCabecerasService },
        { provide: NZ_ICONS, useValue: icons },
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
    fixture = TestBed.createComponent(CabecerasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
