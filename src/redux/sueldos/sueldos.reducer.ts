import { LambePaginator } from 'redux/lambe-paginator.model';
import * as fromSueldos from './sueldos.actions';

export interface SueldosState {
  id_empleado: number;
  paginator: LambePaginator;
  filtros: { descripcion: string; fecha: string; monto: string };
  loading: boolean;
  error: any;
  initialized: boolean;
  filterVisible: boolean;
  formVisible: boolean;
}

export const initState = {
  id_empleado: null,
  paginator: new LambePaginator(),
  filtros: { descripcion: null, fecha: null, monto: null },
  loading: false,
  error: null,
  initialized: false,
  filterVisible: false,
  formVisible: false,
};

export function SueldosReducer(state = initState, action: fromSueldos.actions) {
  switch (action.type) {
    case fromSueldos.CHANGE_EMPLEADO:
      return {
        ...state,
        loading: true,
        initialized: true,
        id_empleado: action.idEmpleado,
      };
      break;
    case fromSueldos.LOAD_SUELDOS:
      return {
        ...state,
        loading: true,
        initialized: true,
      };

    case fromSueldos.LOAD_SUELDOS_SUCCESS:
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

    case fromSueldos.LOAD_SUELDOS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case fromSueldos.CLEAR_SUELDOS:
      return {
        ...state,
        paginator: {
          ...state.paginator,
          recordsFiltered: 0,
          data: [],
        },
        loading: false,
      };

    case fromSueldos.CHANGE_ORDER:
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

    case fromSueldos.CHANGE_PARAMS:
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
    case fromSueldos.CHANGE_FILTER:
      return {
        ...state,
        filtros: { ...action.filter },
        loading: true,
      };

    case fromSueldos.OPEN_FILTER:
      return {
        ...state,
        filterVisible: true,
      };
    case fromSueldos.CLOSE_FILTER:
      return {
        ...state,
        filterVisible: false,
      };
    default:
      return state;
  }
}
