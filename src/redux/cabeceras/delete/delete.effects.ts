import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { DeleteEffectsHelper } from './delete-effects.helper';
import {
  DeleteActionsType,
  DeleteRequest,
  DeleteRequestSuccess,
  DeleteRequestFail,
} from './delete.actions';

@Injectable()
export class DeleteEffects {
  constructor(
    private actions$: Actions,
    private effectsHelper: DeleteEffectsHelper,
  ) {}

  deleteRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteActionsType.DeleteRequest),
      mergeMap((action: DeleteRequest) =>
        this.effectsHelper.deleteData(action.payload.id).pipe(
          map(() => new DeleteRequestSuccess()),
          catchError(error => of(new DeleteRequestFail({ error }))),
        ),
      ),
    ),
  );
}
