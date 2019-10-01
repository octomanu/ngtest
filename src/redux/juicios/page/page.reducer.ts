import { LambePaginator } from 'redux/lambe-paginator.model';
import {
  JuiciosPageActions,
  JuiciosPageActionsTypes,
} from './page.actions';

export interface JuiciosPageState {
  paginator: LambePaginator;
  loading: boolean;
  filters: { descripcion: string; fecha: string; monto: string };
  error: any;
}

export const initialState: JuiciosPageState = {
  paginator: new LambePaginator(),
  loading: false,
  filters: { descripcion: null, fecha: null, monto: null },
  error: null,
};

export function pageReducer(
  state = initialState,
  action: JuiciosPageActions,
): JuiciosPageState {
  switch (action.type) {
    case JuiciosPageActionsTypes.JuiciosPageRequest:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case JuiciosPageActionsTypes.JuiciosPageRequestSuccess:
      return {
        ...state,
        loading: false,
        paginator: {
          ...state.paginator,
          data: action.payload.data,
          recordsFiltered: action.payload.recordsFiltered,
        },
      };
    case JuiciosPageActionsTypes.JuiciosPageRequestFail:
      return {
        ...state,
        loading: false,
        paginator: new LambePaginator(),
        error: action.payload.error,
      };
    case JuiciosPageActionsTypes.JuiciosChangePage:
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
    case JuiciosPageActionsTypes.ChangePageOrder:
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
