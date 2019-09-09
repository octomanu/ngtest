import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './auth/auth.reducer';
import * as fromGlobal from './global/globa.reducer';
import * as fromMenu from './menu/menu.reducer';

export interface AppState {
  menuState: fromMenu.MenuState;
  globalState: fromGlobal.GlobalState;
  authState: fromAuth.AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
  menuState: fromMenu.menuReducer,
  globalState: fromGlobal.globalReducer,
  authState: fromAuth.authReducer,
};
