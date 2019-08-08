import { LambePaginator } from 'redux/lambe-paginator.model';
import * as fromCajaConsorcio from './caja-consorcio.actions';

export interface CajaConsorcioState {
  paginator: LambePaginator;
  filtros: { id_consorcio: number[] };
  loading: boolean;
  error: any;
  initialized: boolean;
  filterVisible: boolean;
  formVisible: boolean;
  saldos: any;
}

export const initState = {
  paginator: new LambePaginator(),
  filtros: { id_consorcio: [] },
  loading: false,
  error: null,
  initialized: false,
  filterVisible: false,
  formVisible: false,
  saldos: {
    totales: [],
    subtotal_efectivo: [],
    subtotal_cheque: [],
    subtotal_cuenta_bancaria: [],
  },
};

export function CajaConsorcioReducer(
  state = initState,
  action: fromCajaConsorcio.actions,
) {
  switch (action.type) {
    case fromCajaConsorcio.LOAD_CAJA_CONSORCIO:
      return {
        ...state,
        loading: true,
        initialized: true,
      };

    case fromCajaConsorcio.LOAD_CAJA_CONSORCIO_SUCCESS:
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

    case fromCajaConsorcio.LOAD_CAJA_CONSORCIO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case fromCajaConsorcio.CLEAR_CAJA_CONSORCIO:
      return {
        ...state,
        paginator: {
          ...state.paginator,
          recordsFiltered: 0,
          data: [],
        },
        loading: false,
      };

    case fromCajaConsorcio.CHANGE_ORDER:
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

    case fromCajaConsorcio.CHANGE_PARAMS:
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
    case fromCajaConsorcio.CHANGE_FILTER:
      return {
        ...state,
        filtros: { id_consorcio: action.filter.id_consorcio },
        loading: true,
      };

    case fromCajaConsorcio.OPEN_FILTER:
      return {
        ...state,
        filterVisible: true,
      };
    case fromCajaConsorcio.CLOSE_FILTER:
      return {
        ...state,
        filterVisible: false,
      };
    case fromCajaConsorcio.LOAD_SALDOS_SUCCESS:
      return {
        ...state,
        saldos: action.saldos,
      };
    default:
      return state;
  }
}
