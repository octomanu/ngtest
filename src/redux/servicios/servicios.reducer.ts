import * as fromServicios from '../servicios/servicios.actions';
import { LambePaginator } from 'redux/lambe-paginator.model';

export interface ServiciosState {
  paginator: LambePaginator;
  filtros: any;
  loading: boolean;
  error: any;
  initialized: boolean;
}

const initState: ServiciosState = {
  paginator: new LambePaginator(),
  filtros: [],
  loading: false,
  error: null,
  initialized: false,
};

export function serviciosReducer(
  state = initState,
  action: fromServicios.acciones,
): ServiciosState {
  switch (action.type) {
    case fromServicios.LOAD_SERVICIOS:
      return {
        ...state,
        loading: true,
        initialized: true,
      };

    case fromServicios.LOAD_SERVICIOS_SUCCESS:
      return {
        ...state,
        paginator: {
          ...state.paginator,
          data: action.servicios,
          recordsFiltered: action.recordsFiltered,
        },
        loading: false,
        error: null,
      };

    case fromServicios.LOAD_SERVICIOS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case fromServicios.CLEAR_SERVICIOS:
      return {
        ...state,
        paginator: {
          ...state.paginator,
          recordsFiltered: 0,
          data: [],
        },
        loading: false,
      };

    case fromServicios.CHANGE_ORDER:
      return {
        ...state,
        paginator: {
          ...state.paginator,
          parametros: {
            ...state.paginator.parametros,
            sort_field: action.field,
            sort_order: action.order,
          },
        },
        loading: true,
      };

    case fromServicios.CHANGE_PARAMS:
      return {
        ...state,
        paginator: {
          ...state.paginator,
          parametros: {
            ...state.paginator.parametros,
            page: action.params.page,
            page_size: action.params.page_size,
            sort_field: action.params.sort_field,
            sort_order: action.params.sort_order,
          },
        },
        loading: true,
      };

    default:
      return state;
  }
}
