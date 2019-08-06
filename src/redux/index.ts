import { ServiciosEffects } from './servicios/servicios.effects';
import { MenuEffects } from './menu/menu.effects';
import { CuentasBancariasEffects } from './cuentas-bancarias/cuentas-bancarias.effects';
import { GastosDescripcionesEffects } from './gastos-descripciones/gastos-descripciones.effects';

export const effectsArr: any[] = [
  ServiciosEffects,
  MenuEffects,
  CuentasBancariasEffects,
  GastosDescripcionesEffects,
];
