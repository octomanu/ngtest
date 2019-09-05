import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { CabecerasService } from '@core/http/cabeceras/cabeceras.service';
import {
  NzDrawerService,
  NzMessageService,
  NzDrawerPlacement,
} from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { smallViewport } from 'redux/global/global.selectors';
import { tap } from 'rxjs/operators';
import { CabecerasFilterComponent } from 'app/routes/cabeceras/cabeceras-filter/cabeceras-filter.component';
import { CloseFilterForm } from './filter-form.actions';

@Injectable()
export class FilterFormEffectsHelper implements OnDestroy {
  protected smallViewport: boolean;
  protected viewportSubscription: Subscription;

  constructor(
    private appStore: Store<AppState>,
    protected cabecerasService: CabecerasService,
    protected drawerService: NzDrawerService,
    protected translateService: TranslateService,
    protected msg: NzMessageService,
  ) {
    this.viewportSubscription = this.appStore
      .select(smallViewport)
      .subscribe(value => (this.smallViewport = value));
  }

  get store() {
    return this.appStore;
  }

  openFilterForm() {
    this.openDrawer(
      'global.servicios',
      'left',
      CabecerasFilterComponent,
      CloseFilterForm,
    );
  }

  saveData(data) {
    return this.cabecerasService
      .create(data)
      .pipe(tap(() => this.msg.success(`global.actualizado`)));
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
