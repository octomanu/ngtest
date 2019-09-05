import {
  CreateFormActions,
  CreateFormActionTypes,
} from './create-form.actions';
export interface CreateFormState {
  data: any;
  loading: boolean;
  error: any;
  open: boolean;
}

export const CreateFormInitialState: CreateFormState = {
  data: null,
  loading: false,
  error: null,
  open: false,
};

export function createFormReducer(
  state = CreateFormInitialState,
  action: CreateFormActions,
): CreateFormState {
  switch (action.type) {
    case CreateFormActionTypes.OpenCreateForm:
      return {
        ...state,
        open: true,
      };
    case CreateFormActionTypes.SaveRequest:
      return {
        ...state,
        loading: true,
        data: action.payload.data,
      };
    case CreateFormActionTypes.SaveRequestSuccess:
      return {
        ...state,
        loading: false,
        data: null,
      };
    case CreateFormActionTypes.SaveRequestFail:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case CreateFormActionTypes.CloseCreateForm:
      return {
        ...state,
        open: false,
      };
    default: {
      return state;
    }
  }
}
