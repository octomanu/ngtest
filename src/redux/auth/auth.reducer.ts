import * as fromAuth from './auth.actions';

export interface AuthState {
  user: any;
}

const initState: AuthState = {
  user: null,
};

export function authReducer(
  state = initState,
  action: fromAuth.acciones,
): AuthState {
  switch (action.type) {
    case fromAuth.SET_USER:
      return {
        user: { ...action.user },
      };
    default:
      return state;
  }
}
