import { LambePaginator } from 'redux/lambe-paginator.model';
import * as fromCCC from './cuenta-corriente-consorcio.actions';

export interface CuentaCorrienteConsorcioState {
  id_consorcio: number;
  paginator: LambePaginator;
  filtros: { descripcion: string; fecha: string; monto: string };
  loading: boolean;
  error: any;
  initialized: boolean;
  filterVisible: boolean;
  formVisible: boolean;
}

export const initState = {
  id_consorcio: null,
  paginator: new LambePaginator(),
  filtros: { descripcion: null, fecha: null, monto: null },
  loading: false,
  error: null,
  initialized: false,
  filterVisible: false,
  formVisible: false,
};

export function CuentaCorrienteConsorcioReducer(
  state = initState,
  action: fromCCC.actions,
) {
  switch (action.type) {
    case fromCCC.CHANGE_CONSORCIO:
      return {
        ...state,
        loading: true,
        initialized: true,
        id_consorcio: action.idConsorcio,
      };
      break;
    case fromCCC.LOAD_CUENTA_CORRIENTE_CONSORCIO:
      return {
        ...state,
        loading: true,
        initialized: true,
      };

    case fromCCC.LOAD_CUENTA_CORRIENTE_CONSORCIO_SUCCESS:
      return {
        ...state,
        paginator: {
          ...state.paginator,
          data: action.data,
          recordsFiltered: action.recordsFiltered,
        },
        loading: false,
        error: null,
      };

    case fromCCC.LOAD_CUENTA_CORRIENTE_CONSORCIO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case fromCCC.CLEAR_CUENTA_CORRIENTE_CONSORCIO:
      return {
        ...state,
        paginator: {
          ...state.paginator,
          recordsFiltered: 0,
          data: [],
        },
        loading: false,
      };

    case fromCCC.CHANGE_ORDER:
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

    case fromCCC.CHANGE_PARAMS:
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
    case fromCCC.CHANGE_FILTER:
      return {
        ...state,
        filtros: { ...action.filter },
        loading: true,
      };

    case fromCCC.OPEN_FILTER:
      return {
        ...state,
        filterVisible: true,
      };
    case fromCCC.CLOSE_FILTER:
      return {
        ...state,
        filterVisible: false,
      };
    default:
      return state;
  }
}
