import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { CabecerasService } from '@core/http/cabeceras/cabeceras.service';
import { NzDrawerService, NzDrawerPlacement } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { smallViewport } from 'redux/global/global.selectors';
import { map, catchError, tap, delay } from 'rxjs/operators';
import { editId } from './cabeceras.selectors';
import { CabecerasFilterComponent } from 'app/routes/cabeceras/cabeceras-filter/cabeceras-filter.component';
import { CloseFilterForm } from './filter-form/filter-form.actions';
import {
  CabecerasPageRequestSuccess,
  CabecerasPageRequestFail,
} from './page/page.actions';

@Injectable({
  providedIn: 'root',
})
export class CabecerasEffectsHelper implements OnDestroy {
  protected smallViewport: boolean;
  protected editId: number;
  protected viewportSubscription: Subscription;

  constructor(
    private appStore: Store<AppState>,
    protected cabecerasService: CabecerasService,
    protected drawerService: NzDrawerService,
    protected translateService: TranslateService,
  ) {
    this.viewportSubscription = this.appStore
      .select(smallViewport)
      .subscribe(value => (this.smallViewport = value));
    this.appStore.select(editId).subscribe(id => (this.editId = id));
  }

  openFilterForm() {
    this.openDrawer(
      'global.servicios',
      'left',
      CabecerasFilterComponent,
      CloseFilterForm,
    );
  }

  searchTableData() {
    return this.cabecerasService.paginate().pipe(
      delay(300),
      map(
        (resp: any) =>
          new CabecerasPageRequestSuccess({
            data: resp.data,
            recordsFiltered: resp.recordsFiltered,
          }),
      ),
      catchError(error => of(new CabecerasPageRequestFail(error))),
    );
  }

  private openDrawer(
    title: string,
    placement: NzDrawerPlacement,
    nzContent: any,
    actionClass: any,
  ) {
    this.translateService.get(title).subscribe((res: string) => {
      this.drawerService
        .create({
          nzTitle: res,
          nzWidth: this.smallViewport ? '100%' : '75%',
          nzContent,
          nzPlacement: placement,
        })
        .afterClose.pipe(tap(() => this.appStore.dispatch(new actionClass())))
        .subscribe();
    });
  }

  ngOnDestroy() {
    this.viewportSubscription.unsubscribe();
  }
}
