import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsorcioFormComponent } from './consorcio-form.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { NgZorroAntdModule, NzDrawerRef } from 'ng-zorro-antd';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('ConsorcioFormComponent', () => {
  let component: ConsorcioFormComponent;
  let fixture: ComponentFixture<ConsorcioFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConsorcioFormComponent],
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
    fixture = TestBed.createComponent(ConsorcioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
