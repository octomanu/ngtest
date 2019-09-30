import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  mergeMap,
  switchMap,
  map,
  catchError,
  tap,
  first,
} from 'rxjs/operators';
import {
  DueActionsTypes,
  DueSaveRequestSuccess,
  DueSaveRequestError,
} from './dues.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { dues } from './dues.selectors';
import { GastosCuotasService } from '@core/http/gastos-cuotas/gastos-cuotas.service';
import { of } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class DuesEffects {
  constructor(
    protected actions$: Actions,
    protected store: Store<AppState>,
    protected gastosCuotas: GastosCuotasService,
    protected msg: NzMessageService,
    protected translateService: TranslateService,
  ) {}

  open$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DueActionsTypes.DueSaveRequest),
      switchMap(action => this.massiveDues()),
      switchMap(action => of(action)),
    ),
  );

  private massiveDues() {
    return this.store.select(dues).pipe(
      first(),
      switchMap(data =>
        this.gastosCuotas.massiveEdit(data).pipe(
          switchMap(() => this.translateService.get('global.actualizado')),
          tap(translation => this.msg.success(translation)),
          map(() => new DueSaveRequestSuccess()),
          catchError(error => of(new DueSaveRequestError({ error }))),
        ),
      ),
    );
  }
}
