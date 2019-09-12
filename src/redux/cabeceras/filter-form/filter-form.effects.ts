import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap } from 'rxjs/operators';
import { FilterActionsTypes } from './filter-form.actions';
import { CabecerasPageRequest } from '../page/page.actions';
import { of } from 'rxjs';
import { DrawerService } from '@shared/utils/drawer.service';
import { CabecerasFilterComponent } from 'app/routes/cabeceras/cabeceras-filter/cabeceras-filter.component';

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
            CabecerasFilterComponent,
          );
        }),
      ),
    { dispatch: false },
  );

  filterIt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilterActionsTypes.FilterRequest),
      mergeMap(() => of(new CabecerasPageRequest())),
    ),
  );
}
