import * as fromGastos from './gastos.actions';
import { DueRow } from 'app/models/due-row';

export interface GastosState {
  loading: boolean;
  error: any;
  duesToUpdate: {
    [key: number]: DueRow;
  };
}

export const initState: GastosState = {
  loading: false,
  error: null,
  duesToUpdate: {},
};

export function GastosReducer(
  state: GastosState = initState,
  action: fromGastos.actions,
) {
  switch (action.type) {
    case fromGastos.GastosActionsTypes.GastosAddDue:
      const duesToUpdate = { ...state.duesToUpdate };
      duesToUpdate[action.payload.due.id] = action.payload.due;
      return { ...state, duesToUpdate };
    case fromGastos.GastosActionsTypes.GastosDueSaveRequest:
      return { ...state, loading: true };
    case fromGastos.GastosActionsTypes.GastosDueSaveRequestSuccess:
      return { ...state, loading: false };
    case fromGastos.GastosActionsTypes.GastosDueSaveRequestError:
      return { ...state, loading: false, error: action.payload.error };
    case fromGastos.GastosActionsTypes.GastosRemoveDue:
      return { ...state };
    default:
      return state;
  }
}
