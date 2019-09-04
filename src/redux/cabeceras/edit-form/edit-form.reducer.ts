import { LambePaginator } from 'redux/lambe-paginator.model';
import { EditFormActions, EditFormActionsTypes } from './edit-form.actions';
export interface EditFormState {
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

export const initialState: EditFormState = {
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
  action: EditFormActions,
): EditFormState {
  switch (action.type) {
    case EditFormActionsTypes.CabecerasUpdateRequest:
      return {
        ...state,
        editForm: {
          ...state.editForm,
          loading: true,
        },
      };

    case EditFormActionsTypes.CabecerasUpdateRequestSuccess:
      return {
        ...state,
        editForm: {
          ...state.editForm,
          loading: false,
          data: action.payload.data,
        },
      };
    case EditFormActionsTypes.CabecerasUpdateRequestFail:
      return {
        ...state,
        editForm: {
          ...state.editForm,
          loading: false,
          error: action.payload.error,
        },
      };

    case EditFormActionsTypes.CabecerasEditRequest:
      return {
        ...state,
        editForm: {
          ...state.editForm,
          loading: true,
          id: action.payload.id,
          open: true,
        },
      };
    case EditFormActionsTypes.CabecerasEditRequestSuccess:
      return {
        ...state,
        editForm: {
          ...state.editForm,
          loading: false,
          data: action.payload.data,
        },
      };

    case EditFormActionsTypes.CabecerasEditRequestFail:
      return {
        ...state,
        editForm: {
          ...state.editForm,
          loading: false,
          id: null,
          error: action.payload.error,
        },
      };

    case EditFormActionsTypes.CloseEditForm:
      return {
        ...state,
        editForm: { ...state.editForm, open: false, data: null, id: null },
      };

    default: {
      return state;
    }
  }
}
