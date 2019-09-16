import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CabecerasButtonsComponent } from './cabeceras-buttons.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { SharedModule } from '@shared';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { HttpClient } from '@angular/common/http';
import {
  OpenFilterForm,
  FilterRequest,
} from 'redux/cabeceras/filter-form/filter-form.actions';
import { Store } from '@ngrx/store';
import { OpenCreateForm } from 'redux/cabeceras/create-form/create-form.actions';
import { appReducers, AppState } from 'redux/app.reducer';

describe('CabecerasButtonsComponent', () => {
  let component: CabecerasButtonsComponent;
  let fixture: ComponentFixture<CabecerasButtonsComponent>;
  let store: MockStore<AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CabecerasButtonsComponent],
      providers: [provideMockStore({ initialState: appReducers })],
      imports: [
        NgZorroAntdModule,
        SharedModule,
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CabecerasButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Must dispatch OpenFilterForm action ', () => {
    const spy = spyOn(store, 'dispatch');
    component.openFilter();
    expect(spy).toHaveBeenCalledWith(new OpenFilterForm());
  });

  it('Must dispatch OpenCrateForm action', () => {
    const spy = spyOn(store, 'dispatch');
    component.create();
    expect(spy).toHaveBeenCalledWith(new OpenCreateForm());
  });

  it('Must dispatch FilterRequest action', () => {
    const spy = spyOn(store, 'dispatch');
    component.clearFilter();
    expect(spy).toHaveBeenCalledWith(new FilterRequest({ data: null }));
  });

  it('stream of data initialized', () => {
    expect(component.help$).toBeDefined();
    expect(component.keepHelp$).toBeDefined();
  });
});
