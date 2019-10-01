import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { NzMessageService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';
import { JuiciosService } from '@core/http/juicios/juicios.service';
import { JuiciosPageRequest } from '../page/page.actions';
@Injectable()
export class DeleteEffectsHelper {
  protected smallViewport: boolean;
  protected editId: number;
  protected viewportSubscription: Subscription;

  constructor(
    private appStore: Store<AppState>,
    protected juiciosService: JuiciosService,
    protected translateService: TranslateService,
    protected msg: NzMessageService,
  ) {}

  deleteData(id: number) {
    return this.juiciosService.delete(id).pipe(
      tap(() => {
        this.appStore.dispatch(new JuiciosPageRequest());
        this.msg.success(`Eliminado`);
      }),
    );
  }
}
