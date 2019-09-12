import { Injectable } from '@angular/core';
import { NzDrawerService, NzDrawerPlacement, NzDrawerRef } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { smallViewport as smallViewportSelect } from 'redux/global/global.selectors';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class DrawerService {
  smallViewport: boolean;

  constructor(
    private store: Store<AppState>,
    protected drawerService: NzDrawerService,
    protected translateService: TranslateService,
  ) {}

  create(
    title: string,
    placement: NzDrawerPlacement,
    nzContent: any,
  ): Observable<NzDrawerRef> {
    return this.translateService.get(title).pipe(
      withLatestFrom(this.store.select(smallViewportSelect)),
      map(([res, smallViewport]) => {
        return this.drawerService.create({
          nzTitle: res,
          nzWidth: smallViewport ? '100%' : '75%',
          nzContent,
          nzPlacement: placement,
        });
      }),
    );
  }
}
