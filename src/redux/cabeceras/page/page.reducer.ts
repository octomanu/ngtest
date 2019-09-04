import { LambePaginator } from 'redux/lambe-paginator.model';
import {
  CabecerasPageActions,
  CabecerasPageActionsTypes,
} from './page.actions';

export interface CabecerasPageState {
  paginator: LambePaginator;
  loading: boolean;
  filters: { descripcion: string; fecha: string; monto: string };
  error: any;
}

export const initialState: CabecerasPageState = {
  paginator: new LambePaginator(),
  loading: false,
  filters: { descripcion: null, fecha: null, monto: null },
  error: null,
};

export function pageReducer(
  state = initialState,
  action: CabecerasPageActions,
): CabecerasPageState {
  switch (action.type) {
    case CabecerasPageActionsTypes.CabecerasPageRequest:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case CabecerasPageActionsTypes.CabecerasPageRequestSuccess:
      return {
        ...state,
        loading: false,
        paginator: {
          ...state.paginator,
          data: action.payload.data,
          recordsFiltered: action.payload.recordsFiltered,
        },
      };
    case CabecerasPageActionsTypes.CabecerasPageRequestFail:
      return {
        ...state,
        loading: false,
        paginator: new LambePaginator(),
        error: action.payload.error,
      };
    case CabecerasPageActionsTypes.CabecerasChangePage:
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
    case CabecerasPageActionsTypes.ChangePageFilters:
      return { ...state };
    case CabecerasPageActionsTypes.ChangePageOrder:
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
