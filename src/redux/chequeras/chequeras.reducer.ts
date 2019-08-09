import * as fromChequeras from './chequeras.actions';
import { LambePaginator } from 'redux/lambe-paginator.model';

export interface ChequerasState {
  paginator: LambePaginator;
  filtros: { descripcion: string };
  loading: boolean;
  error: any;
  initialized: boolean;
  filterVisible: boolean;
  formVisible: boolean;
}

const initState: ChequerasState = {
  paginator: new LambePaginator(),
  filtros: { descripcion: null },
  loading: false,
  error: null,
  initialized: false,
  filterVisible: false,
  formVisible: false,
};

export function ChequerasReducer(
  state = initState,
  action: fromChequeras.actions,
): ChequerasState {
  switch (action.type) {
    case fromChequeras.LOAD_CHEQUERAS:
      return {
        ...state,
        loading: true,
        initialized: true,
      };

    case fromChequeras.LOAD_CHEQUERAS_SUCCESS:
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

    case fromChequeras.LOAD_CHEQUERAS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case fromChequeras.CLEAR_CHEQUERAS:
      return {
        ...state,
        paginator: {
          ...state.paginator,
          recordsFiltered: 0,
          data: [],
        },
        loading: false,
      };

    case fromChequeras.CHANGE_ORDER:
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

    case fromChequeras.CHANGE_PARAMS:
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
    case fromChequeras.CHANGE_FILTER:
      return {
        ...state,
        filtros: { descripcion: action.filter.descripcion },
        loading: true,
      };

    case fromChequeras.OPEN_FILTER:
      return {
        ...state,
        filterVisible: true,
      };
    case fromChequeras.CLOSE_FILTER:
      return {
        ...state,
        filterVisible: false,
      };
    default:
      return state;
  }
}
