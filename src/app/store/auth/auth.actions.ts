import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  SET_TOKEN = 'SET_TOKEN',
  LOGOUT = 'LOGOUT',
  DELETE_USER = 'DELETE_USER',
  PERSISTED_SIGN_IN = 'PERSISTED_SIGN_IN'
}

export class SignIn implements Action {
  readonly type = AuthActionTypes.SIGN_IN;
}

export class SignUp implements Action {
  readonly type = AuthActionTypes.SIGN_UP;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class SetToken implements Action {
  readonly type = AuthActionTypes.SET_TOKEN;
  constructor(public token: string) {}
}

export class DeleteUser implements Action {
  readonly type = AuthActionTypes.DELETE_USER;
}

export class PersistedSignIn implements Action {
  readonly type = AuthActionTypes.PERSISTED_SIGN_IN;
  constructor(public token: string) {}
}

export type AuthActions =
SignIn |
SignUp |
Logout |
SetToken |
DeleteUser |
PersistedSignIn;