import { LambePaginator } from 'redux/lambe-paginator.model';
import { CabecerasActions, CabecerasActionsTypes } from './cabeceras.actions';

export interface CabecerasState {
  initialized: boolean;
  page: {
    paginator: LambePaginator;
    loading: boolean;
    filters: { descripcion: string; fecha: string; monto: string };
    error: any;
  };
  filterForm: {
    open: boolean;
    data: any;
  };
  editForm: {
    id: number;
    data: any;
    loading: boolean;
    error: any;
    open: boolean;
  };
  createForm: {
    data: any;
    loading: boolean;
    error: any;
    open: boolean;
  };
  remove: {
    loaging: boolean;
    error: any;
  };
}

export const initialState: CabecerasState = {
  initialized: false,
  page: {
    paginator: new LambePaginator(),
    loading: false,
    filters: { descripcion: null, fecha: null, monto: null },
    error: null,
  },
  filterForm: {
    open: false,
    data: null,
  },
  editForm: {
    id: null,
    data: null,
    loading: false,
    error: null,
    open: false,
  },
  createForm: {
    data: null,
    loading: false,
    error: null,
    open: false,
  },
  remove: {
    loaging: false,
    error: null,
  },
};

export function cabecerasReducer(
  state = initialState,
  action: CabecerasActions,
): CabecerasState {
  switch (action.type) {
    case CabecerasActionsTypes.CabecerasPageRequest:
      return {
        ...state,
        initialized: true,
        page: { ...state.page, loading: true, error: false },
      };

    case CabecerasActionsTypes.CabecerasUpdateRequest:
      return {
        ...state,
        editForm: {
          ...state.editForm,
          loading: true,
        },
      };

    case CabecerasActionsTypes.CabecerasUpdateRequestSuccess:
      return {
        ...state,
        editForm: {
          ...state.editForm,
          loading: false,
          data: action.payload.data,
        },
      };
    case CabecerasActionsTypes.CabecerasUpdateRequestFail:
      return {
        ...state,
        editForm: {
          ...state.editForm,
          loading: false,
          error: action.payload.error,
        },
      };

    case CabecerasActionsTypes.CabecerasEditRequest:
      return {
        ...state,
        editForm: {
          ...state.editForm,
          loading: true,
          id: action.payload.id,
          open: true,
        },
      };
    case CabecerasActionsTypes.CabecerasEditRequestSuccess:
      return {
        ...state,
        editForm: {
          ...state.editForm,
          loading: false,
          data: action.payload.data,
        },
      };

    case CabecerasActionsTypes.CabecerasEditRequestFail:
      return {
        ...state,
        editForm: {
          ...state.editForm,
          loading: false,
          id: null,
          error: action.payload.error,
        },
      };
    case CabecerasActionsTypes.CabecerasPageRequestSuccess:
      return {
        ...state,
        page: {
          ...state.page,
          loading: false,
          paginator: {
            ...state.page.paginator,
            data: action.payload.data,
            recordsFiltered: action.payload.recordsFiltered,
          },
        },
      };
    case CabecerasActionsTypes.CabecerasPageRequestFail:
      return {
        ...state,
        page: {
          ...state.page,
          loading: false,
          paginator: new LambePaginator(),
          error: action.payload.error,
        },
      };
    case CabecerasActionsTypes.CabecerasChangePage:
      return {
        ...state,
        page: {
          ...state.page,
          loading: true,
          paginator: {
            ...state.page.paginator,
            parametros: {
              ...state.page.paginator.parametros,
              page: action.payload.page,
            },
          },
        },
      };
    case CabecerasActionsTypes.ChangePageFilters:
      return { ...state };
    case CabecerasActionsTypes.ChangePageOrder:
      return {
        ...state,
        page: {
          ...state.page,
          loading: true,
          paginator: {
            ...state.page.paginator,
            parametros: {
              ...state.page.paginator.parametros,
              sort_field: action.payload.field,
              sort_order: action.payload.order,
            },
          },
        },
      };
    case CabecerasActionsTypes.DeleteCabeceraRequest:
      return { ...state, remove: { ...state.remove, loaging: true } };
    case CabecerasActionsTypes.DeleteCabeceraSuccess:
      return { ...state, remove: { ...state.remove, loaging: false } };
    case CabecerasActionsTypes.DeleteCabeceraError:
      return {
        ...state,
        remove: {
          ...state.remove,
          loaging: false,
          error: action.payload.error,
        },
      };
    case CabecerasActionsTypes.CloseEditForm:
      return {
        ...state,
        editForm: { ...state.editForm, open: false, data: null, id: null },
      };
    case CabecerasActionsTypes.OpenFilterForm:
      return { ...state, filterForm: { ...state.filterForm, open: true } };
    case CabecerasActionsTypes.CloseFilterForm:
      return { ...state, filterForm: { ...state.filterForm, open: false } };

    default: {
      return state;
    }
  }
}
