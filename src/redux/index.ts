import { ServiciosEffects } from './servicios/servicios.effects';
import { MenuEffects } from './menu/menu.effects';
import { CuentasBancariasEffects } from './cuentas-bancarias/cuentas-bancarias.effects';
import { GastosDescripcionesEffects } from './gastos-descripciones/gastos-descripciones.effects';
import { CajaConsorcioEffects } from './caja-consorcio/caja-consorcio.effects';
import { ChequerasEffects } from './chequeras/chequeras.effects';
import { OrdenesPagoEffects } from './ordenes-pago/ordenes-pago.effects';
import { CuentaCorrienteProveedorEffects } from './cuenta-corriente-proveedor/cuenta-corriente-proveedor.effects';
import { CuentaCorrienteConsorcioEffects } from './cuenta-corriente-consorcio/cuenta-corriente-consorcio.effects';
import { CuentaCorrienteUfEffects } from './cuenta-corriente-uf/cuenta-corriente-uf-effects';
import { GastosEffects } from './gastos/gastos.effects';

export const effectsArr: any[] = [
  ServiciosEffects,
  MenuEffects,
  CuentasBancariasEffects,
  GastosDescripcionesEffects,
  CajaConsorcioEffects,
  ChequerasEffects,
  OrdenesPagoEffects,
  CuentaCorrienteProveedorEffects,
  CuentaCorrienteConsorcioEffects,
  CuentaCorrienteUfEffects,
  GastosEffects,
];
