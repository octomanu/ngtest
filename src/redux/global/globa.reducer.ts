import * as fromGlobal from './global.actions';

export interface GlobalState {
  smallViewport: boolean;
}

const initState: GlobalState = {
  smallViewport: false,
};

export function globalReducer(
  state = initState,
  action: fromGlobal.acciones,
): GlobalState {
  switch (action.type) {
    case fromGlobal.CHANGE_VIEWPORT:
      return {
        ...state,
        smallViewport: action.small,
      };
    default:
      return state;
  }
}
