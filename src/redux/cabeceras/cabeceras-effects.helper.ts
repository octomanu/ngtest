import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { Actions } from '@ngrx/effects';
import { CabecerasService } from '@core/http/cabeceras/cabeceras.service';
import {
  NzDrawerService,
  NzMessageService,
  NzDrawerPlacement,
} from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { smallViewport } from 'redux/global/global.selectors';
import { map, catchError, tap, delay } from 'rxjs/operators';
import {
  CabecerasPageRequestSuccess,
  CabecerasPageRequestFail,
  CloseFilterForm,
  CloseEditForm,
  CabecerasUpdateRequestSuccess,
  CabecerasUpdateRequestFail,
} from './cabeceras.actions';
import { CabecerasFormComponent } from 'app/routes/cabeceras/cabeceras-form/cabeceras-form.component';
import { editId } from './cabeceras.selectors';
import { CabecerasFilterComponent } from 'app/routes/cabeceras/cabeceras-filter/cabeceras-filter.component';

@Injectable({
  providedIn: 'root',
})
export class CabecerasEffectsHelper implements OnDestroy {
  protected smallViewport: boolean;
  protected editId: number;
  protected viewportSubscription: Subscription;

  constructor(
    private appStore: Store<AppState>,
    protected actions$: Actions,
    protected cabecerasService: CabecerasService,
    protected drawerService: NzDrawerService,
    protected translateService: TranslateService,
    protected msg: NzMessageService,
  ) {
    this.viewportSubscription = this.appStore
      .select(smallViewport)
      .subscribe(value => (this.smallViewport = value));

    this.appStore.select(editId).subscribe(id => (this.editId = id));
  }

  get store() {
    return this.appStore;
  }

  openEditForm() {
    this.openDrawer(
      'global.servicios',
      'right',
      CabecerasFormComponent,
      CloseEditForm,
    );
  }

  openFilterForm() {
    this.openDrawer(
      'global.servicios',
      'left',
      CabecerasFilterComponent,
      CloseFilterForm,
    );
  }

  updateData(data) {
    return this.cabecerasService.update(data.id, data).pipe(
      delay(1000),
      tap(() => this.msg.success(`global.actualizado`)),
      map(() => new CabecerasUpdateRequestSuccess({ data })),
      catchError(error => of(new CabecerasUpdateRequestFail({ error }))),
    );
  }

  // Form Handler
  searchFormData() {
    return this.cabecerasService.find(this.editId).pipe(delay(300));
  }

  // table Handler
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
        .afterClose.pipe(tap(() => this.store.dispatch(new actionClass())))
        .subscribe();
    });
  }

  ngOnDestroy() {
    this.viewportSubscription.unsubscribe();
  }
}
