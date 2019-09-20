import { LambePaginator } from 'redux/lambe-paginator.model';
import { GastosPageActions, GastosPageActionsTypes } from './page.actions';
import { DueRow } from 'app/models/due-row';

export interface GastosPageState {
  showColumns: { proveedor: boolean; consorcio: boolean; servicio: boolean };
  paginator: LambePaginator;
  loading: boolean;
  filters: { descripcion: string; fecha: string; monto: string };
  error: any;
  duesToUpdate: {
    [key: number]: DueRow;
  };
}

export const initialState: GastosPageState = {
  showColumns: { proveedor: true, consorcio: true, servicio: true },
  paginator: new LambePaginator(),
  loading: false,
  filters: { descripcion: null, fecha: null, monto: null },
  error: null,
  duesToUpdate: {},
};

export function pageReducer(
  state = initialState,
  action: GastosPageActions,
): GastosPageState {
  switch (action.type) {
    case GastosPageActionsTypes.GastosPageRequest:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case GastosPageActionsTypes.GastosPageRequestSuccess:
      return {
        ...state,
        loading: false,
        paginator: {
          ...state.paginator,
          data: action.payload.data,
          recordsFiltered: action.payload.recordsFiltered,
        },
      };
    case GastosPageActionsTypes.GastosPageRequestFail:
      return {
        ...state,
        loading: false,
        paginator: new LambePaginator(),
        error: action.payload.error,
      };
    case GastosPageActionsTypes.GastosChangePage:
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
    case GastosPageActionsTypes.ChangePageOrder:
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
    case GastosPageActionsTypes.ChangeConsorcioVisibility:
      return {
        ...state,
        showColumns: {
          ...state.showColumns,
          consorcio: action.payload.visible,
        },
      };
    case GastosPageActionsTypes.ChangeProveedorVisibility:
      return {
        ...state,
        showColumns: {
          ...state.showColumns,
          proveedor: action.payload.visible,
        },
      };
    case GastosPageActionsTypes.ChangeServicioVisibility:
      return {
        ...state,
        showColumns: {
          ...state.showColumns,
          servicio: action.payload.visible,
        },
      };
    default: {
      return state;
    }
  }
}
