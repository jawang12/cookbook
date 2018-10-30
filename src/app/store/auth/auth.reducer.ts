import { AuthActions, AuthActionTypes } from './auth.actions';

export interface AuthState {
  token: string,
  authenticated: boolean
}

const initialState: AuthState = {
  token: null,
  authenticated: false
}

export function AuthReducer(state = initialState, action: AuthActions) {
  switch(action.type) {
    case AuthActionTypes.SIGN_IN:
    case AuthActionTypes.SIGN_UP:
      return {
        ...state,
        authenticated: true
      };
    case AuthActionTypes.DELETE_USER:
    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        ...initialState
      };
    case AuthActionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.token
      };
    case AuthActionTypes.PERSISTED_SIGN_IN:
      return {
        ...state,
        authenticated: true,
        token: action.token
      }
    default:
    return state;
  }
}