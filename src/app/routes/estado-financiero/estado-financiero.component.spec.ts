import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoFinancieroComponent } from './estado-financiero.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { PageHeaderComponent } from '@delon/abc';
import { EstadoFinancieroTableComponent } from './estado-financiero-table/estado-financiero-table.component';
import { FormsModule } from '@angular/forms';
import { KeysPipe } from '@delon/theme';

describe('EstadoFinancieroComponent', () => {
  let component: EstadoFinancieroComponent;
  let fixture: ComponentFixture<EstadoFinancieroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EstadoFinancieroComponent, PageHeaderComponent, EstadoFinancieroTableComponent, KeysPipe],
      imports: [
        NgZorroAntdModule,
        FormsModule,
        BrowserAnimationsModule,
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
    fixture = TestBed.createComponent(EstadoFinancieroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
