import { Injectable } from '@angular/core';
import { NzDrawerService, NzDrawerPlacement, NzDrawerRef } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { smallViewport as smallViewportSelect } from 'redux/global/global.selectors';
import { Observable } from 'rxjs';
import { map, withLatestFrom, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
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
    nzContentParams?: {},
    width?: string,
  ): Observable<NzDrawerRef> {
    if (title)
      return this.withTitle(
        title,
        placement,
        nzContent,
        nzContentParams,
        width,
      );
    else return this.withoutTitle(placement, nzContent, nzContentParams, width);
  }

  private withoutTitle(
    placement: NzDrawerPlacement,
    nzContent: any,
    nzContentParams?: {},
    width?: string,
  ) {
    return this.store.select(smallViewportSelect).pipe(
      first(),
      map(smallViewport => {
        return this.drawerService.create({
          nzWidth: smallViewport ? '100%' : width ? width : '75%',
          nzContent,
          nzPlacement: placement,
          nzContentParams,
        });
      }),
    );
  }

  private withTitle(
    title: string,
    placement: NzDrawerPlacement,
    nzContent: any,
    nzContentParams?: {},
    width?: string,
  ) {
    return this.translateService.get(title).pipe(
      withLatestFrom(this.store.select(smallViewportSelect)),
      map(([res, smallViewport]) => {
        return this.drawerService.create({
          nzTitle: res,
          nzWidth: smallViewport ? '100%' : width ? width : '75%',
          nzContent,
          nzPlacement: placement,
          nzContentParams,
        });
      }),
    );
  }
}
