import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabUfComponent } from './tab-uf.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { KeysPipe } from '@delon/theme';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { UnidadesFuncionalesService } from '@core/http/unidades-funcionales/unidades-funcionales.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export class FakeUnidadesFuncionalesService {
  setConsorcio(id: string) {}
  paginate() {
    return of({ ok: true, data: [], recordsFiltered: 0 });
  }
}

describe('TabUfComponent', () => {
  let component: TabUfComponent;
  let fixture: ComponentFixture<TabUfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UnidadesFuncionalesService,
          useClass: FakeUnidadesFuncionalesService,
        },
      ],
      declarations: [TabUfComponent, KeysPipe],
      imports: [
        NgZorroAntdModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
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
    fixture = TestBed.createComponent(TabUfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
