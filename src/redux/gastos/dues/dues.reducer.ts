import { DueRow } from 'app/models/due-row';
import * as fromDues from './dues.actions';

export interface DuesState {
  loading: boolean;
  error: any;
  duesToUpdate: {
    [key: number]: DueRow;
  };
}
export const initState: DuesState = {
  loading: false,
  error: null,
  duesToUpdate: {},
};

export function DuesReducer(
  state: DuesState = initState,
  action: fromDues.actions,
) {
  switch (action.type) {
    case fromDues.DueActionsTypes.AddDue:
      const duesToUpdate = { ...state.duesToUpdate };
      duesToUpdate[action.payload.due.id] = action.payload.due;
      return { ...state, duesToUpdate };
    case fromDues.DueActionsTypes.DueSaveRequest:
      return { ...state, loading: true };
    case fromDues.DueActionsTypes.DueSaveRequestSuccess:
      return { ...state, loading: false };
    case fromDues.DueActionsTypes.DueSaveRequestError:
      return { ...state, loading: false, error: action.payload.error };
    case fromDues.DueActionsTypes.RemoveDue:
      return { ...state };
    default:
      return state;
  }
}
