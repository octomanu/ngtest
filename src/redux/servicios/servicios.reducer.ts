import * as fromServicios from '../servicios/servicios.actions';
import { LambePaginator } from 'redux/lambe-paginator.model';

export interface ServiciosState {
  paginator: LambePaginator;
  filtros: { descripcion: string };
  loading: boolean;
  error: any;
  initialized: boolean;
  filterVisible: boolean;
  formVisible: boolean;
}

const initState: ServiciosState = {
  paginator: new LambePaginator(),
  filtros: { descripcion: null },
  loading: false,
  error: null,
  initialized: false,
  filterVisible: false,
  formVisible: false,
};

export function serviciosReducer(
  state = initState,
  action: fromServicios.acciones,
): ServiciosState {
  switch (action.type) {
    case fromServicios.INIT_TABLE:
      return { ...state, initialized: true };
    case fromServicios.LOAD_SERVICIOS:
      return {
        ...state,
        loading: true,
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

    case fromServicios.CHANGE_PAGE:
      return {
        ...state,
        paginator: {
          ...state.paginator,
          parametros: {
            ...state.paginator.parametros,
            page: action.payload.page,
          },
        },
        loading: true,
      };
    case fromServicios.CHANGE_FILTER:
      return {
        ...state,
        filtros: { descripcion: action.filter.descripcion },
        loading: true,
      };

    case fromServicios.OPEN_FILTER:
      return {
        ...state,
        filterVisible: true,
      };
    case fromServicios.CLOSE_FILTER:
      return {
        ...state,
        filterVisible: false,
      };
    default:
      return state;
  }
}
