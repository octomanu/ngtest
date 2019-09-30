import { LambePaginator } from 'redux/lambe-paginator.model';
import {
  CategoriasPageActions,
  CategoriasPageActionsTypes,
} from './page.actions';

export interface CategoriasPageState {
  paginator: LambePaginator;
  loading: boolean;
  filters: { descripcion: string; fecha: string; monto: string };
  error: any;
}

export const initialState: CategoriasPageState = {
  paginator: new LambePaginator(),
  loading: false,
  filters: { descripcion: null, fecha: null, monto: null },
  error: null,
};

export function pageReducer(
  state = initialState,
  action: CategoriasPageActions,
): CategoriasPageState {
  switch (action.type) {
    case CategoriasPageActionsTypes.CategoriasPageRequest:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case CategoriasPageActionsTypes.CategoriasPageRequestSuccess:
      return {
        ...state,
        loading: false,
        paginator: {
          ...state.paginator,
          data: action.payload.data,
          recordsFiltered: action.payload.recordsFiltered,
        },
      };
    case CategoriasPageActionsTypes.CategoriasPageRequestFail:
      return {
        ...state,
        loading: false,
        paginator: new LambePaginator(),
        error: action.payload.error,
      };
    case CategoriasPageActionsTypes.CategoriasChangePage:
      return {
        ...state,
        loading: true,
        paginator: {
          ...state.paginator,
          parametros: {
            ...state.paginator.parametros,
            page: action.payload.page,
          },
        },
      };
    case CategoriasPageActionsTypes.ChangePageOrder:
      return {
        ...state,
        loading: true,
        paginator: {
          ...state.paginator,
          parametros: {
            ...state.paginator.parametros,
            sort_field: action.payload.field,
            sort_order: action.payload.order,
          },
        },
      };
    default: {
      return state;
    }
  }
}
