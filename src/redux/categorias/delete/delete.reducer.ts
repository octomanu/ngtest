import { DeleteActions, DeleteActionsType } from './delete.actions';

export interface DeleteState {
  id: string | number;
  loading: boolean;
  error: any;
}

export const initialState: DeleteState = {
  id: null,
  loading: false,
  error: null,
};

export function deleteReducer(
  state: DeleteState = initialState,
  action: DeleteActions,
): DeleteState {
  switch (action.type) {
    case DeleteActionsType.DeleteRequest:
      return { id: action.payload.id, loading: true, error: null };
    case DeleteActionsType.DeleteRequestSuccess:
      return { id: null, loading: false, error: null };
    case DeleteActionsType.DeleteRequestFail:
      return { id: null, loading: false, error: action.payload.error };
    default:
      return state;
  }
}
