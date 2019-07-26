import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './auth/auth.reducer';
import * as fromGlobal from './global/globa.reducer';
import * as fromServicios from './servicios/servicios.reducer';

export interface AppState {
  globalState: fromGlobal.GlobalState;
  authState: fromAuth.AuthState;
  serviciosState: fromServicios.ServiciosState;
}

export const appReducers: ActionReducerMap<AppState> = {
  globalState: fromGlobal.globalReducer,
  authState: fromAuth.authReducer,
  serviciosState: fromServicios.serviciosReducer,
};
