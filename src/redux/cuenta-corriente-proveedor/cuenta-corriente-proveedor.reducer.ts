import { LambePaginator } from 'redux/lambe-paginator.model';
import * as fromCCP from './cuenta-corriente-proveedor.actions';

export interface CuentaCorrienteProveedorState {
  id_proveedor: number;
  paginator: LambePaginator;
  filtros: { descripcion: string; fecha: string; monto: string };
  loading: boolean;
  error: any;
  initialized: boolean;
  filterVisible: boolean;
  formVisible: boolean;
}

export const initState = {
  id_proveedor: null,
  paginator: new LambePaginator(),
  filtros: { descripcion: null, fecha: null, monto: null },
  loading: false,
  error: null,
  initialized: false,
  filterVisible: false,
  formVisible: false,
};

export function CuentaCorrienteProveedorReducer(
  state = initState,
  action: fromCCP.actions,
) {
  switch (action.type) {
    case fromCCP.CHANGE_PROVEEDOR:
      return {
        ...state,
        loading: true,
        initialized: true,
        id_proveedor: action.idProveedor,
      };
      break;
    case fromCCP.LOAD_CUENTA_CORRIENTE_PROVEEDOR:
      return {
        ...state,
        loading: true,
        initialized: true,
      };

    case fromCCP.LOAD_CUENTA_CORRIENTE_PROVEEDOR_SUCCESS:
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

    case fromCCP.LOAD_CUENTA_CORRIENTE_PROVEEDOR_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case fromCCP.CLEAR_CUENTA_CORRIENTE_PROVEEDOR:
      return {
        ...state,
        paginator: {
          ...state.paginator,
          recordsFiltered: 0,
          data: [],
        },
        loading: false,
      };

    case fromCCP.CHANGE_ORDER:
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

    case fromCCP.CHANGE_PARAMS:
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
    case fromCCP.CHANGE_FILTER:
      return {
        ...state,
        filtros: { ...action.filter },
        loading: true,
      };

    case fromCCP.OPEN_FILTER:
      return {
        ...state,
        filterVisible: true,
      };
    case fromCCP.CLOSE_FILTER:
      return {
        ...state,
        filterVisible: false,
      };
    default:
      return state;
  }
}
