import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map, catchError, mergeMap, first } from 'rxjs/operators';
import { PaymentFormEffectsHelper } from './payment-form-effects.helper';
import { of } from 'rxjs';
import * as actions from './payment-form.actions';
import { GastosPageRequest } from '../page/page.actions';

@Injectable()
export class PaymentFormEffects {
  constructor(
    protected actions$: Actions,
    private effectsHelper: PaymentFormEffectsHelper,
  ) {}

  openRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.PaymentFormActionsTypes.PaymentRequest),
        tap(() => {
          this.effectsHelper
            .openPaymentForm()
            .pipe(first())
            .subscribe();
        }),
      ),
    { dispatch: false },
  );

  saveRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.PaymentFormActionsTypes.PaymentSaveRequest),
      mergeMap((action: actions.PaymentSaveRequest) =>
        this.effectsHelper.saveData(action.payload.data).pipe(
          map(() => new actions.PaymentSaveRequestSuccess()),
          catchError(error =>
            of(new actions.PaymentSaveRequestFail({ error })),
          ),
        ),
      ),
      mergeMap(responseAction => [responseAction, new GastosPageRequest()]),
    ),
  );
}
