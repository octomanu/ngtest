import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequesTableComponent } from './cheques-table.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { KeysPipe } from '@delon/theme';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChequesService } from '@core/http/cheques/cheques.service';
import { of } from 'rxjs';

export class FakeChequesService {
  paginate() {
    return of({ ok: true, data: [], recordsFiltered: 0 });
  }
}

describe('ChequesTableComponent', () => {
  let component: ChequesTableComponent;
  let fixture: ComponentFixture<ChequesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChequesTableComponent, KeysPipe],
      providers: [{ provide: ChequesService, useClass: FakeChequesService }],
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
    fixture = TestBed.createComponent(ChequesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
