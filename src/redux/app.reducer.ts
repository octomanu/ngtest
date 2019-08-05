import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './auth/auth.reducer';
import * as fromGlobal from './global/globa.reducer';
import * as fromServicios from './servicios/servicios.reducer';
import * as fromMenu from './menu/menu.reducer';
import * as fromCuentasBancarias from './cuentas-bancarias/cuentas-bancarias.reducer';

export interface AppState {
  menuState: fromMenu.MenuState;
  globalState: fromGlobal.GlobalState;
  authState: fromAuth.AuthState;
  serviciosState: fromServicios.ServiciosState;
  cuentasBancariasState: fromCuentasBancarias.CuentasBancariasState;
}

export const appReducers: ActionReducerMap<AppState> = {
  menuState: fromMenu.menuReducer,
  globalState: fromGlobal.globalReducer,
  authState: fromAuth.authReducer,
  serviciosState: fromServicios.serviciosReducer,
  cuentasBancariasState: fromCuentasBancarias.CuentasBancariasReducer,
};
