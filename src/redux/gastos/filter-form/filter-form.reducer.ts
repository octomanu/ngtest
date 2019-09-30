import { FilterActions, FilterActionsTypes } from './filter-form.actions';

export interface FilterFormState {
  open: boolean;
  data: {
    ['gastos-id_proveedor']: string;
    ['gastos-id_consorcio']: string;
    ['gastos-id_servicio']: string;
  };
}

export const initialState: FilterFormState = {
  open: false,
  data: {
    ['gastos-id_proveedor']: null,
    ['gastos-id_consorcio']: null,
    ['gastos-id_servicio']: null,
  },
};

export function filterFormReducer(
  state: FilterFormState = initialState,
  action: FilterActions,
): FilterFormState {
  switch (action.type) {
    case FilterActionsTypes.OpenFilterForm:
      return { ...state, open: true };
    case FilterActionsTypes.CloseFilterForm:
      return { ...state, open: false };
    case FilterActionsTypes.FilterRequest:
      return { ...state, data: action.payload.data };
    default:
      return state;
  }
}
