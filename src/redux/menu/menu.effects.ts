import { Injectable } from '@angular/core';
import {
  Actions,
  ofType,
  createEffect,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { MenuHandlerService } from 'app/utils/menu-handler/menu-handler.service';
import { switchMap, map } from 'rxjs/operators';
import * as fromMenu from 'redux/menu/menu.actions';
import { of } from 'rxjs';

@Injectable()
export class MenuEffects {
  constructor(
    public actions$: Actions,
    public menuHandler: MenuHandlerService,
  ) {}

  cargarMenu$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      switchMap(() =>
        this.menuHandler.getMenu().pipe(
          map((menu: any[]) => {
            return new fromMenu.LoadMenuAction(menu);
          }),
        ),
      ),
    ),
  );

  crearMenu$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromMenu.UPDATE_MENU),
      switchMap((action: fromMenu.UpdateMenuAction) => {
        return this.menuHandler.updateMenu(action.menu).pipe(
          map(data => {
            return { type: 'dummy' };
          }),
        );
      }),
    ),
  );

  eliminarMenu$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromMenu.DELETE_MENU),
      switchMap((action: fromMenu.DeleteMenuAction) => {
        return this.menuHandler.deleteMenu().pipe(
          map((menu: any) => {
            console.log(menu);
            return new fromMenu.LoadMenuAction(menu);
          }),
        );
      }),
    ),
  );
}
