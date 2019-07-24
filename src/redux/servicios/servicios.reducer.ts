import * as fromServicios from '../servicios/servicios.actions';
import { Action } from '@ngrx/store';
import { from } from 'rxjs';

export interface ServiciosState {
  servicios: any[];
}

const initState: ServiciosState = {
  servicios: [],
};

export function serviciosReducer(
  state = initState,
  acction: fromServicios.acciones,
): ServiciosState {
  switch (acction.type) {
    case fromServicios.LOAD_SERVICIOS:
        console.log(acction.servicios);
      return {

        servicios: [
          ...acction.servicios.map(servicio => {
            return { ...servicio };
          }),
        ],
      };

    case fromServicios.CLEAR_SERVICIOS:
      return {
        servicios: [],
      };

    default:
      return state;
  }
}
