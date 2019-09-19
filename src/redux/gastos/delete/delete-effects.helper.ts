import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { CabecerasService } from '@core/http/cabeceras/cabeceras.service';
import { NzMessageService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';
import { GastosService } from '@core/http/gastos/gastos.service';
import { GastosPageRequest } from '../page/page.actions';

@Injectable()
export class DeleteEffectsHelper {
  constructor(
    private appStore: Store<AppState>,
    protected gastosService: GastosService,
    protected translateService: TranslateService,
    protected msg: NzMessageService,
  ) {}

  deleteData(id: number) {
    return this.gastosService.delete(id).pipe(
      tap(() => {
        this.appStore.dispatch(new GastosPageRequest());
        this.msg.success(`Eliminado`);
      }),
    );
  }
}
