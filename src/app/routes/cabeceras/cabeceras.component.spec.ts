import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CabecerasComponent } from './cabeceras.component';
import { NgZorroAntdModule, NZ_ICONS } from 'ng-zorro-antd';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CabecerasTableComponent } from './cabeceras-table/cabeceras-table.component';
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
import { CabecerasButtonsComponent } from './cabeceras-buttons/cabeceras-buttons.component';
import { SharedModule } from '@shared';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { appReducers } from 'redux/app.reducer';
let store: MockStore<{ loggedIn: boolean }>;

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
        CabecerasButtonsComponent,
      ],
      providers: [
        provideMockStore({ initialState: appReducers }),
        { provide: NZ_ICONS, useValue: icons },
        { provide: CabecerasService, useClass: FakeCabecerasService },
      ],
      imports: [
        NgZorroAntdModule,
        SharedModule,
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
    store = TestBed.get<Store<any>>(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabecerasComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
