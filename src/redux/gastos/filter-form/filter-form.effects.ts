import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap } from 'rxjs/operators';
import { FilterActionsTypes } from './filter-form.actions';
import { of } from 'rxjs';
import { DrawerService } from '@shared/utils/drawer.service';
import { GastosPageRequest } from '../page/page.actions';
import { GastosTableFilterComponent } from 'app/routes/gastos/gastos-table-filter/gastos-table-filter.component';

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
            'global.gastos',
            'left',
            GastosTableFilterComponent,
          );
        }),
      ),
    { dispatch: false },
  );

  filterIt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilterActionsTypes.FilterRequest),
      mergeMap(() => [new GastosPageRequest()]),
    ),
  );
}
