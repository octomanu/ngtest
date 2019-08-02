import * as fromGlobal from './global.actions';

export interface GlobalState {
  smallViewport: boolean;
  help: boolean;
  keepHelp: boolean;
  modalAyuda: { url: string; visible: boolean };
}

const initState: GlobalState = {
  smallViewport: false,
  help: false,
  keepHelp: false,
  modalAyuda: { url: null, visible: false },
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
    case fromGlobal.CHANGE_HELP:
      return {
        ...state,
        help: action.help,
      };
    case fromGlobal.CHANGE_KEEP_HELP:
      return {
        ...state,
        keepHelp: action.keepHelp,
      };
    case fromGlobal.SHOW_MODAL_HELP:
      return {
        ...state,
        modalAyuda: { url: action.url, visible: true },
      };
    case fromGlobal.HIDE_MODAL_HELP:
      return {
        ...state,
        modalAyuda: { url: null, visible: false },
      };
    default:
      return state;
  }
}
