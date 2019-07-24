import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './auth/auth.reducer';
import * as fromServicios from './servicios/servicios.reducer';

export interface AppState {
  authState: fromAuth.AuthState;
  serviciosState: fromServicios.ServiciosState;
}

export const appReducers: ActionReducerMap<AppState> = {
  authState: fromAuth.authReducer,
  serviciosState: fromServicios.serviciosReducer,
};
