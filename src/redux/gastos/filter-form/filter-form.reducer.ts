import { FilterActions, FilterActionsTypes } from './filter-form.actions';

export interface FilterFormState {
  open: boolean;
  data: any;
}

export const initialState: FilterFormState = {
  open: false,
  data: null,
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
