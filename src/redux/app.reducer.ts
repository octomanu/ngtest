import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './auth/auth.reducer';
import * as fromGlobal from './global/globa.reducer';
import * as fromServicios from './servicios/servicios.reducer';
import * as fromMenu from './menu/menu.reducer';
import * as fromCuentasBancarias from './cuentas-bancarias/cuentas-bancarias.reducer';
import * as fromGastosDescripciones from './gastos-descripciones/gastos-descripciones.reducer';
import * as fromCajaConsorcio from './caja-consorcio/caja-consorcio.reducer';
import * as fromChequeras from './chequeras/chequeras.reducer';
import * as fromOrdenesPago from './ordenes-pago/ordenes-pago.reducer';
import * as fromCuentaCorrienteProveedor from './cuenta-corriente-proveedor/cuenta-corriente-proveedor.reducer';
import * as fromCuentaCorrienteConsorcio from './cuenta-corriente-consorcio/cuenta-corriente-consorcio.reducer';
import * as fromCuentaCorrienteUf from './cuenta-corriente-uf/cuenta-corriente-uf-reducer';
import * as fromSueldos from './sueldos/sueldos.reducer';
import * as fromCabeceras from './cabeceras/cabeceras.reducer';

export interface AppState {
  menuState: fromMenu.MenuState;
  globalState: fromGlobal.GlobalState;
  authState: fromAuth.AuthState;
  serviciosState: fromServicios.ServiciosState;
  cuentasBancariasState: fromCuentasBancarias.CuentasBancariasState;
  gastosDescripcionesState: fromGastosDescripciones.GastosDescripcionesState;
  cajaConsorcioState: fromCajaConsorcio.CajaConsorcioState;
  chequerasState: fromChequeras.ChequerasState;
  ordenesPagoState: fromOrdenesPago.OrdenesPagoState;
  cuentaCorrienteProveedor: fromCuentaCorrienteProveedor.CuentaCorrienteProveedorState;
  cuentaCorrienteConsorcio: fromCuentaCorrienteConsorcio.CuentaCorrienteConsorcioState;
  cuentaCorrienteUf: fromCuentaCorrienteUf.CuentaCorrienteUfState;
  sueldosState: fromSueldos.SueldosState;
  cabecerasState: fromCabeceras.CabecerasState;
}

export const appReducers: ActionReducerMap<AppState> = {
  menuState: fromMenu.menuReducer,
  globalState: fromGlobal.globalReducer,
  authState: fromAuth.authReducer,
  serviciosState: fromServicios.serviciosReducer,
  cuentasBancariasState: fromCuentasBancarias.CuentasBancariasReducer,
  gastosDescripcionesState: fromGastosDescripciones.GastosDescripcionesReducer,
  cajaConsorcioState: fromCajaConsorcio.CajaConsorcioReducer,
  chequerasState: fromChequeras.ChequerasReducer,
  ordenesPagoState: fromOrdenesPago.OrdenesPagoReducer,
  cuentaCorrienteProveedor:
    fromCuentaCorrienteProveedor.CuentaCorrienteProveedorReducer,
  cuentaCorrienteConsorcio:
    fromCuentaCorrienteConsorcio.CuentaCorrienteConsorcioReducer,
  cuentaCorrienteUf: fromCuentaCorrienteUf.CuentaCorrienteUfReducer,
  sueldosState: fromSueldos.SueldosReducer,
  cabecerasState: fromCabeceras.cabecerasReducer,
};
