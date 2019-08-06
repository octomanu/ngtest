import { LambePaginator } from 'redux/lambe-paginator.model';
import * as fromGdescripciones from './gastos-descripciones.actions';

export interface GastosDescripcionesState {
  paginator: LambePaginator;
  filtros: { titulo: string };
  loading: boolean;
  error: any;
  initialized: boolean;
  filterVisible: boolean;
  formVisible: boolean;
}

export const initState = {
  paginator: new LambePaginator(),
  filtros: { titulo: null },
  loading: false,
  error: null,
  initialized: false,
  filterVisible: false,
  formVisible: false,
};

export function GastosDescripcionesReducer(
  state = initState,
  action: fromGdescripciones.actions,
) {
  switch (action.type) {
    case fromGdescripciones.LOAD_GASTOS_DESCRIPCIONES:
      return {
        ...state,
        loading: true,
        initialized: true,
      };

    case fromGdescripciones.LOAD_GASTOS_DESCRIPCIONES_SUCCESS:
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

    case fromGdescripciones.LOAD_GASTOS_DESCRIPCIONES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case fromGdescripciones.CLEAR_GASTOS_DESCRIPCIONES:
      return {
        ...state,
        paginator: {
          ...state.paginator,
          recordsFiltered: 0,
          data: [],
        },
        loading: false,
      };

    case fromGdescripciones.CHANGE_ORDER:
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

    case fromGdescripciones.CHANGE_PARAMS:
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
    case fromGdescripciones.CHANGE_FILTER:
      return {
        ...state,
        filtros: { titulo: action.filter.titulo },
        loading: true,
      };

    case fromGdescripciones.OPEN_FILTER:
      return {
        ...state,
        filterVisible: true,
      };
    case fromGdescripciones.CLOSE_FILTER:
      return {
        ...state,
        filterVisible: false,
      };
    default:
      return state;
  }
}
