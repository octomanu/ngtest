import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasFormComponent } from './notas-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgZorroAntdModule, NzDrawerRef } from 'ng-zorro-antd';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { of } from 'rxjs';
import { NotasService } from '@core/http/notas/notas.service';

export class FakeNotasService {
  paginate() {
    return of({ ok: true, data: [], recordsFiltered: 0 });
  }
}

describe('NotasFormComponent', () => {
  let component: NotasFormComponent;
  let fixture: ComponentFixture<NotasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotasFormComponent],
      providers: [
        { provide: NzDrawerRef, useValue: { afterOpen: of('mockObservable') } },
        { provide: NotasService, useValue: FakeNotasService },
      ],
      imports: [
        ReactiveFormsModule,
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
    fixture = TestBed.createComponent(NotasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
