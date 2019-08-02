import * as fromMenu from './menu.actions';

export interface MenuState {
  menu: any[];
  loaded: boolean;
}

const initState: MenuState = {
  menu: [],
  loaded: false,
};

export function menuReducer(state = initState, action: fromMenu.actions) {
  switch (action.type) {
    case fromMenu.LOAD_MENU:
      return { ...state, menu: action.menu, loaded: true };
    case fromMenu.UPDATE_MENU:
      return { ...state, menu: action.menu };
    default:
      return state;
  }
}
