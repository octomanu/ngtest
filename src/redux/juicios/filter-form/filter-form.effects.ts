import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap } from 'rxjs/operators';
import { FilterActionsTypes } from './filter-form.actions';
import { JuiciosPageRequest } from '../page/page.actions';
import { of } from 'rxjs';
import { DrawerService } from '@shared/utils/drawer.service';
import { JuiciosFilterComponent } from 'app/routes/juicios/juicios-filter/juicios-filter.component';

@Injectable()
export class FilterFormEffects {
  constructor(
    protected actions$: Actions,
    protected drawerService: DrawerService,
  ) {}

  filterForm$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FilterActionsTypes.OpenFilterForm),
        mergeMap(() => {
          return this.drawerService.create(
            'global.servicios',
            'left',
            JuiciosFilterComponent,
          );
        }),
      ),
    { dispatch: false },
  );

  filterIt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilterActionsTypes.FilterRequest),
      mergeMap(() => of(new JuiciosPageRequest())),
    ),
  );
}
