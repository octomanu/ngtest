import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasComponent } from './notas.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { PageHeaderComponent } from '@delon/abc';
import { NotasTableComponent } from './notas-table/notas-table.component';
import { KeysPipe } from '@delon/theme';

describe('NotasComponent', () => {
  let component: NotasComponent;
  let fixture: ComponentFixture<NotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotasComponent, PageHeaderComponent, NotasTableComponent, KeysPipe],
      imports: [
        NgZorroAntdModule,
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
    fixture = TestBed.createComponent(NotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
