import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsorciosComponent } from './consorcios.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { PageHeaderComponent } from '@delon/abc';
import { KeysPipe } from '@delon/theme';
import { ConsorcioTableComponent } from './consorcio-table/consorcio-table.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ConsorciosService } from '@core/http/consorcios/consorcios.service';

export class FakeConsorciosService {
  paginate() {
    return of({ ok: true, data: [], recordsFiltered: 0 });
  }
}

describe('ConsorciosComponent', () => {
  let component: ConsorciosComponent;
  let fixture: ComponentFixture<ConsorciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ConsorciosService, useClass: FakeConsorciosService },
      ],
      declarations: [
        ConsorciosComponent,
        ConsorcioTableComponent,
        KeysPipe,
        PageHeaderComponent,
      ],
      imports: [
        NgZorroAntdModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
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
    fixture = TestBed.createComponent(ConsorciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
