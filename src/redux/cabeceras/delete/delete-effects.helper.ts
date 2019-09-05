import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { CabecerasService } from '@core/http/cabeceras/cabeceras.service';
import { NzMessageService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';
import { CabecerasPageRequest } from '../page/page.actions';
@Injectable()
export class DeleteEffectsHelper {
  protected smallViewport: boolean;
  protected editId: number;
  protected viewportSubscription: Subscription;

  constructor(
    private appStore: Store<AppState>,
    protected cabecerasService: CabecerasService,
    protected translateService: TranslateService,
    protected msg: NzMessageService,
  ) {}

  deleteData(id: number) {
    return this.cabecerasService.delete(id).pipe(
      tap(() => {
        this.appStore.dispatch(new CabecerasPageRequest());
        this.msg.success(`Eliminado`);
      }),
    );
  }
}
