import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsorcioTableComponent } from './consorcio-table.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { KeysPipe } from '@delon/theme';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ConsorcioTableComponent', () => {
  let component: ConsorcioTableComponent;
  let fixture: ComponentFixture<ConsorcioTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConsorcioTableComponent, KeysPipe],
      imports: [
        NgZorroAntdModule,
        BrowserAnimationsModule,
        FormsModule,
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
    fixture = TestBed.createComponent(ConsorcioTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
