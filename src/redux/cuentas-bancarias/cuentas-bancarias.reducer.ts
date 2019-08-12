import { LambePaginator } from 'redux/lambe-paginator.model';
import * as fromCbancarias from './cuentas-bancarias.actions';

export interface CuentasBancariasState {
  paginator: LambePaginator;
  filtros: { banco: string; alias: string; numero_cuenta: string };
  loading: boolean;
  error: any;
  initialized: boolean;
  filterVisible: boolean;
  formVisible: boolean;
}

export const initState = {
  paginator: new LambePaginator(),
  filtros: { banco: null, alias: null, numero_cuenta: null },
  loading: false,
  error: null,
  initialized: false,
  filterVisible: false,
  formVisible: false,
};

export function CuentasBancariasReducer(
  state = initState,
  action: fromCbancarias.actions,
) {
  switch (action.type) {
    case fromCbancarias.LOAD_CUENTAS_BANCARIAS:
      return {
        ...state,
        loading: true,
        initialized: true,
      };

    case fromCbancarias.LOAD_CUENTAS_BANCARIAS_SUCCESS:
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

    case fromCbancarias.LOAD_CUENTAS_BANCARIAS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case fromCbancarias.CLEAR_CUENTAS_BANCARIAS:
      return {
        ...state,
        paginator: {
          ...state.paginator,
          recordsFiltered: 0,
          data: [],
        },
        loading: false,
      };

    case fromCbancarias.CHANGE_ORDER:
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

    case fromCbancarias.CHANGE_PARAMS:
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
    case fromCbancarias.CHANGE_FILTER:
      return {
        ...state,
        filtros: { ...action.filter },
        loading: true,
      };

    case fromCbancarias.OPEN_FILTER:
      return {
        ...state,
        filterVisible: true,
      };
    case fromCbancarias.CLOSE_FILTER:
      return {
        ...state,
        filterVisible: false,
      };
    default:
      return state;
  }
}
