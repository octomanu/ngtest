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
import { CabecerasFormComponent } from 'app/routes/cabeceras/cabeceras-form/cabeceras-form.component';
import { CloseEditForm } from './edit-form.actions';
import { editId } from './edit-form.selectors';
@Injectable()
export class EditFormEffectsHelper implements OnDestroy {
  protected smallViewport: boolean;
  protected editId: number;
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

  updateData(data) {
    return this.cabecerasService
      .update(data.id, data)
      .pipe(tap(() => this.msg.success(`global.actualizado`)));
  }

  searchFormData() {
    return this.cabecerasService.find(this.editId);
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
