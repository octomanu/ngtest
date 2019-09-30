import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap } from 'rxjs/operators';
import { FilterActionsTypes } from './filter-form.actions';
import { CategoriasPageRequest } from '../page/page.actions';
import { of } from 'rxjs';
import { DrawerService } from '@shared/utils/drawer.service';
import { CategoriasFilterComponent } from 'app/routes/categorias/categorias-filter/categorias-filter.component';

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
            CategoriasFilterComponent,
          );
        }),
      ),
    { dispatch: false },
  );

  filterIt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilterActionsTypes.FilterRequest),
      mergeMap(() => of(new CategoriasPageRequest())),
    ),
  );
}
