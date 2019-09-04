import { EditFormActions, EditFormActionsTypes } from './edit-form.actions';
export interface EditFormState {
  id: number;
  data: any;
  loading: boolean;
  error: any;
  open: boolean;
}

export const EditForminitialState: EditFormState = {
  id: null,
  data: null,
  loading: false,
  error: null,
  open: false,
};

export function editFormReducer(
  state = EditForminitialState,
  action: EditFormActions,
): EditFormState {
  switch (action.type) {
    case EditFormActionsTypes.CabecerasUpdateRequest:
      return {
        ...state,
        loading: true,
      };

    case EditFormActionsTypes.CabecerasUpdateRequestSuccess:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      };
    case EditFormActionsTypes.CabecerasUpdateRequestFail:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case EditFormActionsTypes.CabecerasEditRequest:
      return {
        ...state,
        loading: true,
        id: action.payload.id,
        open: true,
      };
    case EditFormActionsTypes.CabecerasEditRequestSuccess:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      };

    case EditFormActionsTypes.CabecerasEditRequestFail:
      return {
        ...state,
        loading: false,
        id: null,
        error: action.payload.error,
      };

    case EditFormActionsTypes.CloseEditForm:
      return {
        ...state,
        open: false,
        data: null,
        id: null,
      };

    default: {
      return state;
    }
  }
}
