import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabecerasFilterComponent } from './cabeceras-filter.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NgZorroAntdModule, NzDrawerRef } from 'ng-zorro-antd';
import { SharedModule } from '@shared';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  CabecerasState,
  cabeceraReducers,
} from 'redux/cabeceras/cabeceras.reducer';
import {
  FilterRequest,
  CloseFilterForm,
} from 'redux/cabeceras/filter-form/filter-form.actions';

export class FakeNzDrawerRef {
  close() {}
}

fdescribe('CabecerasFilterComponent', () => {
  let component: CabecerasFilterComponent;
  let fixture: ComponentFixture<CabecerasFilterComponent>;
  let store: MockStore<CabecerasState>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CabecerasFilterComponent],
      providers: [
        provideMockStore({ initialState: cabeceraReducers }),
        { provide: NzDrawerRef, useClass: FakeNzDrawerRef },
      ],
      imports: [
        NgZorroAntdModule,
        SharedModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: I18nHttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
    }).compileComponents();
    store = TestBed.get(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CabecerasFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the form', () => {
    const spy = spyOn(store, 'dispatch');
    const spyDrawer = spyOn(component.drawerRef, 'close');
    component.submit();
    expect(spy).toHaveBeenCalledWith(
      new FilterRequest({
        data: {
          cuit: null,
          nombre: null,
          direccion: null,
          email: null,
        },
      }),
    );

    expect(spyDrawer).toHaveBeenCalled();
  });

  it('should close filter', () => {
    const spy = spyOn(store, 'dispatch');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalledWith(new CloseFilterForm());
  });
});
