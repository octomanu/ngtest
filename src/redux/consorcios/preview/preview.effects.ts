import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromPreview from './preview.actions';
import { map, catchError, mergeMap, tap } from 'rxjs/operators';
import { ExpensasService } from '@core/http/expensas/expensas.service';
import { of } from 'rxjs';
import { DrawerService } from '@shared/utils/drawer.service';
import { ExpensaPreviewComponent } from 'app/routes/consorcios/expensa-preview/expensa-preview.component';
@Injectable()
export class PreviewEffects {
  constructor(
    private actions$: Actions,
    private expensasService: ExpensasService,
    private drawerService: DrawerService,
  ) {}

  loadPreview$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromPreview.previewActionTypes.previewRequest),
      mergeMap((action: fromPreview.PreviewRequest) =>
        this.expensasService.preview(action.payload.idConsorcio).pipe(
          tap(() =>
            this.drawerService
              .create(
                null,
                'right',
                ExpensaPreviewComponent,
                {},
                '75%',
              )
              .subscribe(),
          ),
          map(
            (html: string) => new fromPreview.PreviewRequestSuccess({ html }),
          ),
          catchError(error =>
            of(new fromPreview.PreviewRequestError({ error })),
          ),
        ),
      ),
    );
  });
}
