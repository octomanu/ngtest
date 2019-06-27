import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcentualesFormComponent } from './procentuales-form.component';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgZorroAntdModule, NzDrawerRef } from 'ng-zorro-antd';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('ProcentualesFormComponent', () => {
  let component: ProcentualesFormComponent;
  let fixture: ComponentFixture<ProcentualesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProcentualesFormComponent],
      providers: [
        { provide: NzDrawerRef, useValue: { afterOpen: of('mockObservable') } },
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
    fixture = TestBed.createComponent(ProcentualesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
