import { async, TestBed } from '@angular/core/testing';
import { BooleanPipe } from './boolean.pipe';
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from '@ngx-translate/core';
import { I18nHttpLoaderFactory } from 'app/app.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('BooleanPipe', () => {
  let pipe: BooleanPipe;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],

      imports: [
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

    pipe = new BooleanPipe(TestBed.get(TranslateService));
  }));

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Debe devovler la  traduccion de true', () => {
    const translation = pipe.transform(true);
    translation.subscribe(data => {
      expect(data).toBe('global.true');
    });
  });

  it('Debe devovler la  traduccion de false', () => {
    const translation = pipe.transform(false);
    translation.subscribe(data => {
      expect(data).toBe('global.false');
    });
  });
});
