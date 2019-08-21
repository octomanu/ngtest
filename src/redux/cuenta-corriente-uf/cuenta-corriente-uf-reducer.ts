import { LambePaginator } from 'redux/lambe-paginator.model';
import * as fromCCU from './cuenta-corriente-uf-actions';

export interface CuentaCorrienteUfState {
  id_uf: number;
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
  id_uf: null,
  id_consorcio: null,
  paginator: new LambePaginator(),
  filtros: { descripcion: null, fecha: null, monto: null },
  loading: false,
  error: null,
  initialized: false,
  filterVisible: false,
  formVisible: false,
};

export function CuentaCorrienteUfReducer(
  state = initState,
  action: fromCCU.actions,
) {
  switch (action.type) {
    case fromCCU.CHANGE_CONSORCIO:
      return {
        ...state,
        loading: false,
        initialized: true,
        id_consorcio: action.idConsorcio,
        id_uf: null,
        paginator: new LambePaginator(),
      };
    case fromCCU.CHANGE_UF:
      return {
        ...state,
        loading: true,
        initialized: true,
        id_uf: action.idUf,
      };
      break;
    case fromCCU.LOAD_CUENTA_CORRIENTE_UF:
      return {
        ...state,
        loading: true,
        initialized: true,
      };

    case fromCCU.LOAD_CUENTA_CORRIENTE_UF_SUCCESS:
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

    case fromCCU.LOAD_CUENTA_CORRIENTE_UF_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case fromCCU.CLEAR_UF_CONSORCIO:
      return {
        ...state,
        paginator: {
          ...state.paginator,
          recordsFiltered: 0,
          data: [],
        },
        loading: false,
      };

    case fromCCU.CHANGE_ORDER:
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

    case fromCCU.CHANGE_PARAMS:
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
    case fromCCU.CHANGE_FILTER:
      return {
        ...state,
        filtros: { ...action.filter },
        loading: true,
      };

    case fromCCU.OPEN_FILTER:
      return {
        ...state,
        filterVisible: true,
      };
    case fromCCU.CLOSE_FILTER:
      return {
        ...state,
        filterVisible: false,
      };
    default:
      return state;
  }
}
