import { ServiciosEffects } from './servicios/servicios.effects';
import { MenuEffects } from './menu/menu.effects';
import { CuentasBancariasEffects } from './cuentas-bancarias/cuentas-bancarias.effects';
import { GastosDescripcionesEffects } from './gastos-descripciones/gastos-descripciones.effects';
import { CajaConsorcioEffects } from './caja-consorcio/caja-consorcio.effects';
import { ChequerasEffects } from './chequeras/chequeras.effects';

export const effectsArr: any[] = [
  ServiciosEffects,
  MenuEffects,
  CuentasBancariasEffects,
  GastosDescripcionesEffects,
  CajaConsorcioEffects,
  ChequerasEffects,
];
